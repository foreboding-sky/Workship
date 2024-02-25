using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Workshop.Data;
using Workshop.Models;
using AutoMapper;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMvc(options => options.EnableEndpointRouting = false);
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite("Data Source=Workshop.db"));
builder.Services.AddTransient<IWorkshopRepository, WorkshopRepository>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        var converter = new JsonStringEnumConverter(); //decode enum 'key strings' into enum values
        options.JsonSerializerOptions.Converters.Add(converter);
    });
builder.Services.AddSpaStaticFiles(configuration => configuration.RootPath = "frontend/build");
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    // app.UseSwagger();
    // app.UseSwaggerUI();
}

app.UseSpaStaticFiles();
app.UseRouting();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthentication();
//app.UseAuthorization();
// app.MapControllers();
app.UseEndpoints(endpoints => endpoints.MapControllers());

app.UseCors(builder =>
    builder
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true)
);

app.UseSpa(spa =>
          {
              spa.Options.SourcePath = "frontend";
              if (app.Environment.IsDevelopment())
              {
                  spa.UseReactDevelopmentServer(npmScript: "start");
              }
          });

app.Run();