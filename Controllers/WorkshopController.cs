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

        [HttpGet("clients/{id}")]
        public async Task<IActionResult> GetClientById(Guid id)
        {
            var client = await repository.GetClientById(id);
            ClientReadDTO clientReadDTO = mapper.Map<Client, ClientReadDTO>(client);
            return Ok(clientReadDTO);
        }

        [HttpGet("clients")]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await repository.GetAllClients();
            List<ClientReadDTO> clientsReadDTOs = mapper.Map<List<Client>, List<ClientReadDTO>>(clients);
            return Ok(clientsReadDTOs);
        }

        [HttpGet("specialists/{id}")]
        public async Task<IActionResult> GetsSpecialistById(Guid id)
        {
            var specialist = await repository.GetSpecialistById(id);
            SpecialistReadDTO specialistReadDTO = mapper.Map<Specialist, SpecialistReadDTO>(specialist);
            return Ok(specialistReadDTO);
        }

        [HttpGet("specialists")]
        public async Task<IActionResult> GetAllSpecialists()
        {
            var specialists = await repository.GetAllSpecialists();
            List<SpecialistReadDTO> specialistReadDTOs = mapper.Map<List<Specialist>, List<SpecialistReadDTO>>(specialists);
            return Ok(specialistReadDTOs);
        }

        [HttpGet("devices/types")]
        public async Task<IActionResult> GetAllDeviceTypes()
        {
            var deviceTypes = await repository.GetAllDeviceTypes();
            return Ok(deviceTypes);
        }

        [HttpGet("repairs/{id}")]
        public async Task<IActionResult> GetRepairById(Guid id)
        {
            var repair = await repository.GetRepairById(id);
            RepairReadDTO repairReadDTO = mapper.Map<Repair, RepairReadDTO>(repair);
            return Ok(repairReadDTO);
        }

        [HttpGet("repairs")]
        public async Task<IActionResult> GetAllRepairs()
        {
            var repairs = await repository.GetAllRepairs();
            List<RepairReadDTO> repairsReadDTOs = mapper.Map<List<Repair>, List<RepairReadDTO>>(repairs);
            return Ok(repairsReadDTOs);
        }
        [HttpGet("repairs/statuses")]
        public async Task<IActionResult> GetAllRepairStatuses()
        {
            var repairStatuses = await repository.GetAllRepairStatuses();
            return Ok(repairStatuses);
        }

        [HttpGet("stock/{id}")]
        public async Task<IActionResult> GetStockItemById(Guid id)
        {
            var stockItem = await repository.GetStockItemById(id);
            StockItemReadDTO stockItemReadDTO = mapper.Map<StockItem, StockItemReadDTO>(stockItem);
            return Ok(stockItemReadDTO);
        }

        [HttpGet("stock")]
        public async Task<IActionResult> GetAllStockItem()
        {
            var stock = await repository.GetAllStockItems();
            List<StockItemReadDTO> stockItemReadDTOs = mapper.Map<List<StockItem>, List<StockItemReadDTO>>(stock);
            return Ok(stockItemReadDTOs);
        }

        [HttpGet("items/types")]
        public async Task<IActionResult> GetAllItemTypes()
        {
            var itemTypes = await repository.GetAllItemTypes();
            return Ok(itemTypes);
        }

        [HttpGet("services/{id}")]
        public async Task<IActionResult> GetServiceById(Guid id)
        {
            var service = await repository.GetServiceById(id);
            ServiceReadDTO serviceReadDTO = mapper.Map<Service, ServiceReadDTO>(service);
            return Ok(serviceReadDTO);
        }

        [HttpGet("services")]
        public async Task<IActionResult> GetAllServices()
        {
            var services = await repository.GetAllServices();
            List<ServiceReadDTO> serviceReadDTOs = mapper.Map<List<Service>, List<ServiceReadDTO>>(services);
            return Ok(serviceReadDTOs);
        }

        [HttpGet("orders/{id}")]
        public async Task<IActionResult> GetOrderById(Guid id)
        {
            var order = await repository.GetOrderById(id);
            OrderReadDTO orderReadDTO = mapper.Map<Order, OrderReadDTO>(order);
            return Ok(orderReadDTO);
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
            //var clientDB = await repository.GetClientByModel(client);
            var clientDB = await repository.GetClientById(client.Id);
            if (clientDB == null)
            {
                client.Id = Guid.NewGuid();
                await repository.CreateClient(client);
                ClientReadDTO clientReadDTO = mapper.Map<ClientReadDTO>(client);
                return Ok(clientReadDTO);
            }
            ClientReadDTO clientDBReadDTO = mapper.Map<ClientReadDTO>(clientDB);
            return Ok(clientDBReadDTO);
        }

        [HttpPost("specialists")]
        public async Task<IActionResult> CreateSpecialist([FromBody] SpecialistWriteDTO specialistDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Specialist specialist = mapper.Map<Specialist>(specialistDTO);
            //var specialistDB = await repository.GetSpecialistByModel(specialist);
            var specialistDB = await repository.GetSpecialistById(specialist.Id);
            if (specialistDB == null)
            {
                specialist.Id = Guid.NewGuid();
                await repository.CreateSpecialist(specialist);
                SpecialistReadDTO specialistReadDTO = mapper.Map<SpecialistReadDTO>(specialist);
                return Ok(specialistReadDTO);
            }
            SpecialistReadDTO specialistDBReadDTO = mapper.Map<SpecialistReadDTO>(specialistDB);
            return Ok(specialistDBReadDTO);
        }

        [HttpPost("services")]
        public async Task<IActionResult> CreateService([FromBody] ServiceWriteDTO serviceDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Service service = mapper.Map<Service>(serviceDTO);
            //var serviceDB = await repository.GetServiceByModel(service);
            var serviceDB = await repository.GetServiceById(service.Id);
            if (serviceDB == null)
            {
                service.Id = Guid.NewGuid();
                await repository.CreateService(service);
                SpecialistReadDTO serviceReadDTO = mapper.Map<SpecialistReadDTO>(service);
                return Ok(serviceReadDTO);
            }
            SpecialistReadDTO serviceDBReadDTO = mapper.Map<SpecialistReadDTO>(serviceDB);
            return Ok(serviceDBReadDTO);
        }

        [HttpPost("repairs")]
        public async Task<IActionResult> CreateRepair([FromBody] RepairWriteDTO repairDTO)
        {
            //Orders are also created here because they only make sense in context of repair
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Repair repair = mapper.Map<Repair>(repairDTO);
            var repairDB = await repository.CreateRepair(repair);
            RepairReadDTO repairReadDTO = mapper.Map<RepairReadDTO>(repairDB);
            return Ok(repairReadDTO);
        }

        [HttpPost("stock")]
        public async Task<IActionResult> CreateStockItem([FromBody] StockItemWriteDTO stockDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            StockItem stock = mapper.Map<StockItem>(stockDTO);

            //var device = await repository.GetDeviceByModel(stock.Item.Device);
            var device = await repository.GetDeviceById(stock.Item.Device.Id);
            if (device == null)
            {
                device = stock.Item.Device;
                device.Id = Guid.NewGuid();
                await repository.CreateDevice(device);
            }

            //var item = await repository.GetItemByModel(stock.Item);
            var item = await repository.GetItemById(stock.Item.Id);
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
            // stockDB.ItemId = item.Id;
            // stockDB.Item = item;
            // stockDB.Item.Device = device;
            // await repository.UpdateStockItem(stockDB);
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
            var updatedClient = await repository.UpdateClient(client);
            ClientReadDTO clientReadDTO = mapper.Map<ClientReadDTO>(updatedClient);
            return Ok(clientReadDTO);
        }

        [HttpPost("specialists/{id}")]
        public async Task<IActionResult> UpdateSpecialist([FromBody] SpecialistWriteDTO specialistDTO, Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Specialist specialist = mapper.Map<Specialist>(specialistDTO);
            var updatedSpecialist = await repository.UpdateSpecialist(specialist);
            SpecialistReadDTO specialistReadDTO = mapper.Map<SpecialistReadDTO>(updatedSpecialist);
            return Ok(specialistReadDTO);
        }

        [HttpPost("services/{id}")]
        public async Task<IActionResult> UpdateService([FromBody] ServiceWriteDTO serviceDTO, Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            Service service = mapper.Map<Service>(serviceDTO);
            var updatedService = await repository.UpdateService(service);
            ServiceReadDTO serviceReadDTO = mapper.Map<ServiceReadDTO>(updatedService);
            return Ok(serviceReadDTO);
        }

        [HttpPost("repairs/{id}")]
        public async Task<IActionResult> UpdateRepair([FromBody] RepairWriteDTO repairDTO, Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var repair = mapper.Map<Repair>(repairDTO);
            var updatedRepair = await repository.UpdateRepair(repair);
            RepairReadDTO repairReadDTO = mapper.Map<RepairReadDTO>(updatedRepair);
            return Ok(repairReadDTO);
        }

        [HttpPost("stock/{id}")]
        public async Task<IActionResult> UpdateStockItem([FromBody] StockItemWriteDTO stockDTO, Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var stock = mapper.Map<StockItem>(stockDTO);
            var updatedStock = await repository.UpdateStockItem(stock);
            StockItemReadDTO stockReadDTO = mapper.Map<StockItemReadDTO>(updatedStock);
            return Ok(stockReadDTO);
        }

        [HttpDelete("clients/{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            await repository.DeleteClient(id);
            return Ok();
        }

        [HttpDelete("specialists/{id}")]
        public async Task<IActionResult> DeleteSpecialist(Guid id)
        {
            await repository.DeleteSpecialist(id);
            return Ok();
        }

        [HttpDelete("services/{id}")]
        public async Task<IActionResult> DeleteService(Guid id)
        {
            await repository.DeleteService(id);
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