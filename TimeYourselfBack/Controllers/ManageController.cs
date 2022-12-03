using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;
using TimeYourselfBack.Service;

namespace TimeYourselfBack.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ManageController : BaseController
{
    private readonly ILogger<ManageController> _logger;
    private readonly IManageManagementService _manageManagementService;

    public ManageController(ILogger<ManageController> logger, IManageManagementService manageManagementService)
    {
        _logger = logger;
        _manageManagementService = manageManagementService;
    }

    #region GET
    #endregion

    #region POST

    [HttpPost]
    [Route("add")]
    public ActionResult AddMeeting(ManageDto manage)
    {
        var userId = GetUserIdFromJWT();
        bool success = _manageManagementService.AddMetting(manage, userId);
        return success ? Ok() : NoContent();
    }

    [HttpPost]
    [Route("remove")]
    public ActionResult RemoveMeeting(ManageDto manage)
    {
        var userId = GetUserIdFromJWT();
        bool success = _manageManagementService.RemoveMetting(manage, userId);
        return success ? Ok() : NoContent();
    }
    #endregion

}