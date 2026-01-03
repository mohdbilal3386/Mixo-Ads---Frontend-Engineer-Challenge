export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
  start_date: string;
  end_date: string;
}

export interface ApiCampaign {
  id: string;
  name: string;
  brand_id: string;
  status: string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
}

export interface TimelinePoint {
  date: string;
  impressions: number;
  clicks: number;
}

export interface DashboardResponse {
  kpis: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
  };
  timeline: TimelinePoint[];
  campaigns: Campaign[];
}
