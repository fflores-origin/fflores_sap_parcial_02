using Microsoft.AspNetCore.Mvc;
using SAP.Core.Interfaces;

namespace SAP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogisticsController : ControllerBase
    {
        private readonly ILogger<LogisticsController> _logger;
        private readonly ILocationService _locationService;

        public LogisticsController(
            ILocationService locationService,
            ILogger<LogisticsController> logger)
        {
            _locationService = locationService;
            _logger = logger;
        }

        [HttpGet("locations")]
        public async Task<IActionResult> GetLocations()
        {
            try
            {
                var response = _locationService.GetAllLocations();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("distances")]
        public async Task<IActionResult> GetDistances()
        {
            try
            {
                var response = _locationService.GetAllDistances();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("shortest")]
        public async Task<IActionResult> GetShortest()
        {
            try
            {
                var result = _locationService.GetShortest();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("shortestByOriginAndDestiny")]
        public async Task<IActionResult> GetShortestByOriginAndDestiny(int origin, int destiny)
        {
            try
            {
                var result = _locationService.GetShortest(origin, destiny);
                return Ok(result); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("shortestByOrigin")]
        public async Task<IActionResult> GetShortestByOrigin(int origin)
        {
            try
            {
                var result = _locationService.GetShortest(origin);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}