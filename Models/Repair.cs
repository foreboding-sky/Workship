namespace Workshop.Models
{
    public enum RepairStatus
    {
        Accepted, //starting status
        AwaitingParts,
        InWork,
        ApprovalPending,
        Approved,
        Completed, //ending status
        Declined //ending status
    }
    public class Repair
    {
        public Guid Id { get; set; }
        public string? User { get; set; } //user who created the repair entry
        public string? Specialist { get; set; } //whoever is doing the repair
        public Client? Client { get; set; }
        public Device? Device { get; set; }
        public string? Complaint { get; set; }
        public List<RepairItem>? Products { get; set; } //Many to Many relationship
        public List<Order>? OrderedProducts { get; set; }
        //public List<RepairService>? RepairServices { get; set; }
        public string? Comment { get; set; }
        public double? Discount { get; set; }
        public double? TotalPrice { get; set; }
        public RepairStatus Status { get; set; }
    }
}