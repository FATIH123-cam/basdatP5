import rawQuestions from "./uts.json"

import image014 from "../../assets/soal/uts-014.png"
import image015 from "../../assets/soal/uts-015.png"
import image016 from "../../assets/soal/uts-016.png"
import image019 from "../../assets/soal/uts-019.png"
import image027 from "../../assets/soal/uts-027.png"

const imageMap: Record<string, string> = {
  "images/uts-014.png": image014,
  "images/uts-015.png": image015,
  "images/uts-016.png": image016,
  "images/uts-019.png": image019,
  "images/uts-027.png": image027,
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
).map((q) => ({
  id: q.id,
  question: q.question,
  topic: q.topic,
  image: q.image ? imageMap[q.image] : undefined,
  options: q.options,
  correctAnswer: q.correctAnswer,
  explanation: q.explanation,
  verificationStatus: q.verificationStatus,
}))
