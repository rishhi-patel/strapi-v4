import React from "react";
import { Box, Flex, Loader } from "@strapi/design-system";

const Loading = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="gray.200"
    >
      <Box
        p="medium"
        textAlign="center"
        backgroundColor="white"
        borderRadius="medium"
      >
        <Loader size="medium" color="primary" />
      </Box>
    </Flex>
  );
};

export default Loading;
