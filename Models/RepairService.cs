using System.Diagnostics.CodeAnalysis;

namespace Workshop.Models
{
    public class RepairService //Many to Many relationship class
    {
        public Guid Id { get; set; }
        public Repair? Repair { get; set; }
        public Service? Service { get; set; }
    }
    public class RepairServiceComparer : IEqualityComparer<RepairService>
    {

        public bool Equals(RepairService? x, RepairService? y)
        {
            // Compare based on RepairService.Service.Id if both services are not null
            if (x?.Service == null || y?.Service == null)
            {
                return false;
            }
            return x.Service.Id == y.Service.Id;
        }

        public int GetHashCode([DisallowNull] RepairService obj)
        {
            // Use RepairService.Service.Id if Service is not null
            return obj.Service?.Id.GetHashCode() ?? 0;
        }
    }
}