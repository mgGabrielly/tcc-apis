package models

import "gorm.io/gorm"

type Book struct {
	gorm.Model
	Title   string `json:"name"`
	Author  string `json:"author"`
	Year    int    `json:"year"`
	Pages   int    `json:"pages"`
	GenreID uint   `json:"genre_id"`
	Genre   Genre  `json:"genre"`
}
