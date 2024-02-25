using System.Text.Json.Serialization;
namespace Workshop.Models
{
    public class OrderCreateDto
    {
        [JsonPropertyName("user")]
        public string? User { get; set; }
        [JsonPropertyName("source")]
        public string? Source { get; set; }
        [JsonPropertyName("client")]
        public Repair? Repair { get; set; }
        [JsonPropertyName("device")]
        public string? Device { get; set; }
        [JsonPropertyName("product")]
        public Item? Product { get; set; }
        [JsonPropertyName("commit")]
        public string? Comment { get; set; }
        [JsonPropertyName("date_ordered")]
        public DateTime? DateOrdered { get; set; }
        [JsonPropertyName("date_estimated")]
        public DateTime? DateEstimated { get; set; }
        [JsonPropertyName("date_recieved")]
        public DateTime? DateRecieved { get; set; }
        [JsonPropertyName("is_processed")]
        public bool? IsProcessed { get; set; } = false;
    }
}