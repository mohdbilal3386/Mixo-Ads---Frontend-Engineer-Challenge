'use client'

import { useState } from "react"
import { DashboardResponse } from "@/lib/types"
import KpiCard from "./kpi/KpiCard"
import PerformanceChart from "./chart/PerformanceChart"
import CampaignTable from "./table/CampaignTable"
import Filters from "./filters/Filters"



interface Props {
    data: DashboardResponse
}

export default function DashboardClient({ data }: Props) {
    const [filters, setFilters] = useState<{ campaignId?: string; search?: string }>({});

    const handleFilterChange = (newFilters: { campaignId?: string; search?: string }) => {
        setFilters(newFilters);
    };

    const filteredCampaigns = data.campaigns.filter((campaign) => {
        if (filters.campaignId && campaign.id !== filters.campaignId) {
            return false;
        }
        if (filters.search && !campaign.name.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        return true;
    });

    const campaignOptions = data.campaigns.map((c) => ({ id: c.id, name: c.name }));

    return (
        <div className="space-y-8">
            <KpiCard kpis={data.kpis} />
            <PerformanceChart timeline={data.timeline} />
            <Filters onFilterChange={handleFilterChange} campaigns={campaignOptions} />
            <CampaignTable campaigns={filteredCampaigns} />
        </div>
    )
}
