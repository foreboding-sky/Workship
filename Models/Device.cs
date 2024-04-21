namespace Workshop.Models
{

    public enum DeviceType
    {
        Phone,
        Tablet
    }
    public class Device
    {
        public Guid Id { get; set; }
        public DeviceType? Type { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public List<Repair>? Repairs { get; set; }
        public List<Item>? Parts { get; set; }
    }
}