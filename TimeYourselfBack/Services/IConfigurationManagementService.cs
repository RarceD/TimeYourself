using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IConfigurationManagementService
    {
        bool AddOrUpdateConfiguration(ConfigDto newConfig);
        bool RemoveConfiguration(ConfigDto newConfig);
        List<ConfigDto> GetConfigurationByUserId(int userId);
    }
}