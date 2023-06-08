import React from "react";
import { Box, Typography, GridLayout } from "@strapi/design-system";

const MovieListingPage = () => {
  return (
    <Box padding={8} background="neutral100">
      <GridLayout>
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <Box
              padding={4}
              hasRadius
              background="neutral0"
              key={`box-${idx}`}
              shadow="tableShadow"
            >
              <Typography>{`Hello World ${idx + 1}`}</Typography>
            </Box>
          ))}
      </GridLayout>
    </Box>
  );
};

export default MovieListingPage;
