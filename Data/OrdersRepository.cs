using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workshop.Models;

namespace Workshop.Data
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly ApplicationDbContext context;
        public OrdersRepository(ApplicationDbContext context)
        {
            this.context = context;
        }
        public async Task<Order> CreateOrder(Order order)
        {
            context.Orders.Add(order);
            await context.SaveChangesAsync();
            return order;
        }
        public async Task DeleteOrder(Guid id)
        {
            var order = context.Orders.Find(id);
            context.Orders.Remove(order);
            await context.SaveChangesAsync();
        }
        public async Task<List<Order>> GetAllOrders()
        {
            return await context.Orders.ToListAsync();
        }
        public async Task<Order> GetOrderById(Guid id)
        {
            return await context.Orders.FindAsync(id);
        }
        public async Task<Order> ChangeOrderStatus(Guid id)
        {
            var tmp = context.Orders.Find(id);
            tmp.Status = !tmp.Status;
            await context.SaveChangesAsync();
            return tmp;
        }
        public async Task<Order> ChangeOrderStatus(Guid id, bool status)
        {
            var tmp = context.Orders.Find(id);
            tmp.Status = status;
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
    }
}