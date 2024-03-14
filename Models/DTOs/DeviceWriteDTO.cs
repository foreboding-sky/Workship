namespace Workshop.Models
{
    public class DeviceWriteDTO
    {
        public Guid Id { get; set; }
        public string? Type { get; set; }
        public string? Brand { get; set; }
        public string? Model { get; set; }
    }
}