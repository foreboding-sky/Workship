namespace Workshop.Models
{
    public class Service
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public double? Price { get; set; }
        public List<RepairService>? Repairs { get; set; }
    }
}