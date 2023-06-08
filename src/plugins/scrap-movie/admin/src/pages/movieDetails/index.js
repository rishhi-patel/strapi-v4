import React from "react";
import { Box, Grid, Typography } from "@strapi/design-system";

const MovieListingPage = () => {
  return (
    <Box py={4}>
      {/* <Container> */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box height={0} paddingTop="56.25%" position="relative">
            <img
              src="path_to_movie_poster"
              alt="Movie Poster"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box p={2}>
            <Typography variant="h2" mb={2}>
              Movie Title
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              Release Year: 2023
            </Typography>
            <Typography variant="body1" mb={4}>
              Movie Description Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Typography>
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="h6" mr={2}>
                Director:
              </Typography>
              <Typography variant="body1">John Doe</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-start">
              <Typography variant="h6" mr={2}>
                Cast:
              </Typography>
              <Typography variant="body1">Actor 1, Actor 2, Actor 3</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default MovieListingPage;
