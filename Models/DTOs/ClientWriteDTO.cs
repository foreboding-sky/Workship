namespace Workshop.Models
{
    public class ClientWriteDTO
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Comment { get; set; }
    }
}