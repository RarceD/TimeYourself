using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service;
    public class VisualizerManagementService : IVisualizerManagementService
{
    public UserDto ValidateUser(UserDto userInput)
    {
        // Validate in db:
        return userInput;
    }
}
