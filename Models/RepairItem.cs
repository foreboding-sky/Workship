using System.Diagnostics.CodeAnalysis;
using System.Diagnostics.Metrics;

namespace Workshop.Models
{
    public class RepairItem //Many to Many relationship class
    {
        public Guid Id { get; set; }
        public Repair? Repair { get; set; }
        public StockItem? Item { get; set; }
    }
    public class RepairItemComparer : IEqualityComparer<RepairItem>
    {

        public bool Equals(RepairItem? x, RepairItem? y)
        {
            if (x.Id != Guid.Empty && y.Id != Guid.Empty)
            {
                return x.Id == y.Id;
            }

            return x.Item?.Id == y.Item?.Id;
        }

        public int GetHashCode([DisallowNull] RepairItem obj)
        {

            return obj.Id.GetHashCode();
        }
    }
}