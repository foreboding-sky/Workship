namespace Workshop.Models
{
    public class StockItem
    {
        public Guid Id { get; set; }
        public Item Item { get; set; }
        public Guid ItemId { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
        public List<RepairItem>? Repairs { get; set; } //Many to Many relationship
    }
}