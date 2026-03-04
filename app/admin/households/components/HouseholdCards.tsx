"use client";

import { useHousehold } from "../providers/HouseholdProvider";
import { Home, Users, AlertTriangle, ShieldCheck } from "lucide-react";

export function HouseholdCards() {
    const { households } = useHousehold();

    // Calculate dynamic stats
    const totalHouseholds = households.length;
    const totalPopulation = households.reduce((sum, h) => sum + h.householdSize, 0);
    const highRiskHouseholds = households.filter((h) => h.riskLevel === "High Risk" || h.riskLevel === "Flood Prone" || h.riskLevel === "Landslide Prone").length;
    const safeHouseholds = households.filter((h) => h.riskLevel === "Safe").length;

    const cards = [
        {
            title: "Total Households",
            value: totalHouseholds.toLocaleString(),
            icon: Home,
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100 dark:bg-blue-900/40",
            trend: "+Mapped",
        },
        {
            title: "Est. Population Map",
            value: totalPopulation.toLocaleString(),
            icon: Users,
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
            trend: "Across mapped HH",
        },
        {
            title: "Safe Zones",
            value: safeHouseholds.toLocaleString(),
            icon: ShieldCheck,
            color: "text-emerald-600 dark:text-emerald-400",
            bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
            trend: "Assessed Normal",
        },
        {
            title: "At Risk Zones",
            value: highRiskHouseholds.toLocaleString(),
            icon: AlertTriangle,
            color: "text-rose-600 dark:text-rose-400",
            bgColor: "bg-rose-100 dark:bg-rose-900/40",
            trend: "Needs monitoring",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className="bg-white dark:bg-[#151b2b] rounded-2xl p-6 border border-slate-200 dark:border-[#2a3040] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                    {card.title}
                                </p>
                                <h3 className={`text-3xl font-black ${card.color} tracking-tight`}>
                                    {card.value}
                                </h3>
                            </div>
                            <div className={`p-3 rounded-xl ${card.bgColor}`}>
                                <Icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs font-semibold text-slate-400">
                            <span>{card.trend}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
