'use client'

import { TimelinePoint } from '@/lib/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  timeline: TimelinePoint[]
}

export default function PerformanceChart({ timeline }: Props) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Performance Over Time
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={timeline}>
          {/* Add grid */}
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
          />

          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#000' }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  )
}
