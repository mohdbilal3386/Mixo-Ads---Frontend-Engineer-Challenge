import {
  DashboardResponse,
  Campaign,
  ApiCampaign,
  CampaignInsights,
  OverallInsights,
} from "./types";

/**
 * Base API URL
 */
const BASE_URL = "https://mixo-fe-backend-task.vercel.app";

/* -------------------------------------------------------------------------- */
/*                              CAMPAIGN DETAILS                               */
/* -------------------------------------------------------------------------- */

/**
 * Fetch a single campaign by ID
 */
export async function getCampaignById(id: string): Promise<Campaign> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/${id}`, {
      cache: "no-store",
    });

    console.log("getCampaignById response status:", res.status); // <--- add this

    if (!res.ok) {
      let errorMessage = `Failed to fetch campaign details. Status: ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        // If JSON parsing fails, use text
        const text = await res.text();
        console.error("Response body:", text);
        if (text) {
          errorMessage += ` - ${text}`;
        }
      }
      throw new Error(errorMessage);
    }

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      throw new Error("Failed to parse JSON response for campaign details");
    }

    const campaign: ApiCampaign = data.campaign;

    return {
      ...campaign,
      platforms: campaign.platforms ?? [],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while fetching campaign details");
  }
}

/* -------------------------------------------------------------------------- */
/*                              INSIGHTS API                                 */
/* -------------------------------------------------------------------------- */

/**
 * Fetch aggregated insights across all campaigns
 */
export async function getOverallInsights(): Promise<OverallInsights> {
  try {
    const res = await fetch(`${BASE_URL}/campaigns/insights`, {
      cache: "no-store",
    });

    if (!res.ok) {
      let errorMessage = `Failed to fetch overall insights. Status: ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        const text = await res.text();
        console.error("Response body:", text);
        if (text) {
          errorMessage += ` - ${text}`;
        }
      }
      throw new Error(errorMessage);
    }

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      throw new Error("Failed to parse JSON response for overall insights");
    }

    return data.insights;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while fetching overall insights");
  }
}

/**
 * Fetch insights for a single campaign
 */
export async function getCampaignInsights(
  id: string
): Promise<CampaignInsights> {
  const res = await fetch(`${BASE_URL}/campaigns/${id}/insights`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch campaign insights");

  const data = await res.json();
  return data.insights;
}

/**
 * Open a real-time insights stream for a campaign
 */
export async function getCampaignInsightsStream(
  id: string
): Promise<EventSource> {
  try {
    return new EventSource(`${BASE_URL}/campaigns/${id}/insights/stream`);
  } catch (error) {
    console.error("Failed to open insights stream:", error);
    throw new Error("Failed to open insights stream for campaign");
  }
}

/* -------------------------------------------------------------------------- */
/*                              DASHBOARD DATA                                 */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all data required for the dashboard
 * - Campaign list
 * - Aggregated KPIs via getOverallInsights()
 * - Timeline data (mocked)
 */
export async function getDashboardData(): Promise<DashboardResponse> {
  try {
    // Fetch campaigns
    const campaignsRes = await fetch(`${BASE_URL}/campaigns`, {
      cache: "no-store",
    });

    if (!campaignsRes.ok) {
      let errorMessage = `Failed to fetch campaign data. Status: ${campaignsRes.status}`;
      try {
        const errorData = await campaignsRes.json();
        if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch {
        const text = await campaignsRes.text();
        console.error("Response body:", text);
        if (text) {
          errorMessage += ` - ${text}`;
        }
      }
      throw new Error(errorMessage);
    }

    let campaignsData;
    try {
      campaignsData = await campaignsRes.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      throw new Error("Failed to parse JSON response for campaign data");
    }

    const campaigns: ApiCampaign[] = campaignsData.campaigns;

    // Fetch aggregated insights using the dedicated method
    const insights = await getOverallInsights();

    // Map insights to KPIs
    const kpis = {
      impressions: insights.total_impressions,
      clicks: insights.total_clicks,
      ctr: insights.avg_ctr,
      spend: insights.total_spend,
    };

    // Mock timeline (API does not provide time-series)
    const mockTimeline = [
      { date: "2025-01-01", impressions: 10000, clicks: 800 },
      { date: "2025-01-02", impressions: 12000, clicks: 960 },
      { date: "2025-01-03", impressions: 15000, clicks: 1200 },
    ];

    // Normalize campaign data with derived dates
    const campaignsWithDates: Campaign[] = campaigns.map((c) => {
      const startDate = new Date(c.created_at);
      const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
      return {
        ...c,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        platforms: c.platforms ?? [],
      };
    });

    return {
      kpis,
      timeline: mockTimeline,
      campaigns: campaignsWithDates,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unknown error occurred while fetching dashboard data");
  }
}
