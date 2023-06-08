/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import NotFound from "../notFound";
import MovieListingPage from "../MovieListingPage";
import Loading from "../loading";
import MovieDetailsPage from "../movieDetails";
import movieRequest from "../../api";

const HomePage = () => {
  return (
    <div>
      <MovieListingPage />
    </div>
  );
};

export default HomePage;
