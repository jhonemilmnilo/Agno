import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl w-full border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Citizen Dashboard</h1>
                <p className="text-slate-600 mb-8 font-medium">Hello, <span className="text-blue-600 font-bold">{session.user?.name}</span>!</p>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                    <h3 className="font-semibold text-blue-900 mb-2">Portal Access</h3>
                    <p className="text-sm text-blue-700">Welcome to the Citizen Portal. Your profile and company details will appear here soon.</p>
                </div>
            </div>
        </div>
    );
}
