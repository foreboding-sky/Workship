namespace Workshop.Models
{
    public class RepairItemWriteDTO
    {
        public Guid Id { get; set; }
        public StockItemWriteDTO? Item { get; set; }
    }
}