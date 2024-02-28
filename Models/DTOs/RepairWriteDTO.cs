namespace Workshop.Models
{
    public class RepairWriteDTO
    {
        public string? User { get; set; } //user who created the repair entry
        public string? Specialist { get; set; } //whoever is doing the repair
        public ClientWriteDTO? Client { get; set; }
        public DeviceWriteDTO? Device { get; set; }
        public string? Complaint { get; set; }
        public List<StockItemWriteDTO>? Products { get; set; } //Many to Many relationship
        public List<OrderWriteDTO>? OrderedProducts { get; set; }
        public string? Comment { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public RepairStatus Status { get; set; }
    }
}