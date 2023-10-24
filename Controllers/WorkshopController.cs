using Microsoft.AspNetCore.Mvc;
using Workshop.Data;

namespace Workshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly IWorkshopRepository repository;

        public NotesController(IWorkshopRepository repository)
        {
            this.repository = repository;
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

        // [HttpPost("")]
        // public async Task<IActionResult> AddOrder([FromBody] OrderCreateDto orderDto)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }
        //     Order tmp = mapper.Map<Order>(d);
        //     tmp.Id = Guid.NewGuid();
        //     await repository.CreateOrder(tmp);
        //     return Ok(tmp);
        // }
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