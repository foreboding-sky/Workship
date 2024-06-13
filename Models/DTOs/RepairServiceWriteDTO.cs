namespace Workshop.Models
{
    public class RepairServiceWriteDTO
    {
        public Guid Id { get; set; }
        public ServiceWriteDTO? Service { get; set; }
    }
}