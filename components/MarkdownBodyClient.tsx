'use client'

import dynamic from 'next/dynamic'

export const MarkdownBody = dynamic(() => import('@/components/MarkdownBody').then(mod => ({ default: mod.MarkdownBody })), { ssr: false })
