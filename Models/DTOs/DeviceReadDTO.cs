namespace Workshop.Models
{
    public class DeviceReadDTO
    {
        public Guid Id { get; set; }
        public string? Type { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
    }
}