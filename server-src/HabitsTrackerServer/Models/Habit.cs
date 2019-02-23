using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace HabitsTrackerServer.Models
{
    public class Habit
    {
        // { id: 0, name: "russian", instanceTime: "00:00", totalTime: "02:00" },
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [Required(ErrorMessage = "name is required")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "instanceTime")]
        public string InstanceTime { get; set; } = "00:00";
        [Required(ErrorMessage = "totalTime is required")]
        [JsonProperty(PropertyName = "totalTime")]
        public string TotalTime { get; set; }
    }
}
