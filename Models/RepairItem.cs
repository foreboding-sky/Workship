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
            // Compare based on RepairItems.Item.Id if both items are not null
            if (x?.Item == null || y?.Item == null)
            {
                return false;
            }
            return x.Item.Id == y.Item.Id;
        }

        public int GetHashCode([DisallowNull] RepairItem obj)
        {
            // Use RepairItems.Item.Id if Item is not null
            return obj.Item?.Id.GetHashCode() ?? 0;
        }
    }
}