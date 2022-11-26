using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;

namespace TimeYourselfBack.Service;
public class UserManagementService : IUserManagementService
{
    private readonly ApplicationDbContext _dbContext;

    public UserManagementService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public UserDto ValidateUser(UserDto userInput)
    {
        // Validate in db:
        var client = _dbContext.Clients.Where(c => c.User == userInput.UserNumber).FirstOrDefault();
        userInput.Token = client.Token;
        return userInput;
    }
}
