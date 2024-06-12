using System.Text.Json.Serialization;
namespace Workshop.Models
{
    public class OrderReadDTO
    {
        public Guid Id { get; set; }
        public string? Source { get; set; }
        public ItemReadDTO? Product { get; set; }
        public string? Comment { get; set; }
        public double? Price { get; set; }
        public DateTime? DateOrdered { get; set; } //should be Datetime.Now on creation
        public DateTime? DateEstimated { get; set; }
        public DateTime? DateRecieved { get; set; } //should be Datetime.Now on processed
        public bool? IsProcessed { get; set; }
    }
}