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
        bool success = _manageManagementService.AddMetting(manage, GetUserIdFromJWT());
        return success ? Ok("ok") : Ok("exist");
    }

    [HttpPost]
    [Route("remove")]
    public ActionResult RemoveMeeting(ManageDto manage)
    {
        bool success = _manageManagementService.RemoveMetting(manage,  GetUserIdFromJWT());
        return success ? Ok("ok") : NoContent();
    }
    #endregion

}