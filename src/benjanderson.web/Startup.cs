using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using benjanderson.web.Data;
using System.IO;
using System;
using benjanderson.web.Services;

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
               // Add framework services.
               services.AddDbContext<ApplicationDbContext>(options =>
                   options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

               services.AddMvc();
               services.AddScoped(typeof(MongoDBRepository<>));
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

               app.Use(async (context, next) =>
               {
                    await next();

                    // If there's no available file and the request doesn't contain an extension, we're probably trying to access a page.
                    // Rewrite request to use app root
                    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                    {
                         context.Request.Path = "/index.html";
                         context.Response.StatusCode = 200; // Make sure we update the status code, otherwise it returns 404
                         await next();
                    }
               });

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
