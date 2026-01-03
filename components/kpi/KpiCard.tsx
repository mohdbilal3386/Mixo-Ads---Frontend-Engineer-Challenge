interface Props {
    title: string;
    value: string | number;
}

export default function KpiCard({ title, value }: Props) {
    const getColorClasses = (title: string) => {
        switch (title.toLowerCase()) {
            case 'impressions':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'clicks':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'ctr':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'spend':
                return 'bg-red-50 border-red-200 text-red-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    return (
        <div className={`p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${getColorClasses(title)}`}>
            <p className="text-sm font-medium opacity-75">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
    );
}