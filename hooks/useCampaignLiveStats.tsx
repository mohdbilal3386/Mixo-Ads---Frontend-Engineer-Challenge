'use client'

import { useEffect, useState } from 'react'
import { CampaignInsights } from '@/lib/types'
import { getCampaignInsightsStream } from '@/lib/api'

export type ConnectionStatus = 'connected' | 'reconnecting' | 'disconnected'

export function useCampaignLiveStats(
    campaignId: string,
    initialInsights: CampaignInsights
) {
    const [insights, setInsights] = useState<CampaignInsights>(initialInsights)
    const [status, setStatus] = useState<ConnectionStatus>('connected')

    useEffect(() => {
        let eventSource: EventSource

        async function init() {
            try {
                eventSource = await getCampaignInsightsStream(campaignId)

                eventSource.onopen = () => setStatus('connected')

                eventSource.onmessage = (event) => {
                    try {
                        const parsed = JSON.parse(event.data)
                        setInsights(parsed.insights ?? parsed)
                    } catch (err) {
                        console.error('Failed to parse SSE data:', err)
                    }
                }

                eventSource.onerror = () => {
                    setStatus('reconnecting')
                    eventSource.close()
                }
            } catch (err) {
                setStatus('disconnected')
                console.error('SSE init error:', err)
            }
        }

        init()

        return () => eventSource?.close()
    }, [campaignId])

    return { insights, status }
}
