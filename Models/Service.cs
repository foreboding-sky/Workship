namespace Workshop.Models
{
    public class Service
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Price { get; set; }
        public List<RepairService>? RepairServices { get; set; }
    }
}