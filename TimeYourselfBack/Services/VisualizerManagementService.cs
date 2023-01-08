using SQLitePCL;
using System.Globalization;
using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Repositories.Models;

namespace TimeYourselfBack.Service;
public class VisualizerManagementService : IVisualizerManagementService
{

    private readonly ApplicationDbContext _context;

    public VisualizerManagementService(ApplicationDbContext context)
    {
        _context = context;
    }

    public List<string> GetVisualizerPeople(int userId, int? configId, DateTime dateTime)
    {
        // Add new register:
        var peopleWhoInteract = _context.Visualizer.Where(i => i.UserId == userId).ToList();
        List<string> meetPeopleNames = new();
        foreach (var person in peopleWhoInteract)
        {
            // Apply filter in case of configId received
            //if (configId.HasValue && person.ConfigId != configId) continue;

            // Check date:
            DateTime checkDate = Convert.ToDateTime(person.InsertDate);
            if (checkDate.Day == dateTime.Day && checkDate.Month == dateTime.Month && checkDate.Year == dateTime.Year)
            {
                string? name = _context.Config.Where(i => i.Id == person.ConfigId).Select(i => i.Name).FirstOrDefault();
                if (name == null) continue;
                meetPeopleNames.Add(name);
            }
        }
        return meetPeopleNames;

    }
    public List<VisualizerLayoutDto> GetCalerdar(int userId, int? configId, int year)
    {
        var visualizerLayoutDtos = new List<VisualizerLayoutDto>();

        // Return calendar only the config received
        var allMeetings = _context.Visualizer.Where(i => i.UserId == userId).ToList();

        // Get data:
        var layout = new VisualizerLayoutDto() { Id = year, Months = new List<VisualizerMonthDto>() };
        for (var m = 1; m <= 12; m++)
        {
            List<VisualizerDayDto> days = GetDaysForMonth(year, allMeetings, m);
            layout.Months.Add(new VisualizerMonthDto() { Days = days, Id = m });
        }
        visualizerLayoutDtos.Add(layout);
        return visualizerLayoutDtos;
    }

    private List<VisualizerDayDto> GetDaysForMonth(int year, List<Visualizer> allMeetings, int month)
    {
        var days = new List<VisualizerDayDto>();
        var calendar = new GregorianCalendar();
        for (var d = 1; d <= calendar.GetDaysInMonth(year, month); d++)
        {
            VisualizerDayDto i = new() { Id = d, People = new List<string>() };
            foreach (var meet in allMeetings)
            {
                var meetDate = DateTime.Parse(meet.InsertDate);
                if (meetDate.Year == year && meetDate.Day == d && meetDate.Month == month)
                {
                    // Get user from db:
                    var configDb = _context.Config.Where(i => i.Id == meet.ConfigId).FirstOrDefault();
                    if (configDb == null) continue;
                    i.People.Add(configDb.Name);
                }
            }
            days.Add(i);
        }
        return days;
    }
}
