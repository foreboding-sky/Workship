using Microsoft.EntityFrameworkCore;
using Workshop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Workshop.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
            EnsurePopulated();
        }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Repair> Repairs { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<RepairItem> RepairItems { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Device> Devices { get; set; }

        private void EnsurePopulated()
        {

        }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            mb.Entity<Order>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            mb.Entity<Item>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            mb.Entity<Repair>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            mb.Entity<RepairItem>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            mb.Entity<Device>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            mb.Entity<Client>().Property(user => user.Id).HasDefaultValueSql("NEWID()");

            mb.Entity<Client>().HasMany(o => o.Repairs).WithOne(o => o.Client).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Device>().HasMany(o => o.Repairs).WithOne(o => o.Device).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Device>().HasMany(o => o.Parts).WithOne(o => o.Device).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Repair>().HasMany(o => o.OrderedProducts).WithOne(o => o.Repair).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Item>().HasMany(o => o.RepairOrders).WithOne(o => o.Product).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Repair>().HasMany(o => o.Products).WithOne(o => o.Repair).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Item>().HasMany(o => o.Repairs).WithOne(o => o.Item).OnDelete(DeleteBehavior.SetNull);

            //enum conversions
            mb.Entity<Item>()
                .Property(c => c.Type)
                .HasConversion<string>();
            mb.Entity<Repair>()
                .Property(c => c.Status)
                .HasConversion<string>();
        }
    }
}