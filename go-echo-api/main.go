package main

import (
	"go-books-api/internal/config"
	"go-books-api/internal/handlers"
	"go-books-api/internal/repositories"
	"go-books-api/internal/services"

	"github.com/labstack/echo/v4"
)

func main() {

	config.ConnectDB()

	e := echo.New()

	// Start Repositories
	bookRepo := &repositories.BookRepository{DB: config.DB}
	genreRepo := &repositories.GenreRepository{DB: config.DB}

	// Start Services
	bookService := &services.BookService{Repo: bookRepo}
	genreService := &services.GenreService{Repo: genreRepo}

	// Start Handlers
	bookHandler := &handlers.BookHandler{Service: bookService}
	genreHandler := &handlers.GenreHandler{Service: genreService}

	// Routes to Books
	e.POST("/books", bookHandler.CreateBook)
	e.GET("/books", bookHandler.GetBooks)
	e.GET("/books/:id", bookHandler.GetBookByID)
	e.PUT("/books/:id", bookHandler.UpdateBook)
	e.DELETE("/books/:id", bookHandler.DeleteBook)

	// Routes for Genres
	e.POST("/genres", genreHandler.CreateGenre)
	e.GET("/genres", genreHandler.GetGenres)
	e.GET("/genres/:id", genreHandler.GetGenreByID)
	e.PUT("/genres/:id", genreHandler.UpdateGenre)
	e.DELETE("/genres/:id", genreHandler.DeleteGenre)

	e.Start(":8080")
}
