using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
namespace TimeYourselfBack.Controllers;

[ApiController]
[Route("[controller]")]
public class BaseController : ControllerBase
{
    protected int GetUserIdFromJWT()
    {
        var user = Int32.Parse(HttpContext.User.Identities.FirstOrDefault().Name);
        return user;
    }
}