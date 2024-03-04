namespace Workshop.Models
{
    public class StockItemWriteDTO
    {
        public ItemWriteDTO? Item { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
    }
}