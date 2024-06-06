namespace Workshop.Models
{
    public class Specialist
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Comment { get; set; }
        public List<Repair>? Repairs { get; set; }
    }
}