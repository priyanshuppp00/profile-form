import { useState, useEffect } from "react";

const countries = ["India", "USA", "Canada", "Mexico"];
const states = {
  India: ["Delhi", "UP", "Maharashtra", "Chattisgarh"],
  USA: ["California", "Texas", "New York"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
  Mexico: ["Jalisco", "Nuevo Leon", "Puebla"],
};
const cities = {
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  UP: ["Bareilly", "Lucknow", "Noida", "Agra"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Chattisgarh: ["Raipur", "Bilaspur", "Durg"],

  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  "New York": ["New York City", "Buffalo", "Rochester"],

  Ontario: ["Toronto", "Ottawa", "Hamilton"],
  Quebec: ["Montreal", "Quebec City", "Laval"],
  "British Columbia": ["Vancouver", "Victoria", "Richmond"],

  Jalisco: ["Guadalajara", "Zapopan", "Tlaquepaque"],
  "Nuevo Leon": ["Monterrey", "Guadalupe", "San Nicolas"],
  Puebla: ["Puebla City", "Tehuacan", "Atlixco"],
};

export default function Step3({ formData, onChange, nextStep, prevStep }) {
  const [country, setCountry] = useState(formData.country || "");
  const [state, setState] = useState(formData.state || "");
  const [city, setCity] = useState(formData.city || "");

  useEffect(() => {
    if (country) {
      setState("");
      setCity("");
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      setCity("");
    }
  }, [state]);

  const validate = () => {
    if (!country || !state || !city) {
      alert("Please select Country, State, and City");
      return;
    }
    onChange("country", country);
    onChange("state", state);
    onChange("city", city);
    nextStep();
  };

  return (
    <div className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">State</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          value={state}
          onChange={(e) => setState(e.target.value)}
          disabled={!country}
        >
          <option value="">Select</option>
          {country &&
            states[country].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!state}
        >
          <option value="">Select</option>
          {state &&
            cities[state].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={validate}
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
