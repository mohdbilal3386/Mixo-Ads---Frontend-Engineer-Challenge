// app/page.tsx

import DashboardClient from "@/components/DashboardClient"
import { getDashboardData } from "@/lib/api"

export default async function Page() {
  const data = await getDashboardData()

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Campaign Monitoring Dashboard
        </h1>

        <DashboardClient data={data} />
      </div>
    </main>
  )
}
