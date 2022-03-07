using Newtonsoft.Json;
using System.Collections.Generic;

namespace DashboardBuilder.Models
{
    public class DashboardInputDTO
    {
        [JsonRequired]
        public string Name { get; set; }

        public List<ChartWidgetDTO> Canvas { get; set; }

        public Dashboard ToEntity()
        {
            return new Dashboard { Name = this.Name, Canvas = JsonConvert.SerializeObject(this.Canvas) };
        }

        public Dashboard ToEntity(int id)
        {
            return new Dashboard { Id=id, Name = this.Name, Canvas = JsonConvert.SerializeObject(this.Canvas) };
        }

        public override string ToString()
        {
            var modelString = JsonConvert.SerializeObject(this);
            return modelString;
        }
    }
}
