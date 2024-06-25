using System.Diagnostics.CodeAnalysis;
namespace Workshop.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public string? Source { get; set; }
        public Repair? Repair { get; set; }
        public Item? Product { get; set; }
        public double? Price { get; set; }
        public string? Comment { get; set; }
        public DateTime? DateOrdered { get; set; } //should be Datetime.Now on creation
        public DateTime? DateEstimated { get; set; }
        public DateTime? DateRecieved { get; set; } //should be Datetime.Now on processed
        public bool? IsProcessed { get; set; }
    }
    public class OrderComparer : IEqualityComparer<Order>
    {

        public bool Equals(Order? x, Order? y)
        {
            if (x.Id != Guid.Empty && y.Id != Guid.Empty)
            {
                return x.Id == y.Id;
            }

            return x.Product?.Title == y.Product?.Title;
        }

        public int GetHashCode([DisallowNull] Order obj)
        {
            return obj.Id.ToString().GetHashCode();
        }
    }
}