"use client"

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

function ErrorContent() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'An unknown error occurred'
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] text-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
        <p className="mb-8 text-gray-300">{message}</p>
        <Button 
          onClick={() => router.push('/')}
          className="bg-green-600 hover:bg-green-700"
        >
          Return Home
        </Button>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(260,20%,6%)] via-[hsl(260,22%,8%)] to-[hsl(260,20%,6%)] text-white p-4">
        <div className="max-w-md text-center">
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
