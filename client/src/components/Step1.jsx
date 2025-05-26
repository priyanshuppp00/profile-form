import { useState, useEffect } from "react";
import { checkUsernameAvailability } from "../utils/api";
import { passwordStrength } from "../utils/passwordStrength";

export default function Step1({ formData, onChange, nextStep }) {
  const [preview, setPreview] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    try {
      console.log("profilePhoto value:", formData.profilePhoto);
      if (formData.profilePhoto && formData.profilePhoto instanceof Blob) {
        const url = URL.createObjectURL(formData.profilePhoto);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setPreview(null);
      }
    } catch (error) {
      console.error("Error creating object URL for profile photo:", error);
      setPreview(null);
    }
  }, [formData.profilePhoto]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (formData.username.length >= 4) {
        checkUsernameAvailability(formData.username).then((res) => {
          setUsernameAvailable(res.available);
        });
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [formData.username]);

  const validate = () => {
    const errs = {};
    if (!formData.profilePhoto) errs.profilePhoto = "Profile photo is required";
    else if (!["image/jpeg", "image/png"].includes(formData.profilePhoto.type))
      errs.profilePhoto = "Only JPG/PNG files are allowed";
    else if (formData.profilePhoto.size > 2 * 1024 * 1024)
      errs.profilePhoto = "File size must be less than or equal to 2MB";

    if (!formData.username.match(/^\S{4,20}$/))
      errs.username = "4–20 characters, no spaces allowed";
    if (!usernameAvailable) errs.username = "Username already taken";

    // Current password required if password is changed
    if (formData.password && !formData.currentPassword) {
      // Only require currentPassword if user is updating existing password (not on new user creation)
      if (formData.isEditing) {
        errs.currentPassword =
          "Current password is required to change password";
      }
    }

    if (
      formData.password &&
      !formData.password.match(/^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/)
    )
      errs.password = "8+ characters, 1 special character, 1 number required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validate()) nextStep();
  };

  return (
    <form
      onSubmit={handleNext}
      className="max-w-md p-4 mx-auto space-y-6 bg-white shadow x rounded-xl"
    >
      <div>
        <label
          htmlFor="profilePhoto"
          className="block font-medium text-gray-700 "
        >
          Profile Photo (JPG/PNG ≤ 2MB)
        </label>
        <input
          id="profilePhoto"
          type="file"
          accept="image/jpeg,image/png"
          className="block w-full mt-1 text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => onChange("profilePhoto", e.target.files[0])}
        />
        {preview && (
          <img
            src={preview}
            alt="Profile Preview"
            className="object-cover w-24 h-24 mt-3 rounded-full"
          />
        )}
        {errors.profilePhoto && (
          <p className="mt-1 text-sm text-red-500">{errors.profilePhoto}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="block font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm input focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.username}
          onChange={(e) => onChange("username", e.target.value)}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
        {!errors.username && !usernameAvailable && (
          <p className="mt-1 text-sm text-red-500">Username already taken</p>
        )}
      </div>

      <div>
        <label
          htmlFor="currentPassword"
          className="block font-medium text-gray-700"
        >
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm input focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.currentPassword || ""}
          onChange={(e) => onChange("currentPassword", e.target.value)}
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block font-medium text-gray-700">
          New Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm input focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-600">
          {passwordStrength(formData.password)}
        </p>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md shadow hover:bg-blue-700"
      >
        Next
      </button>
    </form>
  );
}
