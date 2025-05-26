import { useNavigate } from "react-router-dom";

export default function Summary({ formData, prevStep }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/create`,
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();

      if (res.ok) {
        alert("Profile submitted!");
        navigate("/profiles"); // ⬅️ go to profile page
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Review Your Info</h2>

      {formData.profilePhoto && (
        <div className="mb-4">
          <p className="font-semibold">Profile Photo Preview:</p>
          {(() => {
            try {
              if (formData.profilePhoto instanceof Blob) {
                const url = URL.createObjectURL(formData.profilePhoto);
                return (
                  <img
                    src={url}
                    alt="Profile Preview"
                    className="w-24 h-24 mt-2 rounded-full"
                    onLoad={() => URL.revokeObjectURL(url)}
                  />
                );
              } else {
                return <p>Invalid profile photo</p>;
              }
            } catch (error) {
              console.error(
                "Error creating object URL for profile photo:",
                error
              );
              return <p>Error loading profile photo</p>;
            }
          })()}
        </div>
      )}

      <div className="p-4 bg-gray-100 rounded">
        {Object.entries(formData)
          .filter(
            ([key, value]) =>
              key !== "profilePhoto" && value !== "" && value !== null
          )
          .map(([key, value]) => {
            let displayValue = value;
            if (typeof value === "boolean") {
              displayValue = value ? "Yes" : "No";
            }
            // Format keys to be more readable
            const formattedKey = key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase());
            return (
              <div key={key} className="mb-2">
                <span className="font-semibold">{formattedKey}:</span>{" "}
                {displayValue}
              </div>
            );
          })}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
