namespace Workshop.Models
{
    public class RepairItem //Many to Many relationship class
    {
        public Guid Id { get; set; }
        public Repair? Repair { get; set; }
        public StockItem? Item { get; set; }
    }
}