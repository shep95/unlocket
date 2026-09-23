'use client'

import dynamic from 'next/dynamic'

const IDELayout = dynamic(() => import('@/components/ide/IDELayout'), { ssr: false })

export default function IDEPage() {
  return <IDELayout />
}
