namespace Workshop.Models
{
    public enum ItemType
    {
        ChargeBoard,
        LCD,
        Battery,
        Speaker,
        Buzzer,
        Camera,
        BackCover,
        Frame,
        CameraGlass,
        Microphone,
        Connector,
        FlatCable,
        FingerprintScanner,
        Microcircuit
    }
    public class Item
    {
        public Guid Id { get; set; }
        public ItemType? Type { get; set; }
        public Device? Device { get; set; }
        public string? Name { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
        public List<RepairItem>? Repairs { get; set; } //Many to Many relationship
        public List<Order>? RepairOrders { get; set; }
    }
}