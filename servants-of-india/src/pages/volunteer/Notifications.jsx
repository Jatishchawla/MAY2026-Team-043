import { notificationApi } from "../../services/endpoints";
import { useToast } from "../../contexts/ToastContext";
import { useAsync } from "../../hooks/useAsync";
import { EmptyState, PageHeader, PageLoader } from "../../components/ui";

function NotificationIcon({ type }) {
  if (type === "approval") {
    return (
      <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  if (type === "rejection") {
    return (
      <svg className="h-5 w-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  if (type === "certificate") {
    return (
      <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

export default function Notifications() {
  const toast = useToast();
  const { data, loading, error, reload } = useAsync(() => notificationApi.list(), []);

  const markRead = async (id) => {
    try {
      await notificationApi.markRead(id);
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <PageLoader />;
  if (error) return <p className="text-red-400 font-semibold p-4 rounded-xl bg-red-950/40 border border-red-800">{error}</p>;

  const notes = data.notifications;

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title="Alerts & Notifications"
        subtitle={data.unread_count ? `${data.unread_count} unread notification${data.unread_count === 1 ? "" : "s"}` : "You are all caught up with alerts."}
      />
      {notes.length === 0 ? (
        <EmptyState title="No notifications yet" subtitle="You will receive alerts here when submissions are reviewed or events are updated." />
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl p-4.5 transition-all duration-200 border flex items-start gap-4 shadow-sm ${
                n.is_read
                  ? "card border-emerald-300/80 p-4.5"
                  : "bg-gradient-to-br from-[#fef3c7] via-[#fde68a]/70 to-[#d1fae5]/80 border-2 border-amber-500 shadow-md ring-2 ring-amber-400/40"
              }`}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-950 border border-amber-300 shadow-sm">
                <NotificationIcon type={n.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-950 leading-relaxed">{n.message}</p>
                <p className="mt-1 text-xs font-semibold text-slate-700">{new Date(n.created_at).toLocaleString("en-IN")}</p>
              </div>
              {!n.is_read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="shrink-0 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition shadow-sm active:scale-95"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

