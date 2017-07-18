using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using System;
using benjanderson.web.Services;
using benjanderson.web.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace benjanderson.web
{
     public class Startup
     {
          public Startup(IHostingEnvironment env)
          {
               var builder = new ConfigurationBuilder()
                   .SetBasePath(env.ContentRootPath)
                   .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                   .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                   .AddEnvironmentVariables();

               Configuration = builder.Build();
          }

          public IConfigurationRoot Configuration { get; }

          // This method gets called by the runtime. Use this method to add services to the container.
          public void ConfigureServices(IServiceCollection services)
          {
               services.AddMvc();
               services.AddScoped(typeof(MongoDBRepository<>));
               services.AddSingleton<SpaResponse>();
               services.AddSingleton<IConnectionStringFactory>((provider) =>
               {
                    return new LocalConnectionStringFactory
                    {
                         ConnectionString = this.Configuration.GetConnectionString("DefaultConnection"),
                         Database = this.Configuration.GetSection("MongoDatabaseName").Value
                    };
               });
          }

          // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
          public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
          {
               loggerFactory.AddConsole(Configuration.GetSection("Logging"));
               loggerFactory.AddDebug();

               if (env.IsDevelopment())
               {
                    app.UseDeveloperExceptionPage();
                    app.UseDatabaseErrorPage();
                    app.UseBrowserLink();
               }
               else
               {
                    app.UseExceptionHandler("/Home/Error");
               }

               this.ConfigureSinglePageApplication(app);
          }

          public void ConfigureSinglePageApplication(IApplicationBuilder app)
          {
               app.UseMvc(routes =>
               {
                    routes.MapRoute("default", "{controller}/{action=Index}");
               });

               app.UseMiddleware<NotFoundMiddleware>();

               // Serve wwwroot as root
               app.UseFileServer();
          }

          private class LocalConnectionStringFactory : IConnectionStringFactory
          {
               public string ConnectionString { get; set; }

               public string Database { get; set; }
          }
     }
}
