namespace Workshop.Models
{
    public class Client
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Comment { get; set; }
        public List<Repair>? Repairs { get; set; }
    }
}