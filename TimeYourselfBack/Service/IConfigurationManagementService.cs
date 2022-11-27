using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IConfigurationManagementService
    {
        bool AddOrUpdateConfiguration(ConfigDto newConfig);
        List<ConfigDto> GetConfigurationByUserId(int userId);
    }
}