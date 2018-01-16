using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using benjanderson.web.Services;

namespace benjanderson.web
{
     using Controllers;
     using Dropbox.Api;

     public class Startup
     {
          public Startup(IHostingEnvironment env)
          {
               var builder = new ConfigurationBuilder()
                   .SetBasePath(env.ContentRootPath)
                   .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                   .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                   .AddEnvironmentVariables();

               this.Configuration = builder.Build();
          }

          public IConfigurationRoot Configuration { get; }

          // This method gets called by the runtime. Use this method to add services to the container.
          public void ConfigureServices(IServiceCollection services)
          {
               services.AddMvc();
               services.AddSingleton<SpaResponse>();
               services.AddTransient<IConnectionStringFactory>((provider) => new LocalConnectionStringFactory
               {
                    ConnectionString = this.Configuration.GetConnectionString("DefaultConnection"),
                    Database = this.Configuration.GetSection("MongoDatabaseName").Value
               });

               services.AddTransient<DropboxClient>((provider) =>
                    new DropboxClient(this.Configuration["dropbox:accessToken"],
                         new DropboxClientConfig("BirthdayBot")));
          }

          // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
          public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
          {
               loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));
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
               app.UseStaticFiles();
               app.UseMvc(routes =>
               {
                    routes.MapRoute(
                         name: "default",
                         template: "{controller=Home}/{action=Index}/{id?}");

                    routes.MapSpaFallbackRoute(
                         name: "spa-fallback",
                         defaults: new { controller = "Home", action = "Index" });
               });
          }

          private class LocalConnectionStringFactory : IConnectionStringFactory
          {
               public string ConnectionString { get; set; }

               public string Database { get; set; }
          }
     }
}
