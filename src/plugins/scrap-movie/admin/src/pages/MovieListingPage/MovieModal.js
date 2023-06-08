import React from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  Box,
  SearchForm,
  Searchbar,
  GridLayout,
  Typography,
} from "@strapi/design-system";
import movieRequest from "../../api";

const MovieModal = ({
  activeId,
  onClose,
  value,
  onChange,
  tmDbList,
  setMovies,
}) => {
  return (
    <ModalLayout onClose={onClose} labelledBy="title">
      <ModalHeader>
        <SearchForm>
          <Searchbar
            name="searchbar"
            onClear={() => onChange("")}
            value={value}
            onChange={onChange}
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
            {tmDbList.map((movie, idx) => (
              <Box
                padding={4}
                hasRadius
                background="neutral0"
                key={`box-${idx}`}
                shadow="tableShadow"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  console.log({ activeId });
                  const res = await movieRequest.updateMovie(
                    activeId,
                    movie.id
                  );
                  if (res) setMovies(res);
                  onClose();
                }}
              >
                <Typography>{movie.title}</Typography>
              </Box>
            ))}
          </GridLayout>
        </Box>
      </ModalBody>
    </ModalLayout>
  );
};

export default MovieModal;
