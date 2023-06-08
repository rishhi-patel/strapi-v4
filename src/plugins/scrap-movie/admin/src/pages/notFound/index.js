import React from "react";
import { Box, Button, EmptyStateLayout } from "@strapi/design-system";
import Picture from "@strapi/icons/Picture";

const NotFound = () => {
  return (
    <Box padding={8} background="neutral100">
      <EmptyStateLayout
        icon={<Picture style={{ height: 200, width: 200 }} />}
        content="No Movies Found..."
        action={<Button variant="secondary">Start Scrapping</Button>}
      />
    </Box>
  );
};

export default NotFound;
