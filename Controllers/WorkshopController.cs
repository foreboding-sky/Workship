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

        [HttpGet("/clients")]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await repository.GetAllClients();
            return Ok(clients);
        }

        [HttpGet("/repairs")]
        public async Task<IActionResult> GetAllRepairs()
        {
            var repairs = await repository.GetAllRepairs();
            return Ok(repairs);
        }

        [HttpGet("/stock")]
        public async Task<IActionResult> GetAllStockItem()
        {
            var stock = await repository.GetAllStockItems();
            return Ok(stock);
        }

        [HttpGet("/orders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await repository.GetAllOrders();
            return Ok(orders);
        }

        [HttpDelete("/clients/{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            await repository.DeleteClient(id);
            return Ok();
        }

        [HttpDelete("/repairs/{id}")]
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            await repository.DeleteRepair(id);
            return Ok();
        }

        [HttpDelete("/stock/{id}")]
        public async Task<IActionResult> DeleteStockItem(Guid id)
        {
            await repository.DeleteStockItem(id);
            return Ok();
        }

        [HttpDelete("/orders/{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            await repository.DeleteOrder(id);
            return Ok();
        }

        [HttpPost("/clients")]
        public async Task<IActionResult> AddClient()
        {
            return Ok();
        }

        [HttpPost("/repairs")]
        public async Task<IActionResult> AddRepair()
        {
            // if (!ModelState.IsValid)
            // {
            //     return BadRequest();
            // }
            // Order tmp = mapper.Map<Order>(orderDto);
            // tmp.Id = Guid.NewGuid();
            // await repository.CreateOrder(tmp);
            return Ok();
        }

        [HttpPost("/stock")]
        public async Task<IActionResult> AddStockItem()
        {
            return Ok();
        }

        [HttpPost("/orders")]
        public async Task<IActionResult> AddOrder()
        {
            return Ok();
        }

        [HttpPost("/clients/{id}")]
        public async Task<IActionResult> UpdateClient(Guid id)
        {
            return Ok();
        }

        [HttpPost("/repairs/{id}")]
        public async Task<IActionResult> UpdateRepair(Guid id)
        {
            return Ok();
        }

        [HttpPost("/stock/{id}")]
        public async Task<IActionResult> UpdateStockItem(Guid id)
        {
            return Ok();
        }

        [HttpPost("/orders/{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id)
        {
            return Ok();
        }
    }
}