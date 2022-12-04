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
    public List<VisualizerDto> GetCalerdar(VisualizerDto dto)
    {
        var allVisuals = _context.Visualizer.Where(i => i.UserId == dto.UserId && i.ConfigId == dto.ConfigId).ToList();
        return ConvertToDto(allVisuals);
    }

    public VisualizerLayoutDto GetCalerdarTest(int userId, int? configId)
    {
        // var allVisuals = _context.Visualizer.Where(i => i.UserId == dto.UserId && i.ConfigId == dto.ConfigId).ToList();

        if (configId == null)
        {
            // Return calendar for all configs:
        }
        else
        {
            // Return calendar only the config received
        }

        var layout = new VisualizerLayoutDto();
        layout.Months = new List<VisualizerMonthDto>();

        var AlotOfDays = new List<VisualizerDayDto>();
        {
            for (var test = 0; test < 30; test++)
            {
                VisualizerDayDto i = new() { Id = test, Person = "asd" };
                AlotOfDays.Add(i);
            }
        }

        for (var test = 0; test < 12; test++)
        {
            layout.Months.Add(new VisualizerMonthDto()
            {
                Days = AlotOfDays,
                Id = test
            });
        }
        layout.UserId = userId;
        return layout;
    }

    private static List<VisualizerDto> ConvertToDto(List<Visualizer> allVisuals)
    {
        List<VisualizerDto> visualizerDtos = new List<VisualizerDto>();
        foreach (var dto in allVisuals)
        {
            var v = new VisualizerDto();
            v.Id = dto.Id;
            v.UserId = dto.UserId;
            v.ConfigId = dto.ConfigId;
            visualizerDtos.Add(v);
        }
        return visualizerDtos;
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
