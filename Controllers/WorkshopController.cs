using Microsoft.AspNetCore.Mvc;
using Workshop.Data;
using AutoMapper;
using Workshop.Models;

namespace Workshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkshopController : ControllerBase
    {
        private readonly IWorkshopRepository repository;
        private readonly IMapper mapper;

        public WorkshopController(IWorkshopRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllRepairs()
        {
            var repairs = await repository.GetAllRepairs();
            return Ok(repairs);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            await repository.DeleteRepair(id);
            return Ok();
        }

        [HttpPost("")]
        public async Task<IActionResult> AddRepair([FromBody] OrderCreateDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Order tmp = mapper.Map<Order>(orderDto);
            tmp.Id = Guid.NewGuid();
            await repository.CreateRepair(tmp);
            return Ok(tmp);
        }
    }
}