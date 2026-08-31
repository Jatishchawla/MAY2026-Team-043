import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { homeForRole } from "../../components/ProtectedRoute";
import { Spinner } from "../../components/ui";

export default function Login() {
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.full_name ? user.full_name.split(" ")[0] : "Volunteer"}!`);
      navigate(homeForRole(user.role), { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout
      title="Welcome to Portal"
      subtitle="Sign in with your registered volunteer or manager credentials."
      footer={
        <>
          New to Servants of Bharat?{" "}
          <Link to="/register" className="font-bold text-slate-950 hover:underline">
            Register as a volunteer →
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="label">Registered Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            className="input"
            value={form.email}
            onChange={update("email")}
            placeholder="name@example.com"
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            className="input"
            value={form.password}
            onChange={update("password")}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 text-base font-bold shadow-lg mt-2"
        >
          {loading ? <Spinner /> : "Sign In to Portal"}
        </button>
      </form>
    </AuthLayout>
  );
}
