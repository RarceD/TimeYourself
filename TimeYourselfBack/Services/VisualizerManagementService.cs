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
        List<VisualizerLayoutDto> visualizerLayoutDtos = new List<VisualizerLayoutDto>();
        if (configId != null)
        {
            // Return calendar for all configs:
            return visualizerLayoutDtos;
        }
        // Return calendar only the config received
        var allMeetings = _context.Visualizer.Where(i => i.UserId == userId).ToList();

        var layout = new VisualizerLayoutDto();
        layout.Months = new List<VisualizerMonthDto>();
        layout.Id = year;
        
        var calendar = new GregorianCalendar();
        for (var m = 1; m <= 12; m++)
        {
            var AlotOfDays = new List<VisualizerDayDto>();
            for (var d = 1; d < calendar.GetDaysInMonth(year, m); d++)
            {
                VisualizerDayDto i = new() { Id = d, Person = "" };
                foreach (var meet in allMeetings)
                {
                    var meetDate = Convert.ToDateTime(meet.InsertDate);
                    if  (meetDate.Day == d && meetDate.Month == m)
                        i.Person = meet.ConfigId.ToString();
                }
                AlotOfDays.Add(i);
            }
            layout.Months.Add(new VisualizerMonthDto()
            {
                Days = AlotOfDays,
                Id = m
            });
        }
        visualizerLayoutDtos.Add(layout);
        return visualizerLayoutDtos;
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
