import { DashboardResponse, Campaign, ApiCampaign } from "./types";

const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

export async function getDashboardData(): Promise<DashboardResponse> {
  const res = await fetch(`${BASE_URL}/campaigns`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch campaign data");
  }

  const data = await res.json();

  // Mock kpis and timeline since API doesn't provide them
  const mockKpis = {
    impressions: 150000,
    clicks: 12000,
    ctr: 8.0,
    spend: 5000,
  };

  const mockTimeline: { date: string; impressions: number; clicks: number }[] = [
    { date: "2025-01-01", impressions: 10000, clicks: 800 },
    { date: "2025-01-02", impressions: 12000, clicks: 960 },
    { date: "2025-01-03", impressions: 15000, clicks: 1200 },
    // Add more points as needed
  ];

  // Add mock start and end dates to campaigns
  const campaignsWithDates: Campaign[] = data.campaigns.map((campaign: ApiCampaign) => ({
    ...campaign,
    start_date: new Date(campaign.created_at).toISOString().split('T')[0],
    end_date: new Date(new Date(campaign.created_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days later
  }));

  return {
    kpis: mockKpis,
    timeline: mockTimeline,
    campaigns: campaignsWithDates,
  };
}
