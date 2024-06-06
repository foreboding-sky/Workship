using System.Text.Json.Serialization;

namespace Workshop.Models
{
    public class RepairWriteDTO
    {
        [JsonPropertyName("id")]
        public Guid? Id { get; set; }
        [JsonPropertyName("user")]
        public string? User { get; set; } //user who created the repair entry
        [JsonPropertyName("specialist")]
        public SpecialistWriteDTO? Specialist { get; set; } //whoever is doing the repair
        [JsonPropertyName("client")]
        public ClientWriteDTO? Client { get; set; }
        [JsonPropertyName("device")]
        public DeviceWriteDTO? Device { get; set; }
        [JsonPropertyName("complaint")]
        public string? Complaint { get; set; }
        [JsonPropertyName("products")]
        public List<StockItemWriteDTO>? Products { get; set; } //Many to Many relationship
        [JsonPropertyName("orderedProducts")]
        public List<OrderWriteDTO>? OrderedProducts { get; set; }
        [JsonPropertyName("repairServices")]
        public List<ServiceWriteDTO>? RepairServices { get; set; }//Many to Many relationship
        [JsonPropertyName("comment")]
        public string? Comment { get; set; }
        [JsonPropertyName("discount")]
        public double? Discount { get; set; }
        [JsonPropertyName("totalPrice")]
        public double? TotalPrice { get; set; }
        [JsonPropertyName("status")]
        public RepairStatus Status { get; set; }
    }
}