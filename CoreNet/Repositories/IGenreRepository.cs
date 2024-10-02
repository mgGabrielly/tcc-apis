using CoreNet.Models;

public interface IGenreRepository
{
    Task<IEnumerable<Genre>> GetAllGenres();
    Task<Genre?> GetGenreById(int id);
    Task CreateGenre(Genre genre);
    Task UpdateGenre(Genre genre);
    Task DeleteGenre(int id);
}
