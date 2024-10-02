package handlers

import (
	"go-books-api/internal/models"
	"go-books-api/internal/services"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type GenreHandler struct {
	Service *services.GenreService
}

func (h *GenreHandler) CreateGenre(c echo.Context) error {
	var genre models.Genre
	if err := c.Bind(&genre); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.Service.CreateGenre(genre); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, genre)
}

func (h *GenreHandler) GetGenres(c echo.Context) error {
	genres, err := h.Service.GetGenres()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, genres)
}

func (h *GenreHandler) GetGenreByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "ID inválido")
	}

	genre, err := h.Service.GetGenreByID(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, genre)
}

func (h *GenreHandler) UpdateGenre(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "ID inválido")
	}

	var genre models.Genre
	if err := c.Bind(&genre); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	genre.ID = uint(id)
	if err := h.Service.UpdateGenre(genre); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, genre)
}

func (h *GenreHandler) DeleteGenre(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "ID inválido")
	}

	if err := h.Service.DeleteGenre(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
