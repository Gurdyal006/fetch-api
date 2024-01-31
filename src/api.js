export async function fetchAvailabalePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("fetching new error...");
  }

  return responseData.places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("fetching user places  error...");
  }

  return responseData.places;
}
