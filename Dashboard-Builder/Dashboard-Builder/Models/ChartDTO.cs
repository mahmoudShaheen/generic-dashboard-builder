using Newtonsoft.Json;
using System.Collections.Generic;

namespace DashboardBuilder.Models
{
    public class ChartDTO
    {
        public string[] Labels { get; set; }

        public Dictionary<string, int[]> Values { get; set; }
    }
}
