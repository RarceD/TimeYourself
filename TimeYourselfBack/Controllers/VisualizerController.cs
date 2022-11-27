using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[ApiController]
[Route("[controller]")]
public class VisualizerController : ControllerBase
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
    [HttpGet]
    public List<VisualizerDto> GetConfigByUser(int userId)
    {
        return null; // _visualizerManagementService.GetCalendars(userId);
    }
    #endregion

    #region POST

    [HttpPost]
    public ActionResult AddVisualizerRegister(VisualizerDto newVisualizer)
    {
        bool success = _visualizerManagementService.AddVisualizerRegister(newVisualizer.UserId, newVisualizer.ConfigId);
        return success ? Ok() : NoContent();
    }
    #endregion
}