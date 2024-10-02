using CoreNet.Data;
using CoreNet.Repositories;
using CoreNet.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv; // Adicione esta linha

var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis do arquivo .env
Env.Load(); // Adicione esta linha

builder.Services.AddControllers();

// Usar a string de conexão do .env, com um fallback
var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                       builder.Configuration.GetConnectionString("DefaultConnection");

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
