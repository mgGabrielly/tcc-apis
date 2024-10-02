package services

import (
	"go-books-api/internal/models"
	"go-books-api/internal/repositories"
)

type BookService struct {
	Repo *repositories.BookRepository
}

func (s *BookService) CreateBook(book models.Book) error {
	return s.Repo.Create(book)
}

func (s *BookService) GetBooks() ([]models.Book, error) {
	return s.Repo.FindAll()
}

func (s *BookService) GetBookByID(id uint) (models.Book, error) {
	return s.Repo.FindByID(id)
}

func (s *BookService) UpdateBook(book models.Book) error {
	return s.Repo.Update(book)
}

func (s *BookService) DeleteBook(id uint) error {
	return s.Repo.Delete(id)
}
