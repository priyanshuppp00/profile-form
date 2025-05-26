export default function Step2({ formData, onChange, nextStep, prevStep }) {
  const isEntrepreneur = formData.profession === "Entrepreneur";

  const validate = () => {
    if (!formData.profession) return alert("Select a profession");
    if (isEntrepreneur && !formData.companyName)
      return alert("Company name required");
    if (!formData.addressLine1) return alert("Address Line 1 required");
    nextStep();
  };

  return (
    <div>
      <label>Profession</label>
      <select
        className="input"
        value={formData.profession}
        onChange={(e) => onChange("profession", e.target.value)}
      >
        <option value="">Select</option>
        <option>Student</option>
        <option>Developer</option>
        <option>Entrepreneur</option>
      </select>

      {isEntrepreneur && (
        <div>
          <label>Company Name</label>
          <input
            className="input"
            value={formData.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
          />
        </div>
      )}

      <label>Address Line 1</label>
      <input
        className="input"
        value={formData.addressLine1}
        onChange={(e) => onChange("addressLine1", e.target.value)}
      />

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
