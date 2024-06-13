namespace Workshop.Models
{
    public class RepairItemReadDTO
    {
        public Guid Id { get; set; }
        public StockItemReadDTO? Item { get; set; }
    }
}