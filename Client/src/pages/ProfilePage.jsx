import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <section>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="mt-2 text-sm text-slate-300">
          You need to sign in to view your profile.
        </p>
        <Link
          to="/login"
          className="mt-3 inline-flex rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-500"
        >
          Go to login
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm">
        <p>
          <span className="text-slate-400">Name:</span> {user.name}
        </p>
        <p className="mt-1">
          <span className="text-slate-400">Email:</span> {user.email}
        </p>
      </div>
      <div className="mt-4">
        <Link
          to="/orders"
          className="inline-flex rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-100 hover:border-primary-500"
        >
          View your orders
        </Link>
      </div>
    </section>
  );
};

export default ProfilePage;