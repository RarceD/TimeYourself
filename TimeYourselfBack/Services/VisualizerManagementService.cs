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

    public bool AddVisualizerRegister(int userId, int configId)
    {
        // If user and config id exist in db y add a register with this date:
        var clientExist = _context.Clients.Where(i => i.Id == userId).FirstOrDefault();
        if (clientExist == null) return false;
        var configExist = _context.Config.Where(i => i.Id == configId).FirstOrDefault();
        if (configExist == null) return false;

        // Add new register:
        Visualizer newRegister = GenerateNewVisualizer(userId, configId);
        _context.Add(newRegister);
        _context.SaveChanges();
        return true;

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
                var meetDate = Convert.ToDateTime(meet.InsertDate);
                if (meetDate.Day == d && meetDate.Month == month)
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

    private static Visualizer GenerateNewVisualizer(int userId, int configId)
    {
        Visualizer newRegister = new();
        newRegister.ConfigId = configId;
        newRegister.UserId = userId;
        var today = DateTime.Today;
        return newRegister;
    }
}
