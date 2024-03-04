using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workshop.Models;

namespace Workshop.Data
{
    public interface IWorkshopRepository
    {
        //client
        public Task<Client> CreateClient(Client client);
        public Task DeleteClient(Guid id);
        public Task<List<Client>> GetAllClients();
        public Task<Client> GetClientById(Guid id);
        public Task<Client> UpdateClient(Client client);
        //repair
        public Task<Repair> CreateRepair(Repair repair);
        public Task DeleteRepair(Guid id);
        public Task<List<Repair>> GetAllRepairs();
        public Task<Repair> GetRepairById(Guid id);
        public Task<Repair> UpdateRepair(Repair repair);
        //order
        public Task<Order> CreateOrder(Order order);
        public Task DeleteOrder(Guid id);
        public Task<List<Order>> GetAllOrders();
        public Task<Order> GetOrderById(Guid id);
        public Task<Order> UpdateOrder(Order order);
        //item
        public Task<Item> CreateItem(Item item);
        public Task DeleteItem(Guid id);
        public Task<List<Item>> GetAllItems();
        public Task<Item> GetItemById(Guid id);
        //stock item
        public Task<StockItem> CreateStockItem(StockItem stock);
        public Task DeleteStockItem(Guid id);
        public Task<List<StockItem>> GetAllStockItems();
        public Task<StockItem> GetStockItemById(Guid id);
        public Task<StockItem> GetStockItemByItemId(Guid id);
        public Task<StockItem> UpdateStockItem(StockItem stock);
        //device
        public Task<Device> CreateDevice(Device device);
        public Task DeleteDevice(Guid id);
        public Task<List<Device>> GetAllDevices();
        public Task<Device> GetDeviceById(Guid id);
    }
}