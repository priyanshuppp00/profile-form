export default function ViewProfile({ data }) {
  if (!data) return <p>No profile to display</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="mb-4 text-xl font-bold">Profile Summary</h2>
      {data.profilePhoto && (
        <img
          src={`http://localhost:5000${data.profilePhoto}`}
          alt="Profile"
          className="w-24 h-24 mb-4 rounded-full"
        />
      )}
      <ul className="space-y-2 text-sm">
        {Object.entries(data).map(([key, value]) =>
          key !== "profilePhoto" ? (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
}
