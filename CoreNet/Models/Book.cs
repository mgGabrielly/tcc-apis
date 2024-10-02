namespace CoreNet.Models
{
    public class Book
    {
        public int Id { get; set; }
        public required string Name { get; set; }  
        public required string Author { get; set; }  
        public int Pages { get; set; }
        public int Year { get; set; }
        public int GenreId { get; set; }
        public Genre? Genre { get; set; }
    }
}

