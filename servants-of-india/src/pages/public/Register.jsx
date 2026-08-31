import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { Spinner } from "../../components/ui";

export default function Register() {
  const { register, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    organization: "",
  });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");

      return;
    }
    try {
      await register(form);
      toast.success("Account created — welcome!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout
      title="Create Volunteer Account"
      subtitle="Join the Servants of Bharat network to participate & earn certificates."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="font-black text-white hover:underline">
            Sign in to your account →
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-3.5">
        <div>
          <label className="label">Full Name</label>
          <input required className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="e.g. Rahul Sharma" />
        </div>
        <div>
          <label className="label">Email Address</label>
          <input type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@example.com" />
        </div>
        <div>
          <label className="label">Mobile Number (10 Digits)</label>
          <input type="tel" required pattern="[0-9]{10}" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" />
        </div>
        <div>
          <label className="label">Create Password (min. 6 chars)</label>
          <input type="password" required minLength={6} className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
        </div>
        <div>
          <label className="label">City / Location *</label>
          <input required className="input" value={form.location} onChange={update("location")} placeholder="e.g. Bengaluru, KA" />
        </div>
        <div>
          <label className="label">College / Organization (Optional)</label>
          <input className="input" value={form.organization} onChange={update("organization")} placeholder="e.g. NSS Unit / IIT Delhi" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base font-black shadow-lg mt-2">
          {loading ? <Spinner /> : "Create Volunteer Account"}
        </button>
      </form>
    </AuthLayout>
  );
}
