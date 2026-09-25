// Convert a city name into a single latitude/longitude pair for the weather API.
// Open-Meteo returns a ranked list of matches; this app intentionally uses the first match.
export const getGeoLocation = async (city) => {

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  const response = await fetch(url);

  // Fail clearly if the geocoding request itself is unsuccessful.
  if (!response.ok) {
    throw new Error("Geocoding request failed!");
  }
  const data = await response.json(); //{ results: Array(1), generationtime_ms: 0.47004223 }

  // The API may return multiple matches; if none are found, the user entered an invalid city.
  const place = data.results?.[0];

  if (!place) {
    throw new Error(`No matching city found for "${city}".`);
  }

  // Return the exact coordinates needed by the weather API for this selected location.
  return {
    name: place.name,
    lat: place.latitude,
    long: place.longitude,
  }

}
