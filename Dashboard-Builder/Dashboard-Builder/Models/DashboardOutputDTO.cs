using Newtonsoft.Json;
using System.Collections.Generic;

namespace DashboardBuilder.Models
{
    public class DashboardOutputDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<ChartWidgetDTO> Canvas { get; set; }

        public DashboardOutputDTO(Dashboard dashboard)
        {
            this.Id = dashboard.Id;
            this.Name = dashboard.Name;
            this.Canvas = JsonConvert.DeserializeObject<List<ChartWidgetDTO>>(dashboard.Canvas);
        }

        public override string ToString()
        {
            var modelString = JsonConvert.SerializeObject(this);
            return modelString;
        }
    }
}
