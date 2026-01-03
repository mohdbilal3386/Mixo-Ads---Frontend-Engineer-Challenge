export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: string;
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string;
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

export interface CampaignInsights {
  campaign_id: string;
  timestamp: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}

export interface OverallInsights {
  timestamp: string;
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;
  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;
  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
}

export interface Kpis {
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
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
