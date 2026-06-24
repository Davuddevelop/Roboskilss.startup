import { requireUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar email={user.email ?? "you"} />
        {!isSupabaseConfigured && (
          <div className="border-b border-warning/30 bg-warning/10 px-6 py-2 text-center text-xs text-warning">
            UI preview mode — connect Supabase (add keys to{" "}
            <code className="font-mono">.env.local</code>) to enable real
            accounts and data.
          </div>
        )}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
