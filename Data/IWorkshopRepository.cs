using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Workshop.Models;

namespace Workshop.Data
{
    public interface IWorkshopRepository
    {
        public Task<Order> CreateRepair(Order order);
        public Task DeleteRepair(Guid id);
        public Task<List<Order>> GetAllRepairs();
        public Task<Order> GetRepairById(Guid id);
        public Task<Order> UpdateRepair(Order order);
    }
}