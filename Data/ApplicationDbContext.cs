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
        public DbSet<Service> Services { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<StockItem> Stock { get; set; }
        public DbSet<RepairItem> RepairItems { get; set; }
        public DbSet<RepairService> RepairServices { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Specialist> Specialists { get; set; }
        public DbSet<Device> Devices { get; set; }

        private void EnsurePopulated()
        {
            if (!Clients.Any())
            {
                Clients.AddRange(
                    new Client { FullName = "John Doe", Phone = "380991234567" },
                    new Client { FullName = "Andrew Duh", Phone = "380996667890" },
                    new Client { FullName = "Valeria Chan", Phone = "380993434345" },
                    new Client { FullName = "Barak Obama", Phone = "380998769034" },
                    new Client { FullName = "Vitaliy Kim", Phone = "380998976403" },
                    new Client { FullName = "Kaneko Ken", Phone = "380992281337" }
                );
                SaveChanges();
            }

            if (!Specialists.Any())
            {
                Specialists.AddRange(
                    new Specialist { FullName = "Vanya", Comment = "Comment" },
                    new Specialist { FullName = "Andrew" }
                );
                SaveChanges();
            }

            if (!Devices.Any())
            {
                Devices.AddRange(
                    new Device { Brand = "Apple", Model = "Iphone X", Type = DeviceType.Phone },
                    new Device { Brand = "Xiaomi", Model = "Redmi 9", Type = DeviceType.Phone },
                    new Device { Brand = "Huawei", Model = "P Smart Plus", Type = DeviceType.Phone },
                    new Device { Brand = "Samsung", Model = "S23", Type = DeviceType.Phone }
                );
                SaveChanges();
            }

            if (!Services.Any())
            {
                Services.AddRange(
                    new Service { Name = "Screen Replacement", Price = 600 },
                    new Service { Name = "Battery Replacement", Price = 400 },
                    new Service { Name = "Charge Board Replacement", Price = 400 },
                    new Service { Name = "Back Cover Replacement", Price = 300 },
                    new Service { Name = "Motherboard repair", Price = 1000 }
                );
                SaveChanges();
            }

            if (!Stock.Any())
            {
                Stock.AddRange(
                    new StockItem { Item = new Item { Type = ItemType.LCD, Title = "Pixel 8 LCD", Device = new Device { Brand = "Pixel", Model = "8", Type = DeviceType.Phone } }, Price = 8500, Quantity = 2 },
                    new StockItem { Item = new Item { Type = ItemType.Battery, Title = "Samsung A515 Battery", Device = new Device { Brand = "Samsung", Model = "A515", Type = DeviceType.Phone } }, Price = 400, Quantity = 12 },
                    new StockItem { Item = new Item { Type = ItemType.BackCover, Title = "Xiaomi Redmi Note 8 Back Cover", Device = new Device { Brand = "Xiaomi", Model = "Redmi Note ", Type = DeviceType.Phone } }, Price = 250, Quantity = 3 }
                );
                SaveChanges();
            }
        }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            // mb.Entity<Order>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            // mb.Entity<Item>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            // mb.Entity<Repair>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            // mb.Entity<RepairItem>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            // mb.Entity<Device>().Property(user => user.Id).HasDefaultValueSql("NEWID()");
            // mb.Entity<Client>().Property(user => user.Id).HasDefaultValueSql("NEWID()");

            mb.Entity<Client>().HasMany(o => o.Repairs).WithOne(o => o.Client).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Specialist>().HasMany(o => o.Repairs).WithOne(o => o.Specialist).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Device>().HasMany(o => o.Repairs).WithOne(o => o.Device).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Device>().HasMany(o => o.Parts).WithOne(o => o.Device).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Repair>().HasMany(o => o.OrderedProducts).WithOne(o => o.Repair).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Item>().HasMany(o => o.RepairOrders).WithOne(o => o.Product).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Repair>().HasMany(o => o.Products).WithOne(o => o.Repair).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Repair>().HasMany(o => o.RepairServices).WithOne(o => o.Repair).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<Service>().HasMany(o => o.Repairs).WithOne(o => o.Service).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<StockItem>().HasMany(o => o.Repairs).WithOne(o => o.Item).OnDelete(DeleteBehavior.SetNull);
            mb.Entity<StockItem>().HasOne(o => o.Item).WithOne(o => o.Stock).HasForeignKey<StockItem>(o => o.ItemId).OnDelete(DeleteBehavior.SetNull);

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