using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class VisualizerController : BaseController
{
    private readonly ILogger<VisualizerController> _logger;
    private readonly IVisualizerManagementService _visualizerManagementService;

    public VisualizerController(ILogger<VisualizerController> logger,
        IVisualizerManagementService visualizerManagementService)
    {
        _logger = logger;
        _visualizerManagementService = visualizerManagementService;
    }

    #region GET

    /// <summary>
    /// Get all the visualizer data for specifig configuration user
    /// </summary>
    /// <param name="configId"></param>
    /// <returns></returns>
    [HttpGet]
    public IEnumerable<string> GetVisualizerDataSpecifig(int configId, int timestamp)
    {
        DateTime dateTime = DateTimeOffset.FromUnixTimeSeconds(timestamp).DateTime;
        return _visualizerManagementService.GetVisualizerPeople(GetUserIdFromJWT(), configId, dateTime);
    }

    /// <summary>
    /// Get all visualizer data for all configs
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [Route("all")]
    public IEnumerable<VisualizerLayoutDto> GetVisualizerData(int year)
    {
        return _visualizerManagementService.GetCalerdar(GetUserIdFromJWT(), null, year);
    }

    #endregion

    #region POST
    #endregion
}