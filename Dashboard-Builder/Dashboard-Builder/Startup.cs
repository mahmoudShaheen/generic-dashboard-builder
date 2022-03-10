using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using static Microsoft.AspNetCore.Mvc.CompatibilityVersion;
using System;
using System.Linq;
using DashboardBuilder.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.PlatformAbstractions;
using System.Reflection;
using System.IO;
using Swashbuckle.AspNetCore.Swagger;

namespace DashboardBuilder
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(Latest);
            services.AddSwaggerGen(op=>op.SwaggerDoc("v1", new Info { Title = "Dashboard Builder API", Version = "v1.0" }));

#if DEBUG
            services.AddDbContext<DBContext>(options =>
                    options.UseInMemoryDatabase());
#else
            services.AddDbContext<DBContext>(options =>
                    options.UseLazyLoadingProxies().UseSqlServer(
                        Configuration.GetConnectionString("DBContext")));
#endif
        }

        public void Configure(IApplicationBuilder app, DBContext context)
        {
            app.UseStaticFiles();

            var origins = Configuration.GetValue(typeof(string), "CORS").ToString()
                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                                .ToArray();
            app.UseCors(builder => builder
                .WithOrigins(origins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed(_ => true)
                .AllowCredentials()
            );

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSwagger();
            app.UseSwaggerUI(c=>c.SwaggerEndpoint("/swagger/DashboardBuilder/swagger.json", "Dashboard Builder"));
            SeedData(context);
        }

        public void SeedData(DBContext context)
        {
            if (context.Dashboards.Any())
            {
                // Already has data
                return;
            }
            context.Dashboards.Add(new Models.Dashboard
            {
                Name = "Main Dashboard",
                Canvas = "[{\"Title\":\"Line Chart\",\"Rows\":10,\"Cols\":17,\"X\":0,\"Y\":0,\"Link\":\"http://localhost:8080/api/Charts/timeseries\",\"Type\":\"line\"},{\"Title\":\"Bar Chart\",\"Rows\":10,\"Cols\":17,\"X\":17,\"Y\":0,\"Link\":\"http://localhost:8080/api/Charts/timeseries\",\"Type\":\"bar\"},{\"Title\":\"Pie Chart\",\"Rows\":10,\"Cols\":17,\"X\":0,\"Y\":10,\"Link\":\"http://localhost:8080/api/Charts/data\",\"Type\":\"pie\"},{\"Title\":\"Radar Chart\",\"Rows\":10,\"Cols\":17,\"X\":17,\"Y\":10,\"Link\":\"http://localhost:8080/api/Charts/data\",\"Type\":\"radar\"},{\"Title\":\"Doughnut Chart\",\"Rows\":10,\"Cols\":17,\"X\":0,\"Y\":20,\"Link\":\"http://localhost:8080/api/Charts/data\",\"Type\":\"doughnut\"},{\"Title\":\"Polar Chart\",\"Rows\":10,\"Cols\":17,\"X\":17,\"Y\":20,\"Link\":\"http://localhost:8080/api/Charts/data\",\"Type\":\"polarArea\"}]",
            });
            context.SaveChanges();

        }

    }
}
