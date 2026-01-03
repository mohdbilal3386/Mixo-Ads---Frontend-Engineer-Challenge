import { Campaign } from "@/lib/types";

export default function CampaignTable({
  campaigns,
}: {
  campaigns: Campaign[];
}) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse bg-white rounded-lg shadow-md border border-gray-200">
          <thead className="bg-linear-to-r from-blue-50 to-indigo-50">
            <tr className="text-left border-b border-gray-200">
              <th className="py-4 px-6 font-semibold text-gray-800">Campaign</th>
              <th className="py-4 px-6 font-semibold text-gray-800">Status</th>
              <th className="py-4 px-6 font-semibold text-gray-800">Budget</th>
              <th className="py-4 px-6 font-semibold text-gray-800">Daily Budget</th>
              <th className="py-4 px-6 font-semibold text-gray-800">Start Date</th>
              <th className="py-4 px-6 font-semibold text-gray-800">End Date</th>
              <th className="py-4 px-6 font-semibold text-gray-800">Platforms</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, index) => (
              <tr
                key={c.id}
                className={`hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                }`}
              >
                <td className="py-4 px-6 font-medium text-gray-900">{c.name}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === 'active'
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : c.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-700">${c.budget.toLocaleString()}</td>
                <td className="py-4 px-6 text-gray-700">${c.daily_budget.toLocaleString()}</td>
                <td className="py-4 px-6 text-gray-700">{c.start_date}</td>
                <td className="py-4 px-6 text-gray-700">{c.end_date}</td>
                <td className="py-4 px-6 text-gray-700">{c.platforms.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
