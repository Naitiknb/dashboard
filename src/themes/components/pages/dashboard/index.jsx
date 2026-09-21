"use client";

import { useEffect, useState } from "react";

import ProductionKpi from "./widgets/productionKpi";
import TargetKpi from "./widgets/targetKpi";
import Filter from "./components/filters";
import ProductionTrend from "./widgets/productionTrend";
import TargetAchievedKpi from "./widgets/TargetAchievedKpi";
import FieldPerformance from "./widgets/fieldPerformance";
import Rankings from "./widgets/rankings";
import ProductionGrid from "./widgets/productionGrid";
import ActiveWellKpi from "./widgets/activeWells";
import AverageCycleTimeKpi from "./widgets/avergaeCycyleTime";

export default function Dashboard() {
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
        return (
            <div className="flex h-full items-center justify-center">
                Loading production data...
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="space-y-6 p-3 pb-8">

                <Filter />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <ProductionKpi data={data} />
                    <TargetKpi data={data} />
                    <TargetAchievedKpi data={data} />
                    <ActiveWellKpi data={data} />
                    <AverageCycleTimeKpi data={data} />
                </div>

                <ProductionTrend data={data} />

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <FieldPerformance data={data} />
                    <Rankings data={data} />
                </div>

                <ProductionGrid data={data} />

            </div>
        </div>
    );
}