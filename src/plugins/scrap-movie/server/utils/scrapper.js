const axios = require("axios");
const cheerio = require("cheerio");

// Function to delay execution
function delayExecution(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// Function to search movies in TMDB based on title and release year
async function searchMoviesTMDB(title) {
  try {
    const apiKey = "871d3df1619959711d0354348ba7e3a3";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      title
    )}`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies in TMDB:", error);
    return [];
  }
}

// Function to match the scraped movies with TMDB movies
async function matchMoviesWithTMDB(scrapedMovies, strapi) {
  try {
    const movies = [];

    for (const scrapedMovie of scrapedMovies) {
      const { movieTitle, releaseDate, director, cast, description } =
        scrapedMovie;
      // Search movies in TMDB based on title and release year
      const tmdbMovies = await searchMoviesTMDB(movieTitle);
      // Match the scraped movie with TMDB movies based on other details
      const matchedMovie = tmdbMovies.find(
        (tmdbMovie) => tmdbMovie.title === movieTitle
      );

      if (matchedMovie) {
        const result = await strapi.entityService.findMany(
          "plugin::scrap-movie.movie",
          {
            filters: {
              movieTitle,
            },
          }
        );
        if (result.length > 0)
          await strapi.entityService.update(
            "plugin::scrap-movie.movie",
            result[0].id,
            {
              data: {
                ...scrapedMovie,
                tmdbMovieId: matchedMovie.id,
              },
            }
          );
        else
          await strapi.entityService.create("plugin::scrap-movie.movie", {
            data: {
              ...scrapedMovie,
              tmdbMovieId: matchedMovie.id,
            },
          });

        movies.push({
          ...scrapedMovie,
          tmdbMovieId: matchedMovie.id,
        });
      } else {
        const result = await strapi.entityService.findMany(
          "plugin::scrap-movie.movie",
          {
            filters: {
              movieTitle,
            },
          }
        );
        if (result.length > 0)
          await strapi.entityService.update(
            "plugin::scrap-movie.movie",
            result[0].id,
            {
              data: {
                ...scrapedMovie,
              },
            }
          );
        else
          await strapi.entityService.create("plugin::scrap-movie.movie", {
            data: {
              ...scrapedMovie,
            },
          });
        movies.push(scrapedMovie);
      }
    }
    return movies;
  } catch (error) {
    console.error("Error matching movies with TMDB:", error);
    return { movies: [] };
  }
}

// Function to scrape movies from the website
async function scrapeMovies(strapi) {
  try {
    const movies = [];
    // Your existing scraping logic here
    const response = await axios.get("https://www.pathe.tn/fr");
    const home = cheerio.load(response.data);
    const anchors = home("div.swiper-slide figure.poster a");
    const movieNames = anchors
      .map((index, element) => home(element).attr("href"))
      .get();

    const delay = 1000;

    const movieRequests = movieNames.map(async (movieName) => {
      try {
        const { data } = await axios.get(`https://www.pathe.tn${movieName}`);
        await delayExecution(500);
        return data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
      }
    });

    const movieResponses = await Promise.all(movieRequests);

    for (const movieData of movieResponses) {
      if (movieData) {
        const $ = cheerio.load(movieData);
        const movieTitle = $(".hero-film__content h1").text().trim();
        const releaseDate = $(".hero-film__body p.ft-tertiary")
          .first()
          .text()
          .replace("Release date : ", "")
          .trim();
        const director = $(".hero-film__body p.ft-tertiary strong")
          .first()
          .text()
          .trim();
        const cast = $(".hero-film__body p.ft-tertiary strong")
          .last()
          .text()
          .trim();
        const description = $(".hero-film__desc").text().trim();

        movies.push({
          movieTitle,
          releaseDate,
          director,
          cast,
          description,
        });
      }
    }

    // Match the scraped movies with TMDB movies
    return await matchMoviesWithTMDB(movies, strapi);
  } catch (error) {
    console.error("Error scraping movies:", error);
    throw error;
  }
}

module.exports = {
  scrapeMovies,
};
