"use client";

import { useEffect, useState } from "react";

import ProductionKpi from "./widgets/productionKpi";
import TargetKpi from "./widgets/targetKpi";
import ProductionTrend from "./widgets/productionTrend";
import TargetAchievedKpi from "./widgets/TargetAchievedKpi";
import FieldPerformance from "./widgets/fieldPerformance";
import Rankings from "./widgets/rankings";
import ProductionGrid from "./widgets/productionGrid";
import ActiveWellKpi from "./widgets/activeWells";
import AverageCycleTimeKpi from "./widgets/avergaeCycyleTime";

import Loading from "../../loading";
import { useRBAC } from "@/context/RBACContext";

export default function Dashboard() {
    const { hasPermission } = useRBAC();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProductionData() {
            try {
                const response = await fetch("/api/production");

                if (!response.ok) {
                    throw new Error("Failed to fetch production data");
                }

                const result = await response.json();

                setData(result.data);
            } catch (error) {
                console.error("Production API error:", error);
            } finally {
                setLoading(false);
            }
        }

        getProductionData();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="space-y-6 p-3 pb-8">

                {/* KPI Widgets */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                    {hasPermission("dashboard.productionKpi") && (
                        <ProductionKpi data={data} />
                    )}

                    {hasPermission("dashboard.targetKpi") && (
                        <TargetKpi data={data} />
                    )}

                    {hasPermission("dashboard.targetAchieved") && (
                        <TargetAchievedKpi data={data} />
                    )}

                    {hasPermission("dashboard.activeWells") && (
                        <ActiveWellKpi data={data} />
                    )}

                    {hasPermission("dashboard.averageCycleTime") && (
                        <AverageCycleTimeKpi data={data} />
                    )}

                </div>

                {/* Production Trend */}
                {hasPermission("dashboard.productionTrend") && (
                    <ProductionTrend data={data} />
                )}

                {/* Field / Ranking */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {hasPermission("dashboard.fieldPerformance") && (
                        <FieldPerformance data={data} />
                    )}

                    {hasPermission("dashboard.rankings") && (
                        <Rankings data={data} />
                    )}

                </div>

                {/* Production Grid */}
                {hasPermission("dashboard.productionGrid") && (
                    <ProductionGrid data={data} />
                )}

            </div>
        </div>
    );
}