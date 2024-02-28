namespace Workshop.Models
{
    public class ItemReadDTO
    {
        public Guid Id { get; set; }
        public ItemType? Type { get; set; }
        public DeviceReadDTO? Device { get; set; }
        public string? Title { get; set; }
    }
}