import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Profiles() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/all`) // ✅ Fixed backtick typo
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUserId(data[0]._id);
          setSelectedUser(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const user = users.find((u) => u._id === selectedUserId);
    setSelectedUser(user || null);
  }, [selectedUserId, users]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <FiLoader className="text-3xl text-gray-600 animate-spin" />
      </div>
    );

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
    <div className="max-w-xl p-6 mx-auto mt-8 bg-white rounded shadow">
      <h1 className="mb-6 text-2xl font-semibold text-center text-indigo-700">
        User Profiles
      </h1>

      <div className="mb-4">
        <label
          htmlFor="userSelect"
          className="block mb-2 font-medium text-gray-700"
        >
          Select User
        </label>
        <select
          id="userSelect"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500"
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
                    : `${
                        import.meta.env.VITE_API_URL
                      }${selectedUser.profilePhoto.replace(/\\/g, "/")}`
                }
                alt="Profile"
                className="w-24 h-24 border rounded-full"
              />
            </div>
          )}

          <ul className="space-y-2 text-sm text-gray-700">
            {Object.entries(selectedUser).map(([key, value]) => {
              if (["_id", "__v", "profilePhoto"].includes(key)) return null;

              const label = key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());

              const formattedValue = Array.isArray(value)
                ? value.join(", ")
                : typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value;

              return (
                <li key={key}>
                  <strong>{label}:</strong> {formattedValue}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
