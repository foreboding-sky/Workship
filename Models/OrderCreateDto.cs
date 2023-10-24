using System.Text.Json.Serialization;
namespace Workshop.Models
{
    public class OrderCreateDto
    {
        [JsonPropertyName("user")]
        public string? User { get; set; }
        [JsonPropertyName("market")]
        public string? Market { get; set; }
        [JsonPropertyName("client")]
        public string? Client { get; set; }
        [JsonPropertyName("device")]
        public string? Device { get; set; }
        [JsonPropertyName("product")]
        public string? Product { get; set; }

        [JsonPropertyName("commit")]
        public string? Comment { get; set; }
        [JsonPropertyName("date")]
        public DateTime? Date { get; set; }
        [JsonPropertyName("status")]
        public bool? Status { get; set; } = false;
    }
}