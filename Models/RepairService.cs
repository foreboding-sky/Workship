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
            return x?.Id == y?.Id;
        }

        public int GetHashCode([DisallowNull] RepairService obj)
        {
            return obj.Id.ToString().GetHashCode();
        }
    }
}