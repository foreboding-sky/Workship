using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            context.Repairs.Add(repair);
            await context.SaveChangesAsync();
            return repair;
        }

        public async Task<StockItem> CreateStockItem(StockItem stock)
        {
            context.Stock.Add(stock);
            await context.SaveChangesAsync();
            return stock;
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

        public async Task DeleteStockItem(Guid id)
        {
            var stock = context.Stock.Find(id);
            if (stock is null) return;
            context.Stock.Remove(stock);
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

        public async Task<List<Item>> GetAllItems()
        {
            return await context.Items.ToListAsync();
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await context.Orders.ToListAsync();
        }

        public async Task<List<Repair>> GetAllRepairs()
        {
            return await context.Repairs.ToListAsync();
        }

        public async Task<List<StockItem>> GetAllStockItems()
        {
            return await context.Stock.ToListAsync();
        }

        public async Task<Client> GetClientById(Guid id)
        {
            return await context.Clients.FindAsync(id);
        }

        public async Task<Device> GetDeviceById(Guid id)
        {
            return await context.Devices.FindAsync(id);
        }

        public async Task<Item> GetItemById(Guid id)
        {
            return await context.Items.FindAsync(id);
        }

        public async Task<Order> GetOrderById(Guid id)
        {
            return await context.Orders.FindAsync(id);
        }

        public async Task<Repair> GetRepairById(Guid id)
        {
            return await context.Repairs.FindAsync(id);
        }

        public async Task<StockItem> GetStockItemById(Guid id)
        {
            return await context.Stock.FindAsync(id);
        }

        public async Task<StockItem> GetStockItemByItemId(Guid id)
        {
            return await context.Stock.FirstOrDefaultAsync(stock => stock.ItemId == id);
        }

        public async Task<Client> UpdateClient(Client client)
        {
            var tmp = context.Clients.Find(client.Id);
            tmp = client;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<Device> UpdateDevice(Device device)
        {
            var tmp = context.Devices.Find(device.Id);
            tmp = device;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<Item> UpdateItem(Item item)
        {
            var tmp = context.Items.Find(item.Id);
            tmp = item;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            var tmp = context.Orders.Find(order.Id);
            tmp = order;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<Repair> UpdateRepair(Repair repair)
        {
            var tmp = context.Repairs.Find(repair.Id);
            tmp = repair;
            await context.SaveChangesAsync();
            return tmp;
        }

        public async Task<StockItem> UpdateStockItem(StockItem stock)
        {
            var tmp = context.Stock.Find(stock.Id);
            tmp = stock;
            await context.SaveChangesAsync();
            return tmp;
        }
    }
}