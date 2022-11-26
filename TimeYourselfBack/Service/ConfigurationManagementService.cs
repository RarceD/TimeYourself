using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public class ConfigurationManagementService : IConfigurationManagementService
    {
        public UserDto ValidateUser(UserDto userInput)
        {
            // Validate in db:
            return userInput;
        }
    }
}
