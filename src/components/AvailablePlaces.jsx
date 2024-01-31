import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailabalePlaces } from "../api.js";
import useFetch from "../customHooks.js/useFetch.js";

async function sortedPlacesAvailable() {
  const places = await fetchAvailabalePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((postion) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        postion.coords.latitude,
        postion.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  const {
    isFetching,
    fetchData: availablePlaces,
    error,
  } = useFetch(sortedPlacesAvailable, []); // line 8 call in another function

  if (error) {
    return (
      <Error title="Fetching details Api error" message="loadinggggg...." />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText="Fetching Data Loading......."
    />
  );
}
