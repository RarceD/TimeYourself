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

    private static Visualizer GenerateNewVisualizer(int userId, int configId)
    {
        Visualizer newRegister = new();
        newRegister.ConfigId = configId;
        newRegister.UserId = userId;
        var today = DateTime.Today;
        newRegister.Day = today.Day;
        newRegister.Month = today.Month;
        newRegister.Year = today.Year;
        return newRegister;
    }
}
