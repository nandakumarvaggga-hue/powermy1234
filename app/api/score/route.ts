import { generateText, Output } from 'ai'
import * as z from 'zod'
import { getTier, CATEGORIES, type Category } from '@/lib/types'
import { consumeScan, canScan } from '@/lib/user-store'

const scoreSchema = z.object({
  score: z.number().min(0).max(100000).describe('The overall power level score from 0 to 100000'),
  commentary: z.string().describe('A dramatic, intense, slightly arrogant one-liner commentary about the scanned image. Be meme-aware and entertaining.'),
  attributes: z.object({
    aura: z.number().min(0).max(100).describe('The overall vibe and energy emanating from the subject'),
    presence: z.number().min(0).max(100).describe('How much attention and space the subject commands'),
    energy: z.number().min(0).max(100).describe('The intensity and power radiating from the subject'),
    chaos: z.number().min(0).max(100).describe('The unpredictability and wild factor'),
    dominance: z.number().min(0).max(100).describe('How much the subject asserts control'),
  }),
  categoryAttributes: z.record(z.string(), z.number().min(0).max(100)).describe('Category-specific attributes based on the category type'),
})

export async function POST(req: Request) {
  try {
    const { image, category, description, userId = 'anonymous' } = await req.json()

    // Check if user has scans remaining
    if (!canScan(userId)) {
      return Response.json(
        { error: 'No scans remaining. Please purchase more scans.' },
        { status: 402 }
      )
    }

    const categoryConfig = CATEGORIES[category as Category] || CATEGORIES.wildcard
    const categoryName = categoryConfig.label
    const categoryAttributes = categoryConfig.attributes

    const prompt = `You are the POWERLVL Scanner - a dramatic, entertaining AI that measures the "power level" of anything in images.

Analyze this image and provide a power level score. Be dramatic, entertaining, and slightly arrogant in your commentary. Think anime power scouter meets meme culture.

Category: ${categoryName}
${description ? `User description: ${description}` : ''}

Score Guidelines:
- 0-999 (DORMANT): Weak, unremarkable, needs work
- 1,000-9,999 (SPARKING): Shows promise, early potential
- 10,000-29,999 (RISING): Above average, gaining momentum
- 30,000-59,999 (CHARGED): Impressive, radiating energy
- 60,000-84,999 (VOLATILE): Elite level, unstable power
- 85,000-99,999 (SINGULAR): Exceptional, one of a kind
- 100,000 (LIMITLESS): Perfect, beyond measurement (extremely rare)

Be generous but not too generous. Most things should score between 20,000-70,000. Reserve 85,000+ for truly exceptional things. 100,000 should almost never be given.

For the category attributes, score these specific traits (0-100 each):
${categoryAttributes.join(', ')}

Your commentary should be one punchy sentence - dramatic, entertaining, and memorable. Reference memes, anime, or internet culture when appropriate.`

    const { output } = await generateText({
      model: 'anthropic/claude-sonnet-4-20250514',
      output: Output.object({
        schema: scoreSchema,
      }),
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image', image },
          ],
        },
      ],
    })

    if (!output) {
      throw new Error('No output from AI')
    }

    // Consume a scan from the user's quota
    consumeScan(userId)

    const tier = getTier(output.score)

    return Response.json({
      score: output.score,
      tier,
      commentary: output.commentary,
      attributes: output.attributes,
      category,
      categoryAttributes: output.categoryAttributes,
    })
  } catch (error) {
    console.error('AI scoring error:', error)
    
    // Fallback to random scoring if AI fails
    const fallbackScore = Math.floor(Math.random() * 80000) + 10000
    const tier = getTier(fallbackScore)
    
    return Response.json({
      score: fallbackScore,
      tier,
      commentary: "Our AI sensors are overwhelmed. Manual power reading engaged.",
      attributes: {
        aura: Math.floor(Math.random() * 60) + 40,
        presence: Math.floor(Math.random() * 60) + 40,
        energy: Math.floor(Math.random() * 60) + 40,
        chaos: Math.floor(Math.random() * 60) + 40,
        dominance: Math.floor(Math.random() * 60) + 40,
      },
      category: 'wildcard',
      categoryAttributes: {
        aura: Math.floor(Math.random() * 60) + 40,
        presence: Math.floor(Math.random() * 60) + 40,
        energy: Math.floor(Math.random() * 60) + 40,
        chaos: Math.floor(Math.random() * 60) + 40,
      },
    })
  }
}
