'use client'

import { Campaign, CampaignInsights } from '@/lib/types'
import CampaignHeader from './CampaignHeader'

import CampaignDetail from './CampaignDetail'

interface Props {
    campaign: Campaign
    insights: CampaignInsights
}

export default function CampaignClient({ campaign, insights }: Props) {
    return (
        <div className="space-y-8">
            <CampaignHeader campaign={campaign} />

            {/* Unified stats: shows initial data + updates live */}
            <CampaignDetail campaign={campaign} initialInsights={insights} />
        </div>
    )
}
