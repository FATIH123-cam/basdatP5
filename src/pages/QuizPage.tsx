import { useState } from "react"
import { questions } from "../data/questions"
import AppLayout from "../components/AppLayout"

type View = "start" | "active" | "result"

export default function QuizPage() {
  const [view, setView] = useState<View>("start")
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  )
  const [showConfirm, setShowConfirm] = useState(false)

  const startQuiz = () => {
    setCurrentQ(0)
    setAnswers(new Array(questions.length).fill(null))
    setView("active")
  }

  const submitQuiz = () => {
    setShowConfirm(false)
    setView("result")
  }

  const score = Math.round(
    (answers.filter((a, i) => a === questions[i].correctAnswer).length /
      questions.length) *
      100,
  )
  const correct = answers.filter(
    (a, i) => a === questions[i].correctAnswer,
  ).length

  if (view === "active") {
    const q = questions[currentQ]
    const answered = answers.filter((a) => a !== null).length

    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setView("start")}
            className="comic-btn text-xs py-1.5 px-3 bg-white text-black border-2 border-black"
          >
            ← Batal
          </button>
          <span className="text-sm font-bold bg-[#FFE033] px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0_#0a0a0a]">
            {answered}/{questions.length} dijawab
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-4 bg-white rounded-full mb-6 overflow-hidden border-2 border-black shadow-[2px_2px_0_#0a0a0a]">
          <div
            className="h-full bg-blue-500 rounded-full transition-all"
            style={{
              width: `${((currentQ + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0_#0a0a0a] p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-white bg-blue-600 px-3 py-1 rounded-full border-2 border-black">
              Soal {currentQ + 1}
            </span>
          </div>
          <p className="text-xl font-bold text-black mb-6">
            {q.question}
          </p>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const next = [...answers]
                  next[currentQ] = i
                  setAnswers(next)
                }}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-bold transition-all
                  ${
                    answers[currentQ] === i
                      ? "border-black bg-[#FFE033] text-black shadow-[4px_4px_0_#0a0a0a]"
                      : "border-black hover:bg-gray-100 text-slate-700 shadow-[2px_2px_0_#0a0a0a]"
                  }`}
              >
                <span className="font-black mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="flex-1 border-2 border-black bg-white text-black font-bold py-3 rounded-xl shadow-[4px_4px_0_#0a0a0a] disabled:opacity-50 transition-transform active:translate-y-1 active:shadow-[0_0_0_#0a0a0a]"
          >
            ← Sebelumnya
          </button>
          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="flex-1 bg-blue-600 border-2 border-black text-white font-bold py-3 rounded-xl shadow-[4px_4px_0_#0a0a0a] transition-transform active:translate-y-1 active:shadow-[0_0_0_#0a0a0a]"
            >
              Selanjutnya →
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 bg-emerald-500 border-2 border-black text-black font-bold py-3 rounded-xl shadow-[4px_4px_0_#0a0a0a] transition-transform active:translate-y-1 active:shadow-[0_0_0_#0a0a0a]"
            >
              Kumpulkan
            </button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-2 mt-8 justify-center">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQ(i)}
              className={`w-10 h-10 rounded-xl border-2 border-black text-sm font-bold transition-all shadow-[2px_2px_0_#0a0a0a]
                ${
                  i === currentQ
                    ? "bg-blue-600 text-white translate-y-1 shadow-[0_0_0_#0a0a0a]"
                    : answers[i] !== null
                      ? "bg-emerald-400 text-black"
                      : "bg-white text-slate-500"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-4 border-black rounded-3xl p-6 max-w-sm w-full shadow-[8px_8px_0_#0a0a0a]">
              <h3 className="font-black text-2xl uppercase mb-2" style={{ fontFamily: "'Bangers', cursive" }}>
                Kumpulkan Quiz?
              </h3>
              <p className="text-sm font-bold text-slate-700 mb-6">
                {answered < questions.length
                  ? `Masih ada ${questions.length - answered} soal yang belum dijawab. Yakin ingin mengumpulkan?`
                  : "Semua soal sudah dijawab. Yakin ingin mengumpulkan?"}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white border-2 border-black py-2.5 rounded-xl font-bold text-black shadow-[4px_4px_0_#0a0a0a] hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  onClick={submitQuiz}
                  className="flex-1 bg-emerald-500 border-2 border-black text-black py-2.5 rounded-xl font-bold shadow-[4px_4px_0_#0a0a0a] hover:bg-emerald-400"
                >
                  Ya, Kumpulkan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </AppLayout>
    )
  }

  if (view === "result") {
    return (
      <AppLayout>
        <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0_#0a0a0a]">
          <div
            className={`w-32 h-32 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-6 text-5xl font-black shadow-[4px_4px_0_#0a0a0a]
            ${
              score >= 80
                ? "bg-emerald-400 text-black"
                : score >= 60
                  ? "bg-[#FFE033] text-black"
                  : "bg-red-500 text-white"
            }`}
          >
            {score}
          </div>
          <h2 className="text-3xl font-black uppercase mb-2" style={{ fontFamily: "'Bangers', cursive" }}>
            {score >= 80
              ? "🎉 Luar biasa!"
              : score >= 60
                ? "👍 Cukup baik!"
                : "📚 Perlu belajar lagi!"}
          </h2>
          <p className="text-slate-700 font-bold">
            Kamu menjawab {correct} dari {questions.length} soal dengan benar!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { l: "Benar", v: correct, c: "bg-emerald-400" },
            {
              l: "Salah",
              v: questions.length - correct,
              c: "bg-red-500 text-white",
            },
            { l: "Total Soal", v: questions.length, c: "bg-blue-400" },
          ].map((s) => (
            <div
              key={s.l}
              className={`rounded-2xl border-4 border-black shadow-[4px_4px_0_#0a0a0a] p-4 text-center ${s.c}`}
            >
              <p className="text-3xl font-black">{s.v}</p>
              <p className="text-sm font-bold mt-1">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Review answers */}
        <div className="space-y-6 mb-8">
          <h3 className="text-2xl font-black uppercase" style={{ fontFamily: "'Bangers', cursive" }}>Pembahasan</h3>
          {questions.map((q, i) => {
            const userAns = answers[i]
            const isCorrect = userAns === q.correctAnswer
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border-4 border-black shadow-[6px_6px_0_#0a0a0a] p-5"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 text-sm font-black shadow-[2px_2px_0_#0a0a0a]
                    ${
                      isCorrect
                        ? "bg-emerald-400 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </div>
                  <p className="text-lg font-bold text-black mt-1">
                    {q.question}
                  </p>
                </div>
                <div className="space-y-2 ml-11">
                  {q.options.map((opt, j) => (
                    <div
                      key={j}
                      className={`text-sm px-4 py-2 rounded-xl font-bold border-2 border-black
                      ${
                        j === q.correctAnswer
                          ? "bg-emerald-300 text-black"
                          : j === userAns && !isCorrect
                            ? "bg-red-300 text-black"
                            : "bg-gray-50 text-slate-600"
                      }`}
                    >
                      {String.fromCharCode(65 + j)}. {opt}
                    </div>
                  ))}
                </div>
                <div className="ml-11 mt-4 text-sm font-bold text-black bg-[#FFE033] border-2 border-black shadow-[2px_2px_0_#0a0a0a] rounded-xl px-4 py-3">
                  💡 Pembahasan:<br/>
                  {q.explanation}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-4">
          <button
            onClick={startQuiz}
            className="flex-1 border-4 border-black bg-white text-black font-black py-4 rounded-2xl shadow-[6px_6px_0_#0a0a0a] hover:bg-gray-100 uppercase transition-transform active:translate-y-1 active:shadow-[0_0_0_#0a0a0a]"
          >
            Ulangi Latihan
          </button>
          <button
            onClick={() => setView("start")}
            className="flex-1 bg-blue-600 border-4 border-black text-white font-black py-4 rounded-2xl shadow-[6px_6px_0_#0a0a0a] hover:bg-blue-700 uppercase transition-transform active:translate-y-1 active:shadow-[0_0_0_#0a0a0a]"
          >
            Selesai
          </button>
        </div>
      </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[#FFE033] p-8 rounded-3xl border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a]">
        <h2 className="text-4xl font-black uppercase mb-2" style={{ fontFamily: "'Bangers', cursive" }}>Latihan Soal</h2>
        <p className="font-bold text-slate-800 text-lg">
          Uji pemahamanmu tentang materi Praktikum Basdat! 
          <br />Jawab soal-soal ini untuk persiapan tes atau sekedar review.
        </p>
      </div>

      <div className="bg-white rounded-3xl border-[4px] border-[#0a0a0a] shadow-[8px_8px_0_#0a0a0a] p-8 text-center space-y-6">
        <div className="text-6xl animate-bounce mt-4">🧠</div>
        <h3 className="text-2xl font-black uppercase" style={{ fontFamily: "'Bangers', cursive" }}>
          Siap Untuk Memulai?
        </h3>
        <p className="font-bold text-slate-600">
          Ada {questions.length} soal pilihan ganda. Di akhir latihan, kamu bisa melihat skor dan pembahasan untuk setiap soal.
        </p>
        <button
          onClick={startQuiz}
          className="w-full sm:w-auto mt-4 px-10 py-4 bg-emerald-400 border-[4px] border-[#0a0a0a] rounded-2xl text-xl font-black uppercase shadow-[6px_6px_0_#0a0a0a] transition-transform active:translate-y-2 active:shadow-[0_0_0_#0a0a0a] hover:bg-emerald-300"
        >
          🚀 Gas Mulai Latihan!
        </button>
      </div>
    </div>
    </AppLayout>
  )
}
