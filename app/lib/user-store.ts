// Simple in-memory store for demo purposes
// In production, you'd use a database like Supabase

import { FREE_SCANS } from './products'

interface UserData {
  scansRemaining: number
  totalScans: number
  hasUnlimited: boolean
  unlimitedExpiry?: Date
}

// In-memory store (resets on server restart)
// For production, use a database
const userStore = new Map<string, UserData>()

export function getUserData(userId: string): UserData {
  if (!userStore.has(userId)) {
    userStore.set(userId, {
      scansRemaining: FREE_SCANS,
      totalScans: 0,
      hasUnlimited: false,
    })
  }
  
  const data = userStore.get(userId)!
  
  // Check if unlimited has expired
  if (data.hasUnlimited && data.unlimitedExpiry && new Date() > data.unlimitedExpiry) {
    data.hasUnlimited = false
    data.unlimitedExpiry = undefined
  }
  
  return data
}

export function consumeScan(userId: string): boolean {
  const data = getUserData(userId)
  
  if (data.hasUnlimited) {
    data.totalScans++
    return true
  }
  
  if (data.scansRemaining > 0) {
    data.scansRemaining--
    data.totalScans++
    return true
  }
  
  return false
}

export function addScans(userId: string, amount: number, isUnlimited = false): void {
  const data = getUserData(userId)
  
  if (isUnlimited) {
    data.hasUnlimited = true
    // Set unlimited to expire in 30 days
    data.unlimitedExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  } else {
    data.scansRemaining += amount
  }
}

export function canScan(userId: string): boolean {
  const data = getUserData(userId)
  return data.hasUnlimited || data.scansRemaining > 0
}
