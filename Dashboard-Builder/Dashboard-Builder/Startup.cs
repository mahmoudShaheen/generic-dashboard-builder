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

            services.AddDbContext<DBContext>(options =>
                    options.UseLazyLoadingProxies().UseSqlServer(
                        Configuration.GetConnectionString("DBContext")));
        }

        public void Configure(IApplicationBuilder app)
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
        }

    }
}
