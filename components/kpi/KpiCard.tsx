interface Kpis {
    impressions: number
    clicks: number
    ctr: number
    spend: number
}

interface Props {
    kpis: Kpis
}

export default function KpiCard({ kpis }: Props) {
    const items = [
        {
            label: 'Impressions',
            value: kpis.impressions.toLocaleString(),
        },
        {
            label: 'Clicks',
            value: kpis.clicks.toLocaleString(),
        },
        {
            label: 'CTR',
            value: `${kpis.ctr.toFixed(2)}%`,
        },
        {
            label: 'Spend',
            value: `$${kpis.spend.toFixed(2)}`,
        },
    ]

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {item.value}
                    </p>
                </div>
            ))}
        </section>
    )
}
