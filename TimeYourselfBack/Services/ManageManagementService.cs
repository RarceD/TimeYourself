using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Repositories.Models;

namespace TimeYourselfBack.Service;
public class ManageManagementService : IManageManagementService
{

    private readonly ApplicationDbContext _context;

    public ManageManagementService(ApplicationDbContext context)
    {
        _context = context;
    }
    public bool AddMetting(ManageDto newConfig, int userId)
    {
        try
        {
            Config config = new();
            config.UserId = newConfig.UserId;
            config.Name = newConfig.Name;
            _context.Add(config);
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            return true;
        }
    }

    public bool RemoveMetting(ManageDto config, int userId)
    {
        try
        {
            var configToDelete = _context.Config.Where(i => i.UserId == config.UserId && i.Name == config.Name).FirstOrDefault();
            _ = _context.Remove(configToDelete);
            _context.SaveChanges();
            return true;
        }
        catch (Exception ex)
        {
            return true;
        }
    }
}
