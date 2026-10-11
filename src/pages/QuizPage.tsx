
import { useState } from "react"
import { questions } from "../data/questions"
import { utsQuestions } from "../data/bank-soal/utsQuestions"
import AppLayout from "../components/AppLayout"

type View = "start" | "active" | "result"
type QuizMode = "practice" | "uts"
type Feedback = "correct" | "wrong" | "unverified"

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number | null
  explanation: string
  image?: string
  topic?: string
  verificationStatus?: "verified" | "needs_review"
}

const practiceQuestions: QuizQuestion[] = questions.map((q) => ({
  id: `practice-${q.id}`,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  explanation: q.explanation,
}))

const examQuestions: QuizQuestion[] = utsQuestions

function isScorable(q: QuizQuestion) {
  return (
    q.verificationStatus !== "needs_review" &&
    Number.isInteger(q.correctAnswer) &&
    q.correctAnswer !== null &&
    q.correctAnswer >= 0 &&
    q.correctAnswer < q.options.length
  )
}

export default function QuizPage() {
  const [view, setView] = useState<View>("start")
  const [mode, setMode] = useState<QuizMode>("practice")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<
    Record<number, Feedback>
  >({})
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [shakeCount, setShakeCount] = useState(0)

  const activeQuestions =
    mode === "uts" ? examQuestions : practiceQuestions

  const answered = answers.filter((answer) => answer !== null).length

  const scorableQuestions = activeQuestions.filter(isScorable)

  const correct = activeQuestions.reduce((total, question, index) => {
    if (
      isScorable(question) &&
      answers[index] === question.correctAnswer
    ) {
      return total + 1
    }

    return total
  }, 0)

  const score =
    scorableQuestions.length > 0
      ? Math.round((correct / scorableQuestions.length) * 100)
      : 0

  type SoundType = "correct" | "wrong" | "win" | "lose"

const playSound = (type: SoundType) => {
  if (!soundEnabled) return

  const melodies: Record<SoundType, number[]> = {
    correct: [660, 880],
    wrong: [220, 140],
    win: [523, 659, 784, 1046],
    lose: [330, 262, 196],
  }

  try {
    const audioContext = new AudioContext()
    const notes = melodies[type]
    const duration = type === "wrong" ? 0.16 : 0.14
    const startTime = audioContext.currentTime

    notes.forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator()
      const gain = audioContext.createGain()
      const noteStart = startTime + index * duration

      oscillator.type = "triangle"
      oscillator.frequency.setValueAtTime(frequency, noteStart)

      gain.gain.setValueAtTime(0.001, noteStart)
      gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.025)
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        noteStart + duration * 0.9,
      )

      oscillator.connect(gain)
      gain.connect(audioContext.destination)
      oscillator.start(noteStart)
      oscillator.stop(noteStart + duration)
    })

    window.setTimeout(
      () => void audioContext.close(),
      (notes.length * duration + 0.1) * 1000,
    )
  } catch {
    // Kuis tetap berjalan jika audio tidak didukung.
  }
}

  const startQuiz = (selectedMode: QuizMode) => {
    const selectedQuestions =
      selectedMode === "uts" ? examQuestions : practiceQuestions

    setMode(selectedMode)
    setCurrentQ(0)
    setAnswers(Array(selectedQuestions.length).fill(null))
    setFeedbackByQuestion({})
    setShakeCount(0)
    setShowConfirm(false)
    setView("active")
  }

  const handleAnswer = (optionIndex: number) => {
    const question = activeQuestions[currentQ]

    setAnswers((previous) => {
      const next = [...previous]
      next[currentQ] = optionIndex
      return next
    })

    if (!isScorable(question)) {
      setFeedbackByQuestion((previous) => ({
        ...previous,
        [currentQ]: "unverified",
      }))
      return
    }

    
if (optionIndex === question.correctAnswer) {
  setFeedbackByQuestion((previous) => ({
    ...previous,
    [currentQ]: "correct",
  }))
  playSound("correct")
} else {
  setFeedbackByQuestion((previous) => ({
    ...previous,
    [currentQ]: "wrong",
  }))
  setShakeCount((previous) => previous + 1)
  playSound("wrong")
}

  }

  
const submitQuiz = () => {
  setShowConfirm(false)
  playSound(score > 60 ? "win" : "lose")
  setView("result")
}


  const resetToStart = () => {
    setView("start")
    setCurrentQ(0)
    setAnswers([])
    setFeedbackByQuestion({})
    setShowConfirm(false)
    setShakeCount(0)
  }

  const question = activeQuestions[currentQ]
  const currentFeedback = feedbackByQuestion[currentQ]

  if (view === "start") {
    return (
      <AppLayout>
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <p className="mb-2 font-bold uppercase tracking-widest text-purple-600">
              Pusat Belajar
            </p>
            <h1 className="text-3xl font-black text-gray-900">
              Latihan Soal
            </h1>
            <p className="mt-2 text-gray-600">
              Asah pemahamanmu melalui latihan singkat atau simulasi UTS.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <button
              type="button"
              onClick={() => startQuiz("practice")}
              className="rounded-3xl border-4 border-black bg-yellow-300 p-6 text-left shadow-[8px_8px_0_#0a0a0a] transition hover:-translate-y-1"
            >
              <span className="text-4xl">📚</span>
              <h2 className="mt-4 text-2xl font-black">
                Latihan Soal
              </h2>
              <p className="mt-2 text-gray-800">
                Latihan singkat untuk menguji pemahaman materi.
              </p>
              <p className="mt-4 font-bold">
                {practiceQuestions.length} soal
              </p>
              <span className="mt-5 inline-block rounded-xl border-2 border-black bg-white px-4 py-2 font-bold">
                Mulai Latihan →
              </span>
            </button>

            <button
              type="button"
              onClick={() => startQuiz("uts")}
              className="rounded-3xl border-4 border-black bg-purple-300 p-6 text-left shadow-[8px_8px_0_#0a0a0a] transition hover:-translate-y-1"
            >
              <span className="text-4xl">📝</span>
              <h2 className="mt-4 text-2xl font-black">
                Simulasi UTS
              </h2>
              <p className="mt-2 text-gray-800">
                Kerjakan bank soal UTS dan lihat pembahasan setiap soal.
              </p>
              <p className="mt-4 font-bold">
                {examQuestions.length} soal
              </p>
              <span className="mt-5 inline-block rounded-xl border-2 border-black bg-white px-4 py-2 font-bold">
                Mulai Simulasi →
              </span>
            </button>
          </div>
        </main>
      </AppLayout>
    )
  }

  if (view === "result") {
    return (
      <AppLayout>
        <main className="mx-auto max-w-4xl px-4 py-8">
          <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_#0a0a0a]">
            <p className="font-bold uppercase tracking-widest text-purple-600">
              Hasil Kuis
            </p>
            <h1 className="mt-2 text-3xl font-black">
              {mode === "uts" ? "Hasil Simulasi UTS" : "Hasil Latihan"}
            </h1>

            <div className="my-6 rounded-2xl border-2 border-black bg-yellow-100 p-6 text-center">
              <p className="text-sm font-bold uppercase tracking-wider">
                Skor
              </p>
              <p className="text-6xl font-black">{score}</p>
              <p className="mt-2 text-gray-700">
                {correct} benar dari {scorableQuestions.length} soal yang
                dapat dinilai
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border-2 border-black p-4">
                <p className="text-sm text-gray-600">Dijawab</p>
                <p className="text-2xl font-black">
                  {answered}/{activeQuestions.length}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-black p-4">
                <p className="text-sm text-gray-600">Belum dinilai</p>
                <p className="text-2xl font-black">
                  {activeQuestions.length - scorableQuestions.length}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-black">
                Pembahasan Jawaban
              </h2>

              <div className="space-y-5">
                {activeQuestions.map((q, index) => {
                  const selected = answers[index]
                  const scorable = isScorable(q)
                  const isCorrect =
                    scorable && selected === q.correctAnswer

                  return (
                    <article
                      key={q.id}
                      className={`rounded-2xl border-2 p-4 ${
                        selected === null
                          ? "border-gray-300"
                          : !scorable
                            ? "border-amber-400 bg-amber-50"
                            : isCorrect
                              ? "border-green-500 bg-green-50"
                              : "border-red-500 bg-red-50"
                      }`}
                    >
                      <p className="font-black">
                        Soal {index + 1}
                        {selected === null
                          ? " — Belum dijawab"
                          : !scorable
                            ? " — Perlu verifikasi"
                            : isCorrect
                              ? " — Benar"
                              : " — Salah"}
                      </p>

                      <p className="mt-2 whitespace-pre-wrap">
                        {q.question}
                      </p>

                      {q.image && (
                        <img
                          src={q.image}
                          alt={`Gambar soal ${index + 1}`}
                          className="my-4 max-h-80 max-w-full rounded-xl border border-gray-200 object-contain"
                        />
                      )}

                      <div className="mt-3 space-y-2">
                        {q.options.map((option, optionIndex) => {
                          const isSelected = selected === optionIndex
                          const isAnswer =
                            scorable &&
                            q.correctAnswer === optionIndex

                          return (
                            <div
                              key={optionIndex}
                              className={`rounded-xl border p-3 ${
                                isAnswer
                                  ? "border-green-600 bg-green-100 font-bold"
                                  : isSelected
                                    ? "border-red-500 bg-red-100"
                                    : "border-gray-200 bg-white"
                              }`}
                            >
                              <span className="mr-2 font-bold">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              {option}
                              {isSelected && " — Jawabanmu"}
                              {isAnswer && " — Jawaban benar"}
                            </div>
                          )
                        })}
                      </div>

                      <div className="mt-4 rounded-xl bg-white p-3">
                        <p className="font-bold">Pembahasan</p>
                        <p className="mt-1 whitespace-pre-wrap text-gray-700">
                          {q.explanation || "Belum ada pembahasan."}
                        </p>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => startQuiz(mode)}
                className="rounded-xl border-2 border-black bg-yellow-300 px-5 py-3 font-bold hover:bg-yellow-400"
              >
                Ulangi Kuis
              </button>
              <button
                type="button"
                onClick={resetToStart}
                className="rounded-xl border-2 border-black bg-white px-5 py-3 font-bold hover:bg-gray-100"
              >
                Pilih Kuis Lain
              </button>
            </div>
          </div>
        </main>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <style>{`
        @keyframes quiz-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-7px); }
          40%, 80% { transform: translateX(7px); }
        }
      `}</style>

      <main className="mx-auto max-w-5xl px-4 py-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="rounded-xl border-2 border-black bg-white px-4 py-2 font-bold hover:bg-gray-100"
          >
            ← Keluar
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSoundEnabled((previous) => !previous)}
              aria-pressed={soundEnabled}
              className="rounded-xl border-2 border-black bg-white px-3 py-2 font-bold"
            >
              {soundEnabled ? "🔊 Suara ON" : "🔇 Suara OFF"}
            </button>
            <p className="font-bold">
              {answered}/{activeQuestions.length} dijawab
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>
              {mode === "uts" ? "Simulasi UTS" : "Latihan Soal"}
            </span>
            <span>
              Soal {currentQ + 1} dari {activeQuestions.length}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full border-2 border-black bg-white">
            <div
              className="h-full bg-purple-400 transition-all"
              style={{
                width: `${
                  ((currentQ + 1) / activeQuestions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <div
          key={`${currentQ}-${shakeCount}`}
          style={{
            animation:
              shakeCount > 0 &&
              feedbackByQuestion[currentQ] === "wrong"
                ? "quiz-shake 0.35s ease-in-out"
                : undefined,
          }}
          className="mb-6 rounded-3xl border-4 border-black bg-white p-5 shadow-[8px_8px_0_#0a0a0a] sm:p-7"
        >
          {question.topic && (
            <span className="mb-4 inline-block rounded-full border-2 border-black bg-purple-100 px-3 py-1 text-sm font-bold">
              {question.topic}
            </span>
          )}

          <h1 className="text-xl font-black leading-relaxed sm:text-2xl">
            {question.question}
          </h1>

          {question.image && (
            <img
              src={question.image}
              alt={`Gambar soal ${currentQ + 1}`}
              className="my-5 max-h-96 max-w-full rounded-xl border-2 border-gray-200 object-contain"
            />
          )}

          <div className="mt-6 space-y-3">
            {question.options.map((option, index) => {
              const selected = answers[currentQ] === index
              const isCorrectOption =
                isScorable(question) &&
                question.correctAnswer === index

              let optionStyle =
                "border-black bg-white hover:bg-gray-100"

              if (selected && currentFeedback === "correct") {
                optionStyle = "border-green-600 bg-green-100"
              } else if (selected && currentFeedback === "wrong") {
                optionStyle = "border-red-600 bg-red-100"
              } else if (selected && currentFeedback === "unverified") {
                optionStyle = "border-amber-500 bg-amber-100"
              } else if (
                currentFeedback === "wrong" &&
                isCorrectOption
              ) {
                optionStyle = "border-green-600 bg-green-100"
              }

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleAnswer(index)}
                  className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${optionStyle}`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-black font-black">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 pt-1">{option}</span>
                  {selected && currentFeedback === "correct" && (
                    <span aria-label="Benar">✓</span>
                  )}
                  {selected && currentFeedback === "wrong" && (
                    <span aria-label="Salah">✕</span>
                  )}
                </button>
              )
            })}
          </div>

          {currentFeedback && (
            <div
              aria-live="polite"
              className={`mt-6 rounded-2xl border-2 p-4 ${
                currentFeedback === "correct"
                  ? "border-green-600 bg-green-50"
                  : currentFeedback === "wrong"
                    ? "border-red-600 bg-red-50"
                    : "border-amber-500 bg-amber-50"
              }`}
            >
              <p className="text-lg font-black">
                {currentFeedback === "correct"
                  ? "✓ Jawaban benar!"
                  : currentFeedback === "wrong"
                    ? "✕ Jawaban belum tepat."
                    : "⚠ Jawaban belum dapat dinilai."}
              </p>

              {currentFeedback === "wrong" &&
                question.correctAnswer !== null && (
                  <p className="mt-2 font-bold">
                    Jawaban benar:{" "}
                    {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                )}

              <div className="mt-3">
                <p className="font-bold">Pembahasan</p>
                <p className="mt-1 whitespace-pre-wrap text-gray-700">
                  {question.explanation || "Belum ada pembahasan."}
                </p>
              </div>
            </div>
          )}

          {question.verificationStatus === "needs_review" && (
            <p className="mt-4 rounded-xl border-2 border-amber-400 bg-amber-50 p-3 text-sm text-amber-900">
              Soal ini masih perlu diverifikasi. Jawaban tidak dihitung
              dalam skor akhir.
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={currentQ === 0}
            onClick={() => setCurrentQ((previous) => previous - 1)}
            className="rounded-xl border-2 border-black bg-white px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Sebelumnya
          </button>

          {currentQ < activeQuestions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentQ((previous) => previous + 1)}
              className="rounded-xl border-2 border-black bg-yellow-300 px-5 py-3 font-bold hover:bg-yellow-400"
            >
              Berikutnya →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="rounded-xl border-2 border-black bg-green-300 px-5 py-3 font-bold hover:bg-green-400"
            >
              Selesaikan Kuis
            </button>
          )}
        </div>

        <section className="rounded-3xl border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0a0a0a]">
          <h2 className="mb-4 text-lg font-black">Daftar Nomor Soal</h2>

          <div className="grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
            {activeQuestions.map((q, index) => {
              const feedback = feedbackByQuestion[index]
              const isAnswered = answers[index] !== null
              let numberStyle = "border-black bg-white hover:bg-gray-100"

              if (feedback === "wrong") {
                numberStyle = "border-red-700 bg-red-500 text-white"
              } else if (feedback === "correct") {
                numberStyle = "border-green-700 bg-green-500 text-white"
              } else if (feedback === "unverified") {
                numberStyle = "border-amber-600 bg-amber-300"
              } else if (index === currentQ) {
                numberStyle = "border-blue-700 bg-blue-500 text-white"
              } else if (isAnswered) {
                numberStyle = "border-blue-400 bg-blue-100"
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQ(index)}
                  aria-label={`Buka soal ${index + 1}`}
                  aria-current={index === currentQ ? "step" : undefined}
                  className={`flex aspect-square items-center justify-center rounded-xl border-2 font-black transition ${numberStyle}`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-700">
            <span>🔵 Sedang dibuka / belum dinilai</span>
            <span>🟢 Benar</span>
            <span>🔴 Salah</span>
            <span>🟡 Perlu verifikasi</span>
          </div>
        </section>

        {showConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <div className="w-full max-w-md rounded-3xl border-4 border-black bg-white p-6 shadow-[8px_8px_0_#0a0a0a]">
              <h2 id="confirm-title" className="text-2xl font-black">
                Selesaikan kuis?
              </h2>
              <p className="mt-3 text-gray-700">
                Kamu sudah menjawab {answered} dari{" "}
                {activeQuestions.length} soal.
                {answered < activeQuestions.length &&
                  " Soal yang belum dijawab tetap akan dibiarkan kosong."}
              </p>

              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="rounded-xl border-2 border-black px-4 py-2 font-bold"
                >
                  Lanjutkan
                </button>
                <button
                  type="button"
                  onClick={submitQuiz}
                  className="rounded-xl border-2 border-black bg-yellow-300 px-4 py-2 font-bold"
                >
                  Ya, selesaikan
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  )
}
