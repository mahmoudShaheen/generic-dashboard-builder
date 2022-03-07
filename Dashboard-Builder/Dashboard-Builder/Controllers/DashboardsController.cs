using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DashboardBuilder.DataContext;
using DashboardBuilder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DashboardBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class DashboardsController : ControllerBase
    {
        private readonly DBContext _context;
        public DashboardsController(DBContext context)
        {
            _context = context;
        }

        // GET: api/xx
        [HttpGet]
        public IEnumerable<DashboardOutputDTO> Get()
        {
            return _context.Dashboards.Select(d=> new DashboardOutputDTO(d));
        }

        // GET: api/xx/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var e = _context.Dashboards.Find(id);
            if (e == null)
                return NotFound();
            return Ok(new DashboardOutputDTO(e));
        }

        // POST: api/xx
        [HttpPost]
        public DashboardOutputDTO Post([FromBody] DashboardInputDTO value)
        {
            var e = _context.Dashboards.Add(value.ToEntity());
            _context.SaveChanges();
            return new DashboardOutputDTO(e.Entity);
        }

        // PUT: api/xx/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] DashboardInputDTO value)
        {
            _context.Dashboards.Update(value.ToEntity(id));
            _context.SaveChanges();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _context.Dashboards.Remove(new Dashboard{Id = id});
            _context.SaveChanges();
        }
    }
}
