using Microsoft.EntityFrameworkCore;
using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Repositories.Models;

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
        // Validate in db only the name:
        Clients? client = _dbContext.Clients.Where(i=>i.Name == userInput.UserNumber).FirstOrDefault();
        userInput.Token = client != null ? client.Token : "";
        userInput.Id = client != null ? client.Id : 0;
        return userInput;
    }
}
