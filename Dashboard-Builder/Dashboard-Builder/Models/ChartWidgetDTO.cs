using Newtonsoft.Json;

namespace DashboardBuilder.Models
{
    public class ChartWidgetDTO
    {
        [JsonRequired]
        public string Title { get; set; }
        [JsonRequired]
        public int Rows { get; set; }
        [JsonRequired]
        public int Cols { get; set; }
        [JsonRequired]
        public int X { get; set; }
        [JsonRequired]
        public int Y { get; set; }
        [JsonRequired]
        public string Link { get; set; }
        [JsonRequired]
        public string Type { get; set; }

        public override string ToString()
        {
            var modelString = JsonConvert.SerializeObject(this);
            return modelString;
        }
    }
}
