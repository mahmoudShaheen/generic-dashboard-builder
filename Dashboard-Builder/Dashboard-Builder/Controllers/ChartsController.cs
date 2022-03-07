using System;
using System.Collections.Generic;
using DashboardBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace DashboardBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class ChartsController : ControllerBase
    {
        [HttpGet("data")]
        public ChartDTO GetChartData()
        {
            var rnd = new Random();
            var data = new ChartDTO { 
                Labels = new string[] { "First", "Second", "Third", "Forth" },
                Values = new Dictionary<String, int[]>
                {
                    {"Series-A", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } },
                    {"Series-B", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } },
                    {"Series-C", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } }
                }
            };
            return data;
        }

        [HttpGet("timeseries")]
        public ChartDTO GetTimeSeriesData()
        {
            var rnd = new Random();
            var data = new ChartDTO{ 
                Labels = new string[] { "January", "February", "March", "April", "May", "June" }, 
                Values = new Dictionary<String, int[]>
                {
                    {"Series-A", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } },
                    {"Series-B", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } },
                    {"Series-C", new int[] { rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100), rnd.Next(100) } }
                }
            };
            return data;
        }
    }
}
