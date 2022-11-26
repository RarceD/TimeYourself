using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;

namespace TimeYourselfBack.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Users")]
        public int GetUsers()
        {
            return 1;

        }
        [HttpPost(Name = "Users")]
        public async Task<ActionResult> ValidateUser(UserDto userData)
        {
            if (userData != null) return NoContent();
            // Validate user and return

                
            return Ok();
        }

    }
}