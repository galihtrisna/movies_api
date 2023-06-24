const cinemaModel = require("../models/cinema"); // Import model

exports.getAll = async (req, res) => {
  try {
    const movies = await cinemaModel.cinema(); // Call model function

    res.json({
      message: "The film data has been successfully displayed",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const title = {
      variable: req.params.title,
    };
    const movies = await cinemaModel.movieDetail(title); // Call model function

    res.json({
      message: `${title.variable} has been successfully displayed`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan: " + error.message,
      data: null,
    });
  }
};

exports.getOrderBy = async (req, res) => {
  try {
    const data = {
      orderby: req.params.orderby,
      pagination: req.params.pagination,
    };
    const movies = await cinemaModel.movieOrderBy(data);
    res.json({
      message: `film has been successfully displayed`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan: " + error.message,
      data: null,
    });
  }
};

exports.getSortBy = async (req, res) => {
  try {
    const data = {
      sortby: req.params.sortby,
      value: req.params.value,
      pagination: req.params.pagination,
    };
    const movies = await cinemaModel.movieSortBy(data);
    res.json({
      message: `film has been successfully displayed`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan: " + error.message,
      data: null,
    });
  }
};
