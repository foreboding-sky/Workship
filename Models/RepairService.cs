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
            if (x.Id != Guid.Empty && y.Id != Guid.Empty)
            {
                return x.Id == y.Id;
            }

            return x.Service?.Id == y.Service?.Id;
        }

        public int GetHashCode([DisallowNull] RepairService obj)
        {
            return obj.Id.GetHashCode();
        }
    }
}