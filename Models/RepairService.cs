namespace Workshop.Models
{
    public class RepairService //Many to Many relationship class
    {
        public Guid Id { get; set; }
        public Repair? Repair { get; set; }
        public Service? Service { get; set; }
    }
}