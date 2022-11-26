using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public class UserManagementService : IUserManagementService
    {
        public UserDto ValidateUser(UserDto userInput)
        {
            // Validate in db:
            return userInput;
        }
    }
}
