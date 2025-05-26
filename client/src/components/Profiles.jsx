import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Profiles() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  useEffect(() => {
    // Fetch all users
    fetch("/api/users/all")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUserId(data[0]._id);
          setSelectedUser(data[0]);
        }
        setLoading(false); // ✅ Stop loading once data is fetched
      })
      .catch((err) => {
        console.error("Error loading users", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u._id === selectedUserId);
      setSelectedUser(user);
    }
  }, [selectedUserId, users]);

  // ✅ Show loader while fetching
  if (loading)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <FiLoader className="text-3xl text-gray-600 animate-spin" />
      </div>
    );

  // ✅ Show message when no users are found
  if (!loading && users.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-64px)]">
        <h1 className="text-2xl text-gray-600">No Users Available</h1>
        <Link
          to="/"
          className="px-4 py-2 text-sm text-indigo-700 transition bg-white rounded hover:bg-indigo-100"
        >
          Return Home
        </Link>
      </div>
    );

  return (
    <div className="max-w-xl p-4 mx-auto mt-6 bg-white rounded shadow">
      <h1 className="mb-4 text-xl font-bold text-center">Profiles</h1>

      <div className="mb-4">
        <label htmlFor="userSelect" className="block mb-2 font-semibold">
          Select User:
        </label>
        <select
          id="userSelect"
          className="w-full p-2 border rounded"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      {selectedUser && (
        <>
          {selectedUser.profilePhoto && (
            <div className="flex justify-center mb-4">
              <img
                src={
                  selectedUser.profilePhoto.startsWith("http")
                    ? selectedUser.profilePhoto
                    : `http://localhost:5000/${selectedUser.profilePhoto.replace(
                        /\\/g,
                        "/"
                      )}`
                }
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}
          <ul className="space-y-2 text-sm">
            {Object.entries(selectedUser).map(
              ([key, value]) =>
                key !== "_id" &&
                key !== "__v" &&
                key !== "profilePhoto" && (
                  <li key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </li>
                )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
