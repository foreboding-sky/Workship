using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Workshop.Models;

namespace Workshop.Data
{
    public class WorkshopRepository : IWorkshopRepository
    {
        private readonly ApplicationDbContext context;
        public WorkshopRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task<Client> CreateClient(Client client)
        {
            context.Clients.Add(client);
            await context.SaveChangesAsync();
            return client;
        }

        public async Task<Device> CreateDevice(Device device)
        {
            context.Devices.Add(device);
            await context.SaveChangesAsync();
            return device;
        }

        public async Task<Item> CreateItem(Item item)
        {
            context.Items.Add(item);
            await context.SaveChangesAsync();
            return item;
        }

        public async Task<Order> CreateOrder(Order order)
        {
            context.Orders.Add(order);
            await context.SaveChangesAsync();
            return order;
        }

        public async Task<Repair> CreateRepair(Repair repair)
        {
            repair.Id = Guid.NewGuid(); //no need to check if repair entry already exist, always create a new one

            Client client;
            if (repair.Client != null)
            {
                client = await GetClientById(repair.Client.Id);
                if (client == null)
                {
                    client = new Client
                    {
                        FullName = repair.Client.FullName,
                        Phone = repair.Client.Phone,
                        Comment = repair.Client.Comment,
                        Id = Guid.NewGuid()
                    };
                    var clitntDB = await CreateClient(client);
                    repair.Client = clitntDB;
                }
                repair.Client = client;
            }

            Specialist specialist;
            if (repair.Specialist != null)
            {
                specialist = await GetSpecialistById(repair.Specialist.Id);
                if (specialist == null)
                {
                    specialist = new Specialist
                    {
                        FullName = repair.Specialist.FullName,
                        Comment = repair.Specialist.Comment,
                        Id = Guid.NewGuid()
                    };
                    var specialistDB = await CreateSpecialist(specialist);
                    repair.Specialist = specialistDB;
                }
                repair.Specialist = specialist;
            }

            Device device;
            if (repair.Device != null)
            {
                device = await GetDeviceById(repair.Device.Id);
                if (device == null)
                    device = await GetDeviceByModel(repair.Device);
                if (device == null)
                {
                    device = new Device
                    {
                        Brand = repair.Device.Brand,
                        Model = repair.Device.Model,
                        Type = repair.Device.Type,
                        Id = Guid.NewGuid()
                    };
                    var deviceDB = await CreateDevice(device);
                    repair.Device = deviceDB;
                }
                repair.Device = device;
            }

            //check for services
            List<RepairService> repairServicesDB = new List<RepairService>();
            if (repair.RepairServices != null)
            {
                foreach (var service in repair.RepairServices)
                {
                    if (service.Service != null)
                    {
                        var serviceDB = await GetServiceById(service.Service.Id);
                        if (serviceDB == null)
                            serviceDB = await GetServiceByModel(service.Service);
                        if (serviceDB == null)
                            continue; //item won't add if there are no entries of such item in database
                        var repairService = await CreateRepairService(new RepairService { Service = serviceDB });
                        repairServicesDB.Add(repairService);
                    }
                }
                repair.RepairServices = repairServicesDB;
            }

            //check for repair items
            List<RepairItem> repairItemsDB = new List<RepairItem>();
            if (repair.Products != null)
            {
                foreach (var product in repair.Products)
                {
                    if (product.Item != null)
                    {
                        var itemDB = await GetStockItemById(product.Item.Id);
                        if (itemDB == null)
                            itemDB = await GetStockItemByModel(product.Item);
                        if (itemDB == null)
                            continue; //item won't add if there are no entries of such item in database
                        var repairItem = await CreateRepairItem(new RepairItem { Item = itemDB });
                        repairItemsDB.Add(repairItem);
                    }
                }
                repair.Products = repairItemsDB;
            }

            //check for orders
            List<Order> ordersDB = new List<Order>();
            if (repair.OrderedProducts != null)
            {
                Order orderDB;
                foreach (var order in repair.OrderedProducts)
                {
                    if (order.Product != null)
                    {
                        orderDB = new Order
                        {
                            Id = Guid.NewGuid(),
                            DateOrdered = order.DateOrdered,
                            DateEstimated = order.DateEstimated,
                            DateRecieved = order.DateRecieved,
                            Comment = order.Comment,
                            Price = order.Price,
                            IsProcessed = order.IsProcessed,
                            Source = order.Source,
                            Product = await GetItemById(order.Id)
                        };
                        if (orderDB.Product == null)
                            orderDB.Product = await GetItemByModel(order.Product);
                        if (orderDB.Product == null)
                            orderDB.Product = await CreateItem(new Item { Title = order.Product.Title, Type = order.Product.Type, Device = repair.Device });
                        orderDB = await CreateOrder(orderDB);
                        ordersDB.Add(orderDB);
                    }
                }
                repair.OrderedProducts = ordersDB;
            }

            context.Repairs.Add(repair);
            await context.SaveChangesAsync();
            return repair;
        }

        public async Task<RepairItem> CreateRepairItem(RepairItem repairItem)
        {
            context.RepairItems.Add(repairItem);
            await context.SaveChangesAsync();
            return repairItem;
        }

        public async Task<RepairService> CreateRepairService(RepairService repairService)
        {
            context.RepairServices.Add(repairService);
            await context.SaveChangesAsync();
            return repairService;
        }

        public async Task<Service> CreateService(Service service)
        {
            context.Services.Add(service);
            await context.SaveChangesAsync();
            return service;
        }

        public async Task<Specialist> CreateSpecialist(Specialist specialist)
        {
            context.Specialists.Add(specialist);
            await context.SaveChangesAsync();
            return specialist;
        }

        public async Task<StockItem> CreateStockItem(StockItem stockItem)
        {
            context.Stock.Add(stockItem);
            await context.SaveChangesAsync();
            return stockItem;
        }

        public async Task DeleteClient(Guid id)
        {
            var client = context.Clients.Find(id);
            if (client is null) return;
            context.Clients.Remove(client);
            await context.SaveChangesAsync();
        }

        public async Task DeleteDevice(Guid id)
        {
            var device = context.Devices.Find(id);
            if (device is null) return;
            context.Devices.Remove(device);
            await context.SaveChangesAsync();
        }

        public async Task DeleteItem(Guid id)
        {
            var item = context.Items.Find(id);
            if (item is null) return;
            context.Items.Remove(item);
            await context.SaveChangesAsync();
        }

        public async Task DeleteOrder(Guid id)
        {
            var order = context.Orders.Find(id);
            if (order is null) return;
            context.Orders.Remove(order);
            await context.SaveChangesAsync();
        }

        public async Task DeleteRepair(Guid id)
        {
            var repair = context.Repairs.Find(id);
            if (repair is null) return;
            context.Repairs.Remove(repair);
            await context.SaveChangesAsync();
        }

        public async Task DeleteService(Guid id)
        {
            var service = context.Services.Find(id);
            if (service is null) return;
            context.Services.Remove(service);
            await context.SaveChangesAsync();
        }

        public async Task DeleteSpecialist(Guid id)
        {
            var specialist = context.Specialists.Find(id);
            if (specialist is null) return;
            context.Specialists.Remove(specialist);
            await context.SaveChangesAsync();
        }

        public async Task DeleteStockItem(Guid id)
        {
            var stockItem = context.Stock.Find(id);
            if (stockItem is null) return;
            context.Stock.Remove(stockItem);
            await context.SaveChangesAsync();
        }

        public async Task<List<Client>> GetAllClients()
        {
            return await context.Clients.ToListAsync();
        }

        public async Task<List<Device>> GetAllDevices()
        {
            return await context.Devices.ToListAsync();
        }

        public async Task<List<string>> GetAllDeviceTypes()
        {
            return await Task<List<string>>.Run(() => //idk why lol i just was told to wrap it in Task so it'll actually be async
            {
                List<string> EnumNames = new List<string>();
                foreach (string name in Enum.GetNames<DeviceType>())
                {
                    EnumNames.Add(name);
                }
                return EnumNames;
            });
        }

        public async Task<List<Item>> GetAllItems()
        {
            return await context.Items.Include(c => c.Device).ToListAsync();
        }

        public async Task<List<string>> GetAllItemTypes()
        {
            return await Task<List<string>>.Run(() => //idk why lol i just was told to wrap it in Task so it'll actually be async
            {
                List<string> EnumNames = new List<string>();
                foreach (string name in Enum.GetNames<ItemType>())
                {
                    EnumNames.Add(name);
                }
                return EnumNames;
            });
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await context.Orders.Include(c => c.Product).ThenInclude(c => c.Device).ToListAsync();
        }

        public async Task<List<Repair>> GetAllRepairs()
        {
            return await context.Repairs.Include(c => c.Client)
                                        .Include(c => c.Device)
                                        .Include(c => c.Products).ThenInclude(c => c.Item).ThenInclude(c => c.Item).ThenInclude(c => c.Device)
                                        .Include(c => c.OrderedProducts).ThenInclude(c => c.Product).ThenInclude(c => c.Device)
                                        .Include(c => c.RepairServices).ThenInclude(c => c.Service)
                                        .Include(c => c.Specialist).ToListAsync();
        }

        public async Task<List<string>> GetAllRepairStatuses()
        {
            return await Task<List<string>>.Run(() => //idk why lol i just was told to wrap it in Task so it'll actually be async
            {
                List<string> EnumNames = new List<string>();
                foreach (string name in Enum.GetNames<RepairStatus>())
                {
                    EnumNames.Add(name);
                }
                return EnumNames;
            });
        }

        public async Task<List<Service>> GetAllServices()
        {
            return await context.Services.ToListAsync();
        }

        public async Task<List<Specialist>> GetAllSpecialists()
        {
            return await context.Specialists.ToListAsync();
        }

        public async Task<List<StockItem>> GetAllStockItems()
        {
            return await context.Stock.Include(c => c.Item).ThenInclude(c => c.Device).ToListAsync();
        }

        public async Task<Client> GetClientById(Guid id)
        {
            return await context.Clients.FindAsync(id);
        }

        public async Task<Client> GetClientByModel(Client client)
        {
            var result = GetAllClients().Result
                .Find(res => res.FullName == client.FullName
                            && res.Phone == client.Phone
                            && res.Comment == client.Comment);
            return result;
        }

        public async Task<Device> GetDeviceById(Guid id)
        {
            return await context.Devices.FindAsync(id);
        }

        public async Task<Device> GetDeviceByModel(Device device)
        {
            var result = GetAllDevices().Result
                .Find(res => res.Brand == device.Brand
                            && res.Model == device.Model);
            return result;
        }

        public async Task<Item> GetItemById(Guid id)
        {
            return GetAllItems().Result.Find(res => res.Id == id);
        }

        public async Task<Item> GetItemByModel(Item item)
        {
            return GetAllItems().Result
                            .Find(res => res.Title == item.Title
                            && res.Device.Brand == item.Device.Brand
                            && res.Device.Model == item.Device.Model);
        }

        public async Task<Order> GetOrderById(Guid id)
        {
            return GetAllOrders().Result.Find(order => order.Id == id);
        }

        public async Task<Order> GetOrderByModel(Order order)
        {
            //TODO if needed
            throw new NotImplementedException();
        }

        public async Task<Repair> GetRepairById(Guid id)
        {
            return GetAllRepairs().Result.Find(repair => repair.Id == id);
        }

        public async Task<Service> GetServiceById(Guid id)
        {
            return GetAllServices().Result.Find(res => res.Id == id);
        }

        public async Task<Service> GetServiceByModel(Service service)
        {
            return GetAllServices().Result
                            .Find(res => res.Name == service.Name
                            && res.Price == service.Price);
        }

        public async Task<Specialist> GetSpecialistById(Guid id)
        {
            return await context.Specialists.FindAsync(id);
        }

        public async Task<Specialist> GetSpecialistByModel(Specialist specialist)
        {
            return GetAllSpecialists().Result
                            .Find(res => res.FullName == specialist.FullName
                            && res.Comment == specialist.Comment);
        }

        public async Task<StockItem> GetStockItemById(Guid id)
        {
            return GetAllStockItems().Result.Find(stock => stock.Id == id);
        }

        public async Task<StockItem> GetStockItemByItemId(Guid id)
        {
            return GetAllStockItems().Result.Find(stock => stock.Item.Id == id);
        }

        public async Task<StockItem> GetStockItemByModel(StockItem stock)
        {
            //var item = await GetItemById(stock.Item.Id);
            var item = await GetItemByModel(stock.Item);
            return GetAllStockItems().Result
                            .Find(res => res.Price == stock.Price
                            && res.Item == item);
        }

        public async Task<Client> UpdateClient(Client client)
        {
            var clientDB = await GetClientById(client.Id);
            if (clientDB == null)
                clientDB = await GetClientByModel(client);
            if (clientDB == null)
                return null;

            clientDB.FullName = client.FullName;
            clientDB.Comment = client.Comment;
            clientDB.Phone = client.Phone;
            await context.SaveChangesAsync();
            return clientDB;
        }

        public async Task<Device> UpdateDevice(Device device)
        {
            var deviceDB = await GetDeviceById(device.Id);
            if (deviceDB == null)
                deviceDB = await GetDeviceByModel(device);
            if (deviceDB == null)
                return null;

            deviceDB.Type = device.Type;
            deviceDB.Model = device.Model;
            deviceDB.Brand = device.Brand;
            await context.SaveChangesAsync();
            return deviceDB;
        }

        public async Task<Item> UpdateItem(Item item)
        {
            var itemDB = await GetItemById(item.Id);
            if (itemDB == null)
                itemDB = await GetItemByModel(item);
            if (itemDB == null)
                return null;
            itemDB.Title = item.Title;
            itemDB.Type = item.Type;
            if (item.Device != null)
            {
                if (itemDB.Device == null)
                    itemDB.Device = new Device();

                itemDB.Device.Type = item.Device.Type;
                itemDB.Device.Brand = item.Device.Brand;
                itemDB.Device.Model = item.Device.Model;
            }
            await context.SaveChangesAsync();
            return itemDB;
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            //TODO
            var tmp = context.Orders.Find(order.Id);
            tmp = order;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<Repair> UpdateRepair(Repair repair)
        {
            var repairDB = await GetRepairById(repair.Id);
            if (repairDB == null)
                return null;

            //Services update
            var existingServices = repairDB.RepairServices?.ToList() ?? new List<RepairService>();
            var selectedServices = repair.RepairServices?.ToList() ?? new List<RepairService>();
            var servicesToAdd = selectedServices.Except(existingServices, new RepairServiceComparer()).ToList();
            var servicesToRemove = existingServices.Except(selectedServices, new RepairServiceComparer()).ToList();
            List<Service> ServicesToAddDB = new List<Service>();
            foreach (var repairService in servicesToAdd)
            {
                if (repairService.Service?.Id != null)
                {
                    var service = context.Services.Find(repairService.Service.Id);
                    if (service != null)
                        ServicesToAddDB.Add(service);
                }
            }

            foreach (var service in servicesToRemove)
                repairDB.RepairServices?.Remove(service);

            foreach (var service in ServicesToAddDB)
                repairDB.RepairServices?.Add(new RepairService() { Service = service });


            //Products update
            var existingItems = repairDB.Products?.ToList() ?? new List<RepairItem>();
            var selectedItems = repair.Products?.ToList() ?? new List<RepairItem>();
            var itemsToAdd = selectedItems.Except(existingItems, new RepairItemComparer()).ToList();
            var itemsToRemove = existingItems.Except(selectedItems, new RepairItemComparer()).ToList();
            List<StockItem> itemsToAddDB = new List<StockItem>();
            foreach (var repairItem in itemsToAdd)
            {
                if (repairItem.Item != null)
                {
                    var item = await GetStockItemById(repairItem.Item.Id);
                    if (item != null)
                        itemsToAddDB.Add(item);
                }
            }

            foreach (var item in itemsToRemove)
                repairDB.Products?.Remove(item);

            foreach (var item in itemsToAddDB)
                repairDB.Products?.Add(new RepairItem() { Item = item });

            //Ordered products update
            var existingOrders = repairDB.OrderedProducts?.ToList() ?? new List<Order>();
            var selectedOrders = repair.OrderedProducts?.ToList() ?? new List<Order>();
            var ordersToAdd = selectedOrders.Except(existingOrders, new OrderComparer()).ToList();
            var ordersToRemove = existingOrders.Except(selectedOrders, new OrderComparer()).ToList();

            foreach (var item in ordersToRemove)
                repairDB.OrderedProducts?.Remove(item);

            foreach (var item in ordersToAdd)
                repairDB.OrderedProducts?.Add(item);

            //client update
            if (repairDB.Client != null && repair.Client != null)
            {
                if (repairDB.Client.Id != repair.Client.Id && repair.Client.Id != Guid.Empty)
                {
                    repairDB.Client.Id = repair.Client.Id;
                    repairDB.Client = await UpdateClient(repair.Client);
                }
                else
                    repairDB.Client = await UpdateClient(repair.Client);
            }

            //specialist update
            if (repairDB.Specialist != null && repair.Specialist != null)
            {
                if (repairDB.Specialist.Id != repair.Specialist.Id && repair.Specialist.Id != Guid.Empty)
                {
                    repairDB.Specialist.Id = repair.Specialist.Id;
                    repairDB.Specialist = await UpdateSpecialist(repair.Specialist);
                }
                else
                    repairDB.Specialist = await UpdateSpecialist(repair.Specialist);
            }

            //device update
            if (repairDB.Device != null && repair.Device != null)
            {
                if (repairDB.Device.Id != repair.Device.Id && repair.Device.Id != Guid.Empty)
                {
                    repairDB.Device.Id = repair.Device.Id;
                    repairDB.Device = await UpdateDevice(repair.Device);
                }
                else
                    repairDB.Device = await UpdateDevice(repair.Device);
            }

            repairDB.User = repair.User;
            repairDB.Complaint = repair.Complaint;
            repairDB.Comment = repair.Comment;
            repairDB.Discount = repair.Discount;
            repairDB.TotalPrice = repair.TotalPrice;
            repairDB.Status = repair.Status;
            await context.SaveChangesAsync();
            return repairDB;
        }

        public async Task<Service> UpdateService(Service service)
        {
            var serviceDB = await GetServiceById(service.Id);
            if (serviceDB == null)
                serviceDB = await GetServiceByModel(service);
            if (serviceDB == null)
                return null;

            serviceDB.Name = service.Name;
            serviceDB.Price = service.Price;
            await context.SaveChangesAsync();
            return serviceDB;
        }

        public async Task<Specialist> UpdateSpecialist(Specialist specialist)
        {
            var specialisttDB = await GetSpecialistById(specialist.Id);
            if (specialisttDB == null)
                specialisttDB = await GetSpecialistByModel(specialist);
            if (specialisttDB == null)
                return null;

            specialisttDB.FullName = specialist.FullName;
            specialisttDB.Comment = specialist.Comment;
            await context.SaveChangesAsync();
            return specialisttDB;
        }

        public async Task<StockItem> UpdateStockItem(StockItem stock)
        {
            var stockDB = await GetStockItemById(stock.Id);
            if (stockDB == null)
                stockDB = await GetStockItemByModel(stock);
            if (stockDB == null)
                return null;

            if (stock.Item == null)
                stockDB.Item = null;
            if (stock.Item != null)
            {
                if (stockDB.Item == null)
                    stockDB.Item = new Item() { Id = Guid.NewGuid() };
                stockDB.Item.Title = stock.Item.Title;
                stockDB.Item.Type = stock.Item.Type;
                if (stock.Item.Device != null)
                {
                    if (stockDB.Item.Device == null)
                        stockDB.Item.Device = new Device();

                    stockDB.Item.Device.Type = stock.Item.Device.Type;
                    stockDB.Item.Device.Brand = stock.Item.Device.Brand;
                    stockDB.Item.Device.Model = stock.Item.Device.Model;
                }
            }

            stockDB.Price = stock.Price;
            stockDB.Quantity = stock.Quantity;
            await context.SaveChangesAsync();
            return stockDB;
        }
    }
}