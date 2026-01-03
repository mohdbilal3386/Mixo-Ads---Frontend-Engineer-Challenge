"use client";

import { useState, useEffect } from "react";
import { getDashboardData } from "@/lib/api";
import KpiCard from "@/components/kpi/KpiCard";
import CampaignTable from "@/components/table/CampaignTable";
import PerformanceChart from "@/components/chart/PerformanceChart";
import Filters from "@/components/filters/Filters";
import { DashboardResponse, Campaign } from "@/lib/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDashboardData();
      setData(result);
      setFilteredCampaigns(result.campaigns || []);
    };
    fetchData();
  }, []);

  const handleFilterChange = (filters: { campaignId?: string; search?: string }) => {
    if (!data) return;
    let filtered = data.campaigns || [];

    if (filters.campaignId) {
      filtered = filtered.filter(c => c.id === filters.campaignId);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchLower));
    }

    setFilteredCampaigns(filtered);
  };

  if (!data) {
    return <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">Loading...</div>;
  }

  const kpis = data.kpis || { impressions: 0, clicks: 0, ctr: 0, spend: 0 };
  const timeline = data.timeline || [];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Campaign Monitoring Dashboard</h1>

        {/* KPI Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard title="Impressions" value={kpis.impressions.toLocaleString()} />
          <KpiCard title="Clicks" value={kpis.clicks.toLocaleString()} />
          <KpiCard title="CTR" value={`${kpis.ctr}%`} />
          <KpiCard title="Spend" value={`$${kpis.spend.toLocaleString()}`} />
        </section>

        {/* Chart */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <PerformanceChart data={timeline} />
        </section>

        {/* Filters */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <Filters
            onFilterChange={handleFilterChange}
            campaigns={data.campaigns?.map(c => ({ id: c.id, name: c.name })) || []}
          />
        </section>

        {/* Table */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <CampaignTable campaigns={filteredCampaigns} />
        </section>
      </div>
    </main>
  );
}
