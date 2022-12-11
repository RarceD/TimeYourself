using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ConfigurationController : BaseController 
{
    private readonly ILogger<ConfigurationController> _logger;
    private readonly IConfigurationManagementService _configurationManagementService;

    public ConfigurationController(ILogger<ConfigurationController> logger,
        IConfigurationManagementService configurationManagementService
        )
    {
        _logger = logger;
        _configurationManagementService = configurationManagementService;
    }

    #region GET
    [HttpGet]
    public List<ConfigDto> GetConfigByUser()
    {
        var userId = GetUserIdFromJWT();
        return _configurationManagementService.GetConfigurationByUserId(userId);
    }
    #endregion

    #region POST

    [HttpPost]
    [Route("add")]
    public ActionResult AddConfiguration(ConfigDto config)
    {
        config.UserId = GetUserIdFromJWT();
        bool success = _configurationManagementService.AddOrUpdateConfiguration(config);
        return success ? Ok("ok") : NoContent();
    }

    [HttpPost]
    [Route("remove")]
    public ActionResult RemoveConfiguration(ConfigDto config)
    {
        config.UserId = GetUserIdFromJWT();
        bool success = _configurationManagementService.RemoveConfiguration(config);
        return success ? Ok("ok") : NoContent();
    }
    #endregion

}