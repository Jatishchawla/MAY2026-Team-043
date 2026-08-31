import { useEffect, useState } from "react";
import { userApi } from "../../services/endpoints";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { PageHeader, PageLoader, Spinner } from "../../components/ui";
import { formatDate } from "../../utils/datetime";

export default function Profile() {
  const { user } = useAuth();
  const toast = useToast();
  const { data, loading } = useAsync(() => userApi.me(), []);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        location: data.location || "",
        organization: data.organization || "",
      });
    }
  }, [data]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await userApi.updateMe(form);
      // Refresh cached user for the navbar name.
      localStorage.setItem("sob_user", JSON.stringify({ ...user, ...updated }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <PageLoader />;

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title="My Account Profile" subtitle="View and update your personal seva details." />

      <div className="card shadow-xl">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className="label">Registered Email</label>
            <input className="input bg-slate-100 text-slate-500 font-medium cursor-not-allowed" value={data.email} disabled />
            <p className="mt-1 text-[11px] text-slate-500 font-medium">Email is linked to your account credentials and cannot be modified.</p>
          </div>
          <div>
            <label className="label">Full Name</label>
            <input required className="input font-bold text-slate-900" value={form.full_name} onChange={update("full_name")} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="label">Contact Phone</label>
              <input className="input font-bold text-slate-900" value={form.phone} onChange={update("phone")} />
            </div>
            <div>
              <label className="label">Location / City</label>
              <input className="input font-bold text-slate-900" value={form.location} onChange={update("location")} />
            </div>
          </div>
          <div>
            <label className="label">College / Organization</label>
            <input className="input font-bold text-slate-900" value={form.organization} onChange={update("organization")} />
          </div>

          <div className="mt-6 rounded-xl bg-white/80 p-3 text-xs text-slate-700 border border-emerald-200 flex items-center justify-between">
            <span>Account Role: <b className="capitalize text-emerald-800 font-black">{data.role.replace("_", " ")}</b></span>
            <span>Joined: {new Date(data.created_at).toLocaleDateString("en-IN")}</span>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 font-black shadow-lg">
              {saving ? <Spinner /> : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>

      <ChangePassword />
    </div>
  );
}

function ChangePassword() {
  const toast = useToast();
  const [form, setForm] = useState({ current_password: "", new_password: "", confirm: "" });
  const [saving, setSaving] = useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.new_password.length < 8) return toast.error("New password must be at least 8 characters");
    if (form.new_password !== form.confirm) return toast.error("New passwords do not match");
    setSaving(true);
    try {
      await userApi.changePassword({
        current_password: form.current_password,
        new_password: form.new_password,
      });
      toast.success("Password updated successfully!");
      setForm({ current_password: "", new_password: "", confirm: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-xl">
      <h2 className="text-lg font-black text-slate-900 font-heading">Security & Password</h2>
      <p className="mt-1 text-xs text-slate-600 font-medium">Update your secret password (minimum 8 characters).</p>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <div>
          <label className="label">Current Password *</label>
          <input type="password" required className="input text-slate-900" value={form.current_password} onChange={update("current_password")} placeholder="••••••••" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="label">New Password *</label>
            <input type="password" required className="input text-slate-900" value={form.new_password} onChange={update("new_password")} placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="label">Confirm New Password *</label>
            <input type="password" required className="input text-slate-900" value={form.confirm} onChange={update("confirm")} placeholder="••••••••" />
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" disabled={saving} className="btn-primary py-2.5 px-6 font-black shadow-lg">
            {saving ? <Spinner /> : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

