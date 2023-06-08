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
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Searchbar,
  SearchForm,
  GridLayout,
} from "@strapi/design-system";
import movieRequest from "../../api";
import NotFound from "../notFound";
import Loading from "../loading";

const MovieListingPage = () => {
  const [loading, setloading] = useState(false);
  const [movies, setmovies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const [tmDblist, settmDblist] = useState([]);

  useEffect(async () => {
    setloading(true);
    const res = await movieRequest.getMovies();
    if (res) setmovies(res);
    setloading(false);
  }, []);

  useEffect(async () => {
    const res = await movieRequest.searchOnTmdb(value);
    if (res) settmDblist(res);
  }, [value]);

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
        <>
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
                        <Button
                          variant="text"
                          onClick={() => setIsVisible(true)}
                          disabled={movie.tmdbMovieId !== null}
                        >
                          Associate Movie
                        </Button>
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
            {isVisible && (
              <ModalLayout
                onClose={() => setIsVisible((prev) => !prev)}
                labelledBy="title"
              >
                <ModalHeader>
                  <SearchForm>
                    <Searchbar
                      name="searchbar"
                      onClear={() => setValue("")}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      clearLabel="Clearing the plugin search"
                      placeholder="Search on Themoviedb"
                    >
                      Searching for a plugin
                    </Searchbar>
                  </SearchForm>
                </ModalHeader>
                <ModalBody>
                  <Box padding={8} background="neutral100">
                    <GridLayout>
                      {tmDblist.map((movie, idx) => (
                        <Box
                          padding={4}
                          hasRadius
                          background="neutral0"
                          key={`box-${idx}`}
                          shadow="tableShadow"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log("hello");
                          }}
                        >
                          <Typography>{movie.title}</Typography>
                        </Box>
                      ))}
                    </GridLayout>
                  </Box>
                </ModalBody>
              </ModalLayout>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default MovieListingPage;
