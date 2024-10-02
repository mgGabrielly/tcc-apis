package services

import (
	"go-books-api/internal/models"
	"go-books-api/internal/repositories"
)

type GenreService struct {
	Repo *repositories.GenreRepository
}

func (s *GenreService) CreateGenre(genre models.Genre) error {
	return s.Repo.Create(genre)
}

func (s *GenreService) GetGenres() ([]models.Genre, error) {
	return s.Repo.FindAll()
}

func (s *GenreService) GetGenreByID(id uint) (models.Genre, error) {
	return s.Repo.FindByID(id)
}

func (s *GenreService) UpdateGenre(genre models.Genre) error {
	return s.Repo.Update(genre)
}

func (s *GenreService) DeleteGenre(id uint) error {
	return s.Repo.Delete(id)
}
