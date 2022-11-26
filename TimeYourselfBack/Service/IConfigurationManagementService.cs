using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IConfigurationManagementService
    {
        UserDto ValidateUser(UserDto userInput);
    }
}