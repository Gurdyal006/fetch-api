import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailabalePlaces } from "../api.js";

export default function AvailablePlaces({
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlacesApi() {
      setIsFetching(true);
      try {
        const places = await fetchAvailabalePlaces();
        // geolocation coordinates
        navigator.geolocation.getCurrentPosition((postion) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            postion.coords.latitude,
            postion.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }
    fetchPlacesApi();
  }, []);

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
