import React from "react";
import { Box, Button, EmptyStateLayout } from "@strapi/design-system";
import Picture from "@strapi/icons/Picture";

const NotFound = ({ scrapMovies }) => {
  return (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Picture style={{ height: 400, width: 400 }} />}
        content="No Movies Found..."
        action={
          <Button variant="secondary" onClick={scrapMovies}>
            Start Scrapping
          </Button>
        }
      />
    </Box>
  );
};

export default NotFound;
