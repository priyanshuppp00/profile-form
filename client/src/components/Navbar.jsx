import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 text-white bg-indigo-700 shadow-md">
      <h1 className="text-xl font-bold">Profile Update</h1>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 text-sm text-indigo-700 transition bg-white rounded hover:bg-indigo-100"
        >
          Home
        </Link>
        <Link
          to="/profiles"
          className="px-4 py-2 text-sm text-indigo-700 transition bg-white rounded hover:bg-indigo-100"
        >
          View All Profiles
        </Link>
      </div>
    </nav>
  );
}
