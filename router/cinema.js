const cinemaController = require("../controllers/cinema");

const router = require("express").Router();

router.get('/', cinemaController.getAll); //menampilkan semua film
router.get('/:title', cinemaController.getDetail); //menampilkan detail film, streaming film, download film
router.get('/search/:keyword', cinemaController.getSearch); //menampilkan film berdasarkan kata kunci
router.get('/s/:keyword', cinemaController.getSearchInstant); //menampilkan film berdasarkan kata kunci untuk input search
router.get("/:orderby/page/:pagination", cinemaController.getOrderBy); // :orderby = [populer, most-commented, rating, release, title, latest, top-movie-today]
router.get("/:sortby/:value/page/:pagination", cinemaController.getSortBy); // :sortby = [year, genre, country]

module.exports = router;
