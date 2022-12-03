using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IUserManagementService
    {
        UserDto ValidateUser(UserDto userInput);
    }
}