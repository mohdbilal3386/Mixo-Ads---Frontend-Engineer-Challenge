import CampaignClient from "@/components/CampaignClient"
import { getCampaignById, getCampaignInsights } from "@/lib/api"

export default async function CampaignPage({ params }: { params: { id?: string } }) {
  const campaignId = await params
  const { id } = campaignId;
  if (!id) {
    return <p className="p-6 text-red-600">Error: Campaign ID missing in URL</p>
  }

  const [campaign, insights] = await Promise.all([
    getCampaignById(id),
    getCampaignInsights(id),
  ])

  return (
    <main className="p-6 space-y-6 bg-white">
      <CampaignClient campaign={campaign} insights={insights} />
    </main>
  )
}
