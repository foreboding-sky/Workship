using System.Text.Json.Serialization;
namespace Workshop.Models
{
    public class OrderWriteDTO
    {
        public Guid Id { get; set; }
        public string? Source { get; set; }
        public ItemWriteDTO? Product { get; set; }
        public string? Comment { get; set; }
        public DateTime? DateOrdered { get; set; } //should be Datetime.Now on creation
        public DateTime? DateEstimated { get; set; }
        public DateTime? DateRecieved { get; set; } //should be Datetime.Now on processed
        public bool? IsProcessed { get; set; }
    }
}