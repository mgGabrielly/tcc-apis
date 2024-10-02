using Microsoft.EntityFrameworkCore;
using CoreNet.Data;
using CoreNet.Models;

namespace CoreNet.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllBooks() =>
        await _context.Books.ToListAsync();

        public async Task<Book> GetBookById(int id)
        {
            var book = await _context.Books.FindAsync(id);
            
            return book ?? throw new KeyNotFoundException("Livro não encontrado.");
        }

        public async Task CreateBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBook(Book book)
        {
            var existingBook = await _context.Books.FindAsync(book.Id);
            if (existingBook == null)
            {
                throw new Exception("Livro não encontrado.");
            }

            _context.Entry(existingBook).CurrentValues.SetValues(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
        }
    }
}
