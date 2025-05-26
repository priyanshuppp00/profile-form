import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Summary from "./components/Summary";
import Navbar from "./components/Navbar";
import Profiles from "./components/Profiles";
import { useState, useEffect } from "react";
import About from "./components/About";

function FormFlow() {
  const [submittedData, setSubmittedData] = useState(null);

  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem("formStep");
    return savedStep ? Number(savedStep) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData, (key, value) => {
          if (key === "profilePhoto" && value === null) return null;
          return value;
        })
      : {
          profilePhoto: null,
          username: "",
          password: "",
          currentPassword: "",
          profession: "",
          companyName: "",
          addressLine1: "",
          country: "",
          state: "",
          city: "",
          subscriptionPlan: "Basic",
          newsletter: true,
          isEditing: false,
        };
  });

  useEffect(() => {
    localStorage.setItem("formStep", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Update Profile</h1>
      {step === 1 && (
        <Step1
          formData={formData}
          onChange={handleChange}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          onChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          onChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && <Summary formData={formData} prevStep={prevStep} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<FormFlow />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </Router>
  );
}

export default App;
