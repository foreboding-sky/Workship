using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workshop.Models;

namespace Workshop.Data
{
    public interface IOrdersRepository
    {
        public Task<Order> CreateOrder(Order order);
        public Task DeleteOrder(Guid id);
        public Task<List<Order>> GetAllOrders();
        public Task<Order> GetOrderById(Guid id);
        public Task<Order> ChangeOrderStatus(Guid id);
        public Task<Order> UpdateOrder(Order order);
    }
}