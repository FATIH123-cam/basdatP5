
import rawQuestions from "./uts.json"

const imageModules = import.meta.glob<string>(
  "../../assets/soal/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
)

const imageMap: Record<string, string> = {}

for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split("/").pop()

  if (filename) {
    imageMap[filename] = url
  }
}

interface RawUTSQuestion {
  id: string
  year: number | null
  originalNumber: number
  question: string
  topic: string
  image: string | null
  options: string[]
  correctAnswer: number | null
  explanation: string
  verificationStatus: "verified" | "needs_review"
}

export interface UTSQuestion {
  id: string
  question: string
  topic: string
  image?: string
  options: string[]
  correctAnswer: number | null
  explanation: string
  verificationStatus: "verified" | "needs_review"
}

export const utsQuestions: UTSQuestion[] = (
  rawQuestions as RawUTSQuestion[]
).map((q) => {
  const filename = q.image?.split("/").pop()
  const image = filename ? imageMap[filename] : undefined

  if (q.image && !image) {
    console.warn(`Gambar tidak ditemukan untuk soal ${q.id}: ${q.image}`)
  }

  return {
    id: q.id,
    question: q.question,
    topic: q.topic,
    image,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    verificationStatus: q.verificationStatus,
  }
})
