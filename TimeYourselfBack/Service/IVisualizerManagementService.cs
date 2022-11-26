using TimeYourselfBack.Models;

namespace TimeYourselfBack.Service
{
    public interface IVisualizerManagementService
    {
        UserDto ValidateUser(UserDto userInput);
    }
}