using CoreNet.Models;
using CoreNet.Repositories;

namespace CoreNet.Services
{
    public class BookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public Task<IEnumerable<Book>> GetAllBooks() => _bookRepository.GetAllBooks();

        public Task<Book> GetBookById(int id) => _bookRepository.GetBookById(id);

        public Task CreateBook(Book book) => _bookRepository.CreateBook(book);

        public async Task UpdateBook(Book book)
        {
            var existingBook = await _bookRepository.GetBookById(book.Id);
            if (existingBook == null)
            {
                throw new Exception("Book not found");
            }

            await _bookRepository.UpdateBook(book);
        }

        public Task DeleteBook(int id) => _bookRepository.DeleteBook(id);
    }
}
