import { getUserData } from '@/lib/user-store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId') || 'anonymous'
  
  const userData = getUserData(userId)
  
  return Response.json({
    scansRemaining: userData.hasUnlimited ? -1 : userData.scansRemaining,
    totalScans: userData.totalScans,
    hasUnlimited: userData.hasUnlimited,
    unlimitedExpiry: userData.unlimitedExpiry?.toISOString(),
  })
}
