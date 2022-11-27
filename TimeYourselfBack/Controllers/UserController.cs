using Microsoft.AspNetCore.Mvc;
using System.Net;
using TimeYourselfBack.Models;
using TimeYourselfBack.Repositories;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<UserController> _logger;
    private readonly IUserManagementService _userManagementService;

    public UserController(ILogger<UserController> logger, IUserManagementService userManagementService)
    {
        _logger = logger;
        _userManagementService = userManagementService;
    }

    [HttpPost(Name = "Users")]
    public async Task<UserDto> ValidateUser(UserDto userData)
    {
        var userResponse = _userManagementService.ValidateUser(userData);
        return userResponse;
    }

}