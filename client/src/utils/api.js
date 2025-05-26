export const checkUsernameAvailability = async (username) => {
  const res = await fetch(
    `http://localhost:5000/api/users/check-username/${username}`
  );
  return res.json();
};

export const fetchCountries = async () => {
  const res = await fetch("http://localhost:5000/api/locations/countries");
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

export const fetchStates = async (country) => {
  const res = await fetch(
    `http://localhost:5000/api/locations/states/${country}`
  );
  if (!res.ok) throw new Error("Failed to fetch states");
  return res.json();
};

export const fetchCities = async (state) => {
  const res = await fetch(
    `http://localhost:5000/api/locations/cities/${state}`
  );
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
};
