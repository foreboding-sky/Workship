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
        public string? Title { get; set; }
        public List<Order>? RepairOrders { get; set; }
        public StockItem? Stock { get; set; }
    }
}