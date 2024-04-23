namespace Workshop.Models
{
    public class ItemWriteDTO
    {
        public Guid Id { get; set; }
        public string? Type { get; set; }
        public DeviceWriteDTO? Device { get; set; }
        public string? Title { get; set; }
    }
}