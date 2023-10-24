namespace Workshop.Models
{
    public class Order
    {
        public Guid? Id { get; set; }
        public string? User { get; set; }
        public string? Market { get; set; }
        public string? Client { get; set; }
        public string? Device { get; set; }
        public string? Product { get; set; }
        public string? Comment { get; set; }
        public DateTime? Date { get; set; }
        public bool? Status { get; set; }
    }
}