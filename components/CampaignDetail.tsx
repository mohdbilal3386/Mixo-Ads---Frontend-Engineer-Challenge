'use client'

import { Campaign, CampaignInsights } from '@/lib/types'
import { InfoCard, StatCard } from './Card'
import { useCampaignLiveStats } from '@/hooks/useCampaignLiveStats'

interface Props {
  campaign: Campaign
  initialInsights: CampaignInsights
}

export default function CampaignDetail({ campaign, initialInsights }: Props) {
  const { insights, status } = useCampaignLiveStats(campaign.id, initialInsights)

  return (
    <div className="space-y-8">
      {/* Campaign Info */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Campaign Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard label="Status" value={campaign.status} />
            <InfoCard label="Budget" value={`$${campaign.budget.toLocaleString()}`} />
            <InfoCard label="Daily Budget" value={`$${campaign.daily_budget.toLocaleString()}`} />
            <InfoCard label="Platforms" value={campaign.platforms.join(', ')} />
            <InfoCard label="Created At" value={new Date(campaign.created_at).toLocaleDateString()} />
          </div>
        </div>
      </section>

      {/* KPI Stats (live) */}
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Campaign KPIs</h2>
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status === 'connected'
              ? 'bg-green-100 text-green-800'
              : status === 'reconnecting'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
              }`}
          >
            {status === 'connected'
              ? 'Live'
              : status === 'reconnecting'
                ? 'Reconnecting...'
                : 'Disconnected'}
          </span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <StatCard label="Impressions" value={insights.impressions.toLocaleString()} />
            <StatCard label="Clicks" value={insights.clicks.toLocaleString()} />
            <StatCard label="Conversions" value={insights.conversions.toLocaleString()} />
            <StatCard label="CTR" value={`${insights.ctr.toFixed(2)}%`} />
            <StatCard label="CPC" value={`$${insights.cpc.toFixed(2)}`} />
            <StatCard label="Spend" value={`$${insights.spend.toFixed(2)}`} />
            <StatCard label="Conversion Rate" value={`${insights.conversion_rate.toFixed(2)}%`} />
          </div>
        </div>
      </section>
    </div>
  )
}
