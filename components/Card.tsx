/* ----------------- */
/* Reusable Stat Card */
/* ----------------- */
export function StatCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
    )
}

/* ----------------- */
/* Reusable Info Card */
/* ----------------- */
export function InfoCard({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
            <p className="text-lg font-bold text-gray-900 mt-2">{value}</p>
        </div>
    )
}
