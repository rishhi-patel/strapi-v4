import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Typography,
  Text,
  Flex,
} from "@strapi/design-system";
import movieRequest from "../../api";
import NotFound from "../notFound";
import Loading from "../loading";
const MovieListingPage = () => {
  const [loading, setloading] = useState(false);
  const [movies, setmovies] = useState([]);

  useEffect(async () => {
    setloading(true);
    const res = await movieRequest.getMovies();
    if (res) setmovies(res);
    setloading(false);
  }, []);

  const scrapMovies = async () => {
    setloading(true);
    const res = await movieRequest.scrapMovies();
    if (res) setmovies(res);
    setloading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : movies.length === 0 ? (
        <NotFound scrapMovies={scrapMovies} />
      ) : (
        <Box maxWidth="1120px" style={{ margin: "16px auto" }}>
          <Typography variant="alpha">Scraped Movies</Typography>
          <Table>
            <thead>
              <Tr>
                <Th>Movie Title</Th>
                <Th>Release Date</Th>
                <Th>TMDB Movie ID</Th>
                <Th></Th>
              </Tr>
            </thead>
            <Tbody>
              {movies.map((movie) => (
                <Tr key={movie.id}>
                  <Td>{movie.movieTitle}</Td>
                  <Td>{movie.releaseDate}</Td>
                  <Td>{movie.tmdbMovieId}</Td>
                  <Td>
                    <Flex alignItems="center" justifyContent="flex-end">
                      <Button variant="text">View</Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
              {movies.length === 0 && (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Text variant="text">No movies found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default MovieListingPage;
