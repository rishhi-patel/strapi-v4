/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import NotFound from "../notFound";
import MovieListingPage from "../MovieListingPage";
import Loading from "../loading";
import MovieDetailsPage from "../movieDetails";

const HomePage = () => {
  return (
    <div>
      <MovieListingPage />
      <MovieDetailsPage />
      <NotFound />
      <Loading />
    </div>
  );
};

export default HomePage;
