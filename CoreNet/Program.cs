using CoreNet.Data;
using CoreNet.Repositories;
using CoreNet.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv; 

var builder = WebApplication.CreateBuilder(args);

Env.Load(); 

builder.Services.AddControllers();

var host = Environment.GetEnvironmentVariable("POSTGRES_HOST"); 
var database = Environment.GetEnvironmentVariable("POSTGRES_DB"); 
var username = Environment.GetEnvironmentVariable("POSTGRES_USER"); 
var password = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD"); 

var connectionString = $"Host={host};Database={database};Username={username};Password={password}";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<BookService>();
builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<GenreService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
