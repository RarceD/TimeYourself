using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Repositories.Models;

namespace TimeYourselfBack.Service;
public class ConfigurationManagementService : IConfigurationManagementService
{

    private readonly ApplicationDbContext _context;

    public ConfigurationManagementService(ApplicationDbContext context)
    {
        _context = context;
    }
    public bool AddOrUpdateConfiguration(ConfigDto newConfig)
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

    public bool RemoveConfiguration(ConfigDto config)
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

    public List<ConfigDto> GetConfigurationByUserId(int userId)
    {
        var allConfigByUser = _context.Config.Where(u =>u.UserId == userId).ToList();
        if (allConfigByUser.Count > 0)
        {
            var data =  new List<ConfigDto>();
            foreach (var c in allConfigByUser)
                data.Add(new ConfigDto() { Id = c.Id, Name = c.Name , UserId = c.UserId});
            return data;
        }
        else
            return new List<ConfigDto>();

    }
}
