import { Campaign } from "@/lib/types"


interface Props {
    campaign: Campaign
}

export default function CampaignHeader({ campaign }: Props) {
    return (
        <section className="border-b pb-4">
            <div className="flex items-center justify-between text-black">
                <h1 className="text-2xl font-bold">
                    {campaign.name}
                </h1>

                <StatusBadge status={campaign.status} />
            </div>

            <div className="mt-2 text-sm text-gray-600 flex gap-4">
                <span>
                    <strong>Budget:</strong> ${campaign.budget}
                </span>
                <span>
                    <strong>Daily:</strong> ${campaign.daily_budget}
                </span>
                <span>
                    <strong>Platforms:</strong>{' '}
                    {campaign.platforms.length > 0
                        ? campaign.platforms.join(', ')
                        : '—'}
                </span>
            </div>
        </section>
    )
}

/* ----------------- */
/* Local helper UI   */
/* ----------------- */

function StatusBadge({ status }: { status: string }) {
    const color =
        status === 'active'
            ? 'bg-green-100 text-green-800'
            : status === 'paused'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'

    return (
        <span
            className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${color}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}
