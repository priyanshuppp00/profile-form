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
    <div>
      <label>Country</label>
      <select
        className="input"
        value={formData.country}
        onChange={(e) => onChange("country", e.target.value)}
      >
        <option value="">Select</option>
        {countries.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label>State</label>
      <select
        className="input"
        value={formData.state}
        onChange={(e) => onChange("state", e.target.value)}
      >
        <option value="">Select</option>
        {states.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label>City</label>
      <select
        className="input"
        value={formData.city}
        onChange={(e) => onChange("city", e.target.value)}
      >
        <option value="">Select</option>
        {cities.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <label>Subscription Plan</label>
      <div className="flex gap-4">
        {["Basic", "Pro", "Enterprise"].map((plan) => (
          <label key={plan}>
            <input
              type="radio"
              value={plan}
              checked={formData.subscriptionPlan === plan}
              onChange={() => onChange("subscriptionPlan", plan)}
            />{" "}
            {plan}
          </label>
        ))}
      </div>

      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => onChange("newsletter", e.target.checked)}
        />
        Subscribe to newsletter
      </label>

      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="btn">
          Back
        </button>
        <button onClick={validate} className="btn">
          Next
        </button>
      </div>
    </div>
  );
}
