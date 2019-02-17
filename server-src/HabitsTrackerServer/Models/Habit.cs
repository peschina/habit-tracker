using Newtonsoft.Json;

namespace HabitsTrackerServer.Models
{
    public class Habit
    {
        // { id: 0, name: "russian", instanceTime: "00:00", totalTime: "02:00" },
        [JsonProperty(PropertyName = "id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "instanceTime")]
        public string InstanceTime { get; set; }
        [JsonProperty(PropertyName = "totalTime")]
        public string TotalTime { get; set; }
    }
}
