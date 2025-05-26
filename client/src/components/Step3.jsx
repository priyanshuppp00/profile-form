import { useEffect, useState } from "react";
import { fetchCountries, fetchStates, fetchCities } from "../utils/api";

export default function Step3({ formData, onChange, nextStep, prevStep }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetchStates(formData.country).then(setStates);
    } else {
      setStates([]);
    }
    onChange("state", "");
    onChange("city", "");
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      fetchCities(formData.state).then(setCities);
    } else {
      setCities([]);
    }
    onChange("city", "");
  }, [formData.state]);

  const validate = () => {
    if (!formData.country || !formData.state || !formData.city)
      return alert("Please select Country, State, and City");
    nextStep();
  };

  return (
    <div className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-medium">Country</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
          value={formData.country}
          onChange={(e) => onChange("country", e.target.value)}
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
          value={formData.state}
          onChange={(e) => onChange("state", e.target.value)}
        >
          <option value="">Select</option>
          {states.map((s) => (
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
          value={formData.city}
          onChange={(e) => onChange("city", e.target.value)}
        >
          <option value="">Select</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Subscription Plan</label>
        <div className="flex gap-6">
          {["Basic", "Pro", "Enterprise"].map((plan) => (
            <label key={plan} className="flex items-center gap-2">
              <input
                type="radio"
                value={plan}
                checked={formData.subscriptionPlan === plan}
                onChange={() => onChange("subscriptionPlan", plan)}
              />
              {plan}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => onChange("newsletter", e.target.checked)}
          />
          Subscribe to newsletter
        </label>
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
