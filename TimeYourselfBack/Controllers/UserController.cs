using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
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
    private readonly IConfiguration _configuration;

    public UserController(ILogger<UserController> logger, IUserManagementService userManagementService, IConfiguration configuration)
    {
        _logger = logger;
        _userManagementService = userManagementService;
        _configuration = configuration;
    }

    [HttpPost(Name = "Users")]
    public async Task<UserDto> ValidateUser(UserDto userData)
    {
        _logger.LogInformation("test log");
        _logger.LogWarning("test log");
        _logger.LogError("test log");
        var userResponse = _userManagementService.ValidateUser(userData);
        var token = GenerateToken(userData);
        userResponse.Token = token;
        return userResponse;
    }

    private string GenerateToken(UserDto user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.UserNumber)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Key").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var securityToken = new JwtSecurityToken(
                                claims: claims,
                                expires: DateTime.Now.AddDays(30),
                                signingCredentials: creds);
        var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
        return token;
    }

}