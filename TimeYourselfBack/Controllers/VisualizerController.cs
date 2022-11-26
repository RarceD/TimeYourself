using Microsoft.AspNetCore.Mvc;
using TimeYourselfBack.Models;

namespace TimeYourselfBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VisualizerController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<VisualizerController> _logger;

        public VisualizerController(ILogger<VisualizerController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeerForeast")]
        public IEnumerable<int> Get()
        {
            return new List<int>();
        }
    }
}