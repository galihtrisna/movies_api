require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const db = process.env.MOVIE_DATABASE_URL;
const imagedb = process.env.IMAGE_DATABASE_URL;

exports.cinema = async () => {
  try {
    const url = `${db}/latest`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const movies = [];

    let currentPage = 1;
    let totalPages = 2;
    while (currentPage <= totalPages) {
      const response = await axios.get(`${url}/${currentPage}`);
      const $ = cheerio.load(response.data);

      $("article.mega-item").each((index, element) => {
        const titleWithCite = $(element).find("h1.grid-title > a").text();
        const title = titleWithCite.replace(/(Nonton|Film Subtitle Indonesia Streaming Movie Download)/gi, "").trim();
        const year = $(element).find('.grid-categories > a[rel="category"][href^="/year/"]').text();
        const genre = $(element)
          .find('.grid-categories > a[rel="category"][href^="/genre/"]')
          .map((index, elem) => $(elem).text())
          .get();
        const image = $(element).find("figure.grid-poster > a > img").attr("src");
        const detailUrlWithSc = $(element).find("h1.grid-title > a").attr("href");
        const detailUrl = detailUrlWithSc.replace(/(https:\/\/lk21official\.homes\/|\/)/gi, "").trim();
        const country = $(element).find('.grid-categories > a[rel="category"][href^="/country/"]').text();
        const quality = $(element).find(".grid-meta .quality").text();
        const rating = $(element).find(".rating").text();
        const size = $(element).find('.grid-categories > a[rel="category"][href^="/size/"]').text();
        const duration = $(element).find(".grid-meta .duration").text();

        const movie = { title, year, genre, image, detailUrl, country, quality, rating, size, duration };
        movies.push(movie);
      });

      currentPage++;
    }

    return movies;
  } catch (error) {
    throw error;
  }
};

exports.movieDetail = async (title) => {
  try {
    const url = `${db}/${title.variable}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const movie = {};
    const titleWithCite = $("header.post-header > h1").text();
    movie.judulFilm = titleWithCite.replace(/(LK21 Nonton | Film Subtitle Indonesia Streaming Movie Download Gratis Online)/gi, "").trim();
    movie.kualitas = $('h2:contains("Kualitas") + h3 > a').text().trim();
    movie.negara = $('h2:contains("Negara") + h3 > a')
      .map((index, element) => $(element).text().trim())
      .get();
    movie.bintangFilm = $("h2:contains('Bintang film')")
      .closest("div")
      .find("a")
      .map((index, element) => $(element).text())
      .get();
    movie.sutradara = $("h2:contains('Sutradara')")
      .closest("div")
      .find("a")
      .map((index, element) => $(element).text())
      .get();
    movie.genre = $('h2:contains("Genre") + h3 > a')
      .map((index, element) => $(element).text().trim())
      .get();
    movie.imdb = $('h2:contains("IMDb")')
      .nextAll("h3")
      .map((index, element) => $(element).text().trim())
      .get();
    movie.diterbitkan = $('h2:contains("Diterbitkan") + h3').text().trim();
    movie.penerjemah = $('h2:contains("Penerjemah") + h3 > a').text().trim();
    movie.sinopsis = $("blockquote").html().trim();
    movie.durasi = $('h2:contains("Durasi") + h3').text().trim();
    // movie.linkEmbed = $("iframe").attr("src");
    movie.linkEmbed = $("#loadProviders")
      .find("a")
      .map((index, element) => $(element).attr("href"))
      .get();
    const linkTrailers = $('a[rel="nofollow"][href^="https://www.youtube.com/watch?v="]').attr("href");
    movie.linkTrailer = linkTrailers.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    movie.linkDownload = $('a[href^="http://dl.makimbo.xyz/"]').attr("href");
    return movie;
  } catch (error) {
    throw error;
  }
};

exports.movieOrderBy = async (data) => {
  try {
    const url = `${db}/${data.orderby}/page/${data.pagination}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const movies = [];
    $("article.mega-item").each((index, element) => {
      const titleWithCite = $(element).find("h1.grid-title > a").text();
      const title = titleWithCite.replace(/(Nonton|Film Subtitle Indonesia Streaming Movie Download)/gi, "").trim();
      const year = $(element).find('.grid-categories > a[rel="category"][href^="/year/"]').text();
      const genre = $(element)
        .find('.grid-categories > a[rel="category"][href^="/genre/"]')
        .map((index, elem) => $(elem).text())
        .get();
      const image = $(element).find("figure.grid-poster > a > img").attr("src");
      const detailUrlWithSc = $(element).find("h1.grid-title > a").attr("href");
      const detailUrl = detailUrlWithSc.replace(/(https:\/\/lk21official\.homes\/|\/)/gi, "").trim();
      const country = $(element).find('.grid-categories > a[rel="category"][href^="/country/"]').text();
      const quality = $(element).find(".grid-meta .quality").text();
      const rating = $(element).find(".rating").text();
      const size = $(element).find('.grid-categories > a[rel="category"][href^="/size/"]').text();
      const duration = $(element).find(".grid-meta .duration").text();
      const movie = { title, year, genre, image, detailUrl, country, quality, rating, size, duration };
      movies.push(movie);
    });
    return movies;
  } catch (error) {
    throw error;
  }
};

exports.movieSortBy = async (data) => {
  try {
    const url = `${db}/${data.sortby}/${data.value}/page/${data.pagination}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const movies = [];
    $("article.mega-item").each((index, element) => {
      const titleWithCite = $(element).find("h1.grid-title > a").text();
      const title = titleWithCite.replace(/(Nonton|Film Subtitle Indonesia Streaming Movie Download)/gi, "").trim();
      const year = $(element).find('.grid-categories > a[rel="category"][href^="/year/"]').text();
      const genre = $(element)
        .find('.grid-categories > a[rel="category"][href^="/genre/"]')
        .map((index, elem) => $(elem).text())
        .get();
      const image = $(element).find("figure.grid-poster > a > img").attr("src");
      const detailUrlWithSc = $(element).find("h1.grid-title > a").attr("href");
      const detailUrl = detailUrlWithSc.replace(/(https:\/\/lk21official\.homes\/|\/)/gi, "").trim();
      const country = $(element).find('.grid-categories > a[rel="category"][href^="/country/"]').text();
      const quality = $(element).find(".grid-meta .quality").text();
      const rating = $(element).find(".rating").text();
      const size = $(element).find('.grid-categories > a[rel="category"][href^="/size/"]').text();
      const duration = $(element).find(".grid-meta .duration").text();
      const movie = { title, year, genre, image, detailUrl, country, quality, rating, size, duration };
      movies.push(movie);
    });
    return movies;
  } catch (error) {
    throw error;
  }
};

//s
