import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl w-full border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Admin Dashboard</h1>
                <p className="text-slate-600 mb-8 font-medium">Welcome back, <span className="text-indigo-600 font-bold">{session.user?.name}</span>!</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                        <h3 className="font-semibold text-indigo-900 mb-1">Company Status</h3>
                        <p className="text-sm text-indigo-700">All systems operational.</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                        <h3 className="font-semibold text-green-900 mb-1">Fortune 500 Data</h3>
                        <p className="text-sm text-green-700">Database connection: Connected</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
