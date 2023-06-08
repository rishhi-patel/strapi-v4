import React, { useEffect, useState } from "react";
import {
  Box,
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
import MovieModal from "./MovieModal";

const MovieTable = ({ movies, onAssociateMovie }) => (
  <Table>
    <thead>
      <Tr>
        <Th>ID</Th>
        <Th>Movie Title</Th>
        <Th>Release Date</Th>
        <Th>TMDB Movie ID</Th>
        <Th></Th>
      </Tr>
    </thead>
    <Tbody>
      {movies.map((movie) => (
        <Tr key={movie.id}>
          <Td>{movie.id}</Td>
          <Td>{movie.movieTitle}</Td>
          <Td>{movie.releaseDate}</Td>
          <Td>{movie.tmdbMovieId}</Td>
          <Td>
            <Flex alignItems="center" justifyContent="flex-end">
              <Button
                variant="text"
                onClick={() => onAssociateMovie(movie.id)}
                disabled={Boolean(movie.tmdbMovieId)}
              >
                Associate Movie
              </Button>
            </Flex>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const MovieListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const [tmDbList, setTmDbList] = useState([]);
  const [activeId, setactiveId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const res = await movieRequest.getMovies();
      if (res) setMovies(res);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const searchTmdb = async () => {
      const res = await movieRequest.searchOnTmdb(value);
      if (res) setTmDbList(res);
    };

    searchTmdb();
  }, [value]);

  const scrapMovies = async () => {
    setLoading(true);
    const res = await movieRequest.scrapMovies();
    if (res) setMovies(res);
    setLoading(false);
  };

  const handleAssociateMovie = (id) => {
    setIsVisible(true);
    setactiveId(id);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : movies.length === 0 ? (
        <NotFound scrapMovies={scrapMovies} />
      ) : (
        <>
          <Box maxWidth="1120px" style={{ margin: "16px auto" }}>
            <Typography variant="alpha">Scraped Movies</Typography>
            <MovieTable
              movies={movies}
              onAssociateMovie={handleAssociateMovie}
            />
            {isVisible && (
              <MovieModal
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                tmDbList={tmDbList}
                activeId={activeId}
                setMovies={setMovies}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MovieListingPage;
