'use client'
import { Campaign } from '@/lib/types'
import Link from 'next/link'

interface Props {
  campaigns: Campaign[]
}

export default function CampaignTable({ campaigns }: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Campaigns</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Budget</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/campaign/${campaign.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
                  >
                    {campaign.name}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : campaign.status === 'paused'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ${campaign.budget.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {campaigns.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500">
          No campaigns found matching your filters.
        </div>
      )}
    </section>
  )
}
