using CoreNet.Models;
using CoreNet.Repositories;

namespace CoreNet.Services
{
    public class GenreService
    {
        private readonly IGenreRepository _genreRepository;

        public GenreService(IGenreRepository genreRepository)
        {
            _genreRepository = genreRepository;
        }

        public Task<IEnumerable<Genre>> GetAllGenres() => _genreRepository.GetAllGenres();

        public Task<Genre?> GetGenreById(int id) => _genreRepository.GetGenreById(id);

        public Task CreateGenre(Genre genre) => _genreRepository.CreateGenre(genre);

        public async Task UpdateGenre(Genre genre)
        {
            var existingGenre = await _genreRepository.GetGenreById(genre.Id);
            if (existingGenre == null)
            {
                throw new Exception("Gênero não encontrado.");
            }

            await _genreRepository.UpdateGenre(genre);
        }

        public Task DeleteGenre(int id) => _genreRepository.DeleteGenre(id);
    }
}
