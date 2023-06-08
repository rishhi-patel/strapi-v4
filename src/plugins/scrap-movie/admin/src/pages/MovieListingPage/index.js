import React from "react";
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
const MovieListingPage = () => {
  const movies = [
    {
      id: 1,
      title: "Movie 1",
      director: "Director 1",
      releaseDate: "2022-01-01",
      tmdbMovieId: 123,
    },
    {
      id: 2,
      title: "Movie 2",
      director: "Director 2",
      releaseDate: "2022-02-02",
      tmdbMovieId: 456,
    },
    {
      id: 3,
      title: "Movie 3",
      director: "Director 3",
      releaseDate: "2022-03-03",
      tmdbMovieId: 789,
    },
  ];

  return (
    <Box maxWidth="800px" style={{ margin: "16px auto" }}>
      <Typography variant="alpha" margin={16}>
        Scraped Movies
      </Typography>
      <Table>
        <thead>
          <Tr>
            <Th>Movie Title</Th>
            <Th>Release Date</Th>
            <Th>Director</Th>
            <Th>TMDB Movie ID</Th>
            <Th></Th>
          </Tr>
        </thead>
        <Tbody>
          {movies.map((movie) => (
            <Tr key={movie.id}>
              <Td>{movie.title}</Td>
              <Td>{movie.releaseDate}</Td>
              <Td>{movie.director}</Td>
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
  );
};

export default MovieListingPage;
