namespace Workshop.Models
{
    public class StockItemWriteDTO
    {
        public Guid Id { get; set; }
        public ItemWriteDTO? Item { get; set; }
        public Guid ItemId { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
    }
}