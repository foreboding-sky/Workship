namespace Workshop.Models
{
    public class ItemWriteDTO
    {
        public ItemType? Type { get; set; }
        public DeviceWriteDTO? Device { get; set; }
        public string? Title { get; set; }
    }
}