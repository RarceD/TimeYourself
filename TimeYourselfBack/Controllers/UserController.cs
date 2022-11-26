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

    [HttpGet(Name = "Users")]
    public IEnumerable<UserDto> GetUsers()
    {
        UserDto dto = new();
        dto.UserNumber = "1230983u14p98234ujk";
        dto.Token = "110218patatapatata80ujk";
        List<UserDto> all = new();
        all.Add(dto);
        all.Add(dto);
        all.Add(dto);
        all.Add(dto);
        all.Add(dto);
        return all;

    }
    [HttpPost(Name = "Users")]
    public async Task<UserDto> ValidateUser(UserDto userData)
    {
        //if (userData == null) return null;
        UserDto dto = new();
        dto.UserNumber = "1230983u14p98234ujk";
        dto.Token = "110218patatapatata80ujk";
        return dto;
        // Validate user and return
        //var userResponse = _userManagementService.ValidateUser(userData);
        
        /*
        var test = _context.Clients;
        test.FirstOrDefault().User = "success";
        var all = _context.Clients.ToList();
        return userResponse;
        */
    }

}