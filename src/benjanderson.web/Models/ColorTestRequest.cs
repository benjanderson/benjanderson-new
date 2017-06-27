using Newtonsoft.Json;

namespace benjanderson.web.Models
{
     public class ColorTestRequest
     {
          public int Clicks { get; set; }

          [JsonProperty("age")]
          public int Age { get; set; }

          [JsonProperty("score")]
          public double Score { get; set; }

          [JsonProperty("gender")]
          public string Gender { get; set; }
     }
}
