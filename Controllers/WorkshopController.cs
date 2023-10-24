using Microsoft.AspNetCore.Mvc;
using Workshop.Data;
using AutoMapper;
using Workshop.Models;

namespace Workshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly IWorkshopRepository repository;
        private readonly IMapper mapper;

        public NotesController(IWorkshopRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllOrders()
        {
            var notes = await repository.GetAllOrders();
            return Ok(notes);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            await repository.DeleteOrder(id);
            return Ok();
        }

        [HttpPost("")]
        public async Task<IActionResult> AddOrder([FromBody] OrderCreateDto orderDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Order tmp = mapper.Map<Order>(orderDto);
            tmp.Id = Guid.NewGuid();
            await repository.CreateOrder(tmp);
            return Ok(tmp);
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> ChangeNoteStatus(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            await repository.ChangeOrderStatus(id);
            return Ok(await repository.GetOrderById(id));
        }
    }
}