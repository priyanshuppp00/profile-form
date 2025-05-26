export default function Step2({ formData, onChange, nextStep, prevStep }) {
  const isEntrepreneur = formData.profession === "Entrepreneur";

  const validate = () => {
    if (!formData.profession) return alert("Select a profession");
    if (isEntrepreneur && !formData.companyName)
      return alert("Company name is required");
    if (!formData.addressLine1) return alert("Address Line 1 is required");
    nextStep();
  };

  return (
    <div className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded shadow">
      <div>
        <label className="block mb-1 font-medium">Profession</label>
        <select
          value={formData.profession}
          onChange={(e) => onChange("profession", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select</option>
          <option>Student</option>
          <option>Developer</option>
          <option>Entrepreneur</option>
        </select>
      </div>

      {isEntrepreneur && (
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter company name"
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Address Line 1</label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) => onChange("addressLine1", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="123 Main St"
        />
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
