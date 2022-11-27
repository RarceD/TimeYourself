using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[ApiController]
[Route("[controller]")]
public class ConfigurationController : ControllerBase
{
    private readonly ILogger<ConfigurationController> _logger;
    private readonly IConfigurationManagementService _configurationManagementService;

    public ConfigurationController(ILogger<ConfigurationController> logger,
        IConfigurationManagementService configurationManagementService)
    {
        _logger = logger;
        _configurationManagementService = configurationManagementService;
    }

    #region GET
    [HttpGet]
    public List<ConfigDto> GetConfigByUser(int userId)
    {
        return _configurationManagementService.GetConfigurationByUserId(userId);
    }
    #endregion

    #region POST

    [HttpPost]
    public ActionResult AddConfiguration(ConfigDto newConfig)
    {
        bool success = _configurationManagementService.AddOrUpdateConfiguration(newConfig);
        return success ? Ok() : NoContent();
    }
    #endregion

}