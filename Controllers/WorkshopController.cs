using Microsoft.AspNetCore.Mvc;
using Workshop.Data;
using AutoMapper;
using Workshop.Models;
using System.Net.WebSockets;

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

        [HttpGet("clients")]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await repository.GetAllClients();
            List<ClientReadDTO> clientsReadDTOs = mapper.Map<List<Client>, List<ClientReadDTO>>(clients);
            return Ok(clientsReadDTOs);
        }

        [HttpGet("repairs")]
        public async Task<IActionResult> GetAllRepairs()
        {
            var repairs = await repository.GetAllRepairs();
            List<RepairReadDTO> repairsReadDTOs = mapper.Map<List<Repair>, List<RepairReadDTO>>(repairs);
            return Ok(repairsReadDTOs);
        }

        [HttpGet("stock")]
        public async Task<IActionResult> GetAllStockItem()
        {
            var stock = await repository.GetAllStockItems();
            List<StockItemReadDTO> stockItemReadDTOs = mapper.Map<List<StockItem>, List<StockItemReadDTO>>(stock);
            return Ok(stockItemReadDTOs);
        }

        [HttpGet("orders")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await repository.GetAllOrders();
            List<OrderReadDTO> ordersReadDTOs = mapper.Map<List<Order>, List<OrderReadDTO>>(orders);
            return Ok(ordersReadDTOs);
        }

        [HttpPost("clients")]
        public async Task<IActionResult> CreateClient([FromBody] ClientWriteDTO clientDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Client client = mapper.Map<Client>(clientDTO);
            var clientDB = repository.GetAllClients().Result.Find(res => res.FullName == client.FullName
                                                                        && res.Phone == client.Phone);
            if (clientDB == null)
            {
                client.Id = Guid.NewGuid();
                await repository.CreateClient(client);
                ClientReadDTO clientReadDTO = mapper.Map<ClientReadDTO>(client);
                return Ok(clientReadDTO);
            }
            ClientReadDTO clientDBReadDTO = mapper.Map<ClientReadDTO>(clientDB);
            return Ok(client);
        }

        [HttpPost("repairs")]
        public async Task<IActionResult> CreateRepair([FromBody] RepairWriteDTO repairDTO)
        {
            //Orders are also created here because they only make sense in context of repair
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPost("stock")]
        public async Task<IActionResult> CreateStockItem([FromBody] StockItemWriteDTO stockDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            StockItem stock = mapper.Map<StockItem>(stockDTO);

            var device = repository.GetAllDevices().Result
                .Find(device => device.Brand == stock.Item.Device.Brand
                            && device.Model == stock.Item.Device.Model);
            if (device == null)
            {
                device = stock.Item.Device;
                device.Id = Guid.NewGuid();
                await repository.CreateDevice(device);
            }

            var item = repository.GetAllItems().Result
                .Find(item => item.Title == stock.Item.Title
                            && item.Device.Brand == device.Brand
                            && item.Device.Model == device.Model);

            if (item == null)
            {
                item = stock.Item;
                item.Id = Guid.NewGuid();
                await repository.CreateItem(item);
            }

            var stockDB = await repository.GetStockItemByItemId(item.Id);
            if (stockDB == null)
            {
                stock.Id = Guid.NewGuid();
                stock.ItemId = item.Id;
                stock.Item = item;
                stock.Item.Device = device;
                await repository.CreateStockItem(stock);
                StockItemReadDTO stockReadDTO = mapper.Map<StockItemReadDTO>(stock);
                return Ok(stockReadDTO);
            }
            StockItemReadDTO stockDBReadDTO = mapper.Map<StockItemReadDTO>(stockDB);
            return Ok(stockDBReadDTO);
        }

        // [HttpPost("orders")]
        // public async Task<IActionResult> CreateOrder([FromBody] OrderWriteDTO orderDTO)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest();
        //     }
        //     Order order = mapper.Map<Order>(orderDTO);

        //     var device = repository.GetAllDevices().Result
        //         .Find(device => device.Brand == order.Product.Device.Brand
        //                     && device.Model == order.Product.Device.Model);
        //     if (device == null)
        //     {
        //         device = order.Product.Device;
        //         device.Id = Guid.NewGuid();
        //         await repository.CreateDevice(device);
        //     }

        //     var item = repository.GetAllItems().Result
        //         .Find(item => item.Title == order.Product.Title
        //                     && item.Device.Brand == device.Brand
        //                     && item.Device.Model == device.Model);

        //     if (item == null)
        //     {
        //         item = order.Product;
        //         item.Id = Guid.NewGuid();
        //         await repository.CreateItem(item);
        //     }

        //     var orderDB =
        //     order.Id = Guid.NewGuid();
        //     order.Product = item;
        //     order.Product.Device = device;
        //     order.DateOrdered = DateTime.Now;
        //     order.IsProcessed = false;
        //     await repository.CreateOrder(order);
        //     return Ok();
        // }

        [HttpPost("clients/{id}")]
        public async Task<IActionResult> UpdateClient([FromBody] ClientWriteDTO clientDTO, Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Client client = mapper.Map<Client>(clientDTO);
            var clientDB = await repository.GetClientById(id);
            clientDB.FullName = client.FullName;
            clientDB.Comment = client.Comment;
            clientDB.Phone = client.Phone;
            await repository.UpdateClient(clientDB);
            return Ok(clientDB);
        }

        [HttpPost("repairs/{id}")]
        public async Task<IActionResult> UpdateRepair(Guid id)
        {
            return Ok();
        }

        [HttpPost("stock/{id}")]
        public async Task<IActionResult> UpdateStockItem(Guid id)
        {
            return Ok();
        }

        [HttpPost("orders/{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id)
        {
            return Ok();
        }

        [HttpDelete("clients/{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            await repository.DeleteClient(id);
            return Ok();
        }

        [HttpDelete("repairs/{id}")]
        public async Task<IActionResult> DeleteRepair(Guid id)
        {
            await repository.DeleteRepair(id);
            return Ok();
        }

        [HttpDelete("stock/{id}")]
        public async Task<IActionResult> DeleteStockItem(Guid id)
        {
            await repository.DeleteStockItem(id);
            return Ok();
        }

        [HttpDelete("orders/{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            await repository.DeleteOrder(id);
            return Ok();
        }
    }
}