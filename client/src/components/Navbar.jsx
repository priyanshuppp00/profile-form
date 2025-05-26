import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between px-6 py-4 text-white bg-indigo-700 shadow-md">
      <Link to="/" className="text-xl font-bold hover:scale-105">
        Priyanshu
      </Link>
      <h1 className="hidden text-xl font-bold sm:block">Profile Update</h1>
      <div className="flex mt-2 space-x-4 sm:mt-0">
        <Link
          to="/"
          className="px-4 py-2 text-sm text-indigo-700 transition bg-white rounded hover:bg-indigo-100"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="px-4 py-2 text-sm text-indigo-700 transition bg-white rounded hover:bg-indigo-100"
        >
          About
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
