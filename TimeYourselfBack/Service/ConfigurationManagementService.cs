using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;

namespace TimeYourselfBack.Service;
public class ConfigurationManagementService : IConfigurationManagementService
{

    private readonly ApplicationDbContext _context;

    public ConfigurationManagementService(ApplicationDbContext context)
    {
        _context = context;
    }

    public UserDto ValidateUser(UserDto userInput)
    {
        // Validate in db:
        return userInput;
    }
}
