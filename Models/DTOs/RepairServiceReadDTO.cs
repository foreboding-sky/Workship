namespace Workshop.Models
{
    public class RepairServiceReadDTO
    {
        public Guid Id { get; set; }
        public ServiceReadDTO? Service { get; set; }
    }
}