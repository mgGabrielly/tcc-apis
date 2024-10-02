using CoreNet.Data;
using CoreNet.Models;
using CoreNet.Repositories;
using Microsoft.EntityFrameworkCore;

public class GenreRepository : IGenreRepository
{
    private readonly ApplicationDbContext _context;

    public GenreRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Genre>> GetAllGenres() =>
        await _context.Genres.ToListAsync();

    public async Task<Genre?> GetGenreById(int id) =>
        await _context.Genres.FindAsync(id);

    public async Task CreateGenre(Genre genre)
    {
        _context.Genres.Add(genre);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateGenre(Genre genre)
    {
        var existingGenre = await _context.Genres.FindAsync(genre.Id);
        if (existingGenre == null)
        {
            throw new Exception("Gênero não encontrado.");
        }

        _context.Entry(existingGenre).CurrentValues.SetValues(genre);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteGenre(int id)
    {
        var genre = await _context.Genres.FindAsync(id);
        if (genre == null)
        {
            throw new Exception("Gênero não encontrado.");
        }

        _context.Genres.Remove(genre);
        await _context.SaveChangesAsync();
    }
}
