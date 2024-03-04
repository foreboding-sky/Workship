namespace Workshop.Models
{
    public class StockItemReadDTO
    {
        public Guid Id { get; set; }
        public ItemReadDTO? Item { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
    }
}