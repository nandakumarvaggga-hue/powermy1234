export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  scans: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'scan-pack-20',
    name: '20 Power Scans',
    description: 'Unlock 20 additional scans to measure your dominance',
    priceInCents: 500, // $5.00
    scans: 20,
  },
  {
    id: 'scan-pack-50',
    name: '50 Power Scans',
    description: 'Best value - 50 scans to dominate the leaderboard',
    priceInCents: 999, // $9.99
    scans: 50,
  },
  {
    id: 'scan-pack-unlimited',
    name: 'Unlimited Scans (Monthly)',
    description: 'Unlimited scanning power for true power seekers',
    priceInCents: 1999, // $19.99
    scans: -1, // -1 represents unlimited
  },
]

export const FREE_SCANS = 3

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === productId)
}
