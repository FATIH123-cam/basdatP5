import React, { createContext, useContext, useState, useEffect } from "react"
import {
  Praktikan,
  Pertemuan,
  Materi,
  LKP,
  Absensi,
  Kuis,
  KuisHasil,
  Keaktifan,
  initialPraktikanList,
  initialAsprakList,
  initialPertemuanList,
  initialMateriList,
  initialLKPList,
  generateInitialAbsensiList,
  initialKuisList,
  generateInitialKuisHasilList,
  generateInitialKeaktifanList,
} from "../data/databaseData"

interface AttendanceSummary {
  hadir: number
  izin: number
  sakit: number
  alpa: number
  totalPertemuan: number
  percentage: number
}

interface KuisSummary {
  totalKuis: number
  avgScore: number
  totalBenar: number
  totalSalah: number
}

interface KeaktifanSummary {
  totalBertanya: number
  totalMenjawab: number
  totalPoin: number
}

interface DatabaseContextValue {
  praktikanList: Praktikan[]
  asprakList: Praktikan[]
  allUsers: Praktikan[]
  pertemuanList: Pertemuan[]
  materiList: Materi[]
  lkpList: LKP[]
  absensiList: Absensi[]
  kuisList: Kuis[]
  kuisHasilList: KuisHasil[]
  keaktifanList: Keaktifan[]
  currentUser: Praktikan
  setCurrentUser: (u: Praktikan) => void

  // Auth
  login: (nimOrUsername: string, pass: string) => { success: boolean; user?: Praktikan; error?: string }
  logout: () => void
  switchUserById: (id: number) => void

  // Attendance management (Asprak)
  setStudentMeetingAttendance: (praktikanId: number, pertemuanId: number, status: Absensi["status"]) => void
  incrementAttendance: (praktikanId: number) => void
  decrementAttendance: (praktikanId: number) => void

  // Content management (Asprak)
  updateMateriLink: (pertemuanId: number, fileUrl: string | null, isOpen?: boolean) => void
  toggleMateriAccess: (pertemuanId: number) => void
  updateLKPLink: (pertemuanId: number, fileUrl: string | null, isOpen?: boolean) => void
  toggleLKPAccess: (pertemuanId: number) => void

  // Student Profile Updates
  updatePraktikanProfile: (praktikanId: number, data: Partial<Praktikan>) => void

  // Calculations
  getStudentAttendanceSummary: (praktikanId: number) => AttendanceSummary
  getStudentAbsensiList: (praktikanId: number) => (Absensi & { pertemuan: Pertemuan })[]
  getStudentKuisSummary: (praktikanId: number) => KuisSummary
  getStudentKeaktifanSummary: (praktikanId: number) => KeaktifanSummary

  // Reset
  resetDatabaseToDefault: () => void
}

const STORAGE_KEY = "dashboard_db_state_v3"

export const DatabaseContext = createContext<DatabaseContextValue | null>(null)

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [praktikanList, setPraktikanList] = useState<Praktikan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_praktikan`)
      return saved ? JSON.parse(saved) : initialPraktikanList
    } catch {
      return initialPraktikanList
    }
  })

  const [asprakList, setAsprakList] = useState<Praktikan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_asprak`)
      return saved ? JSON.parse(saved) : initialAsprakList
    } catch {
      return initialAsprakList
    }
  })

  const [pertemuanList, setPertemuanList] = useState<Pertemuan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pertemuan`)
      return saved ? JSON.parse(saved) : initialPertemuanList
    } catch {
      return initialPertemuanList
    }
  })

  const [materiList, setMateriList] = useState<Materi[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_materi`)
      return saved ? JSON.parse(saved) : initialMateriList
    } catch {
      return initialMateriList
    }
  })

  const [lkpList, setLKPList] = useState<LKP[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_lkp`)
      return saved ? JSON.parse(saved) : initialLKPList
    } catch {
      return initialLKPList
    }
  })

  const [absensiList, setAbsensiList] = useState<Absensi[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_absensi`)
      return saved ? JSON.parse(saved) : generateInitialAbsensiList()
    } catch {
      return generateInitialAbsensiList()
    }
  })

  const [kuisList] = useState<Kuis[]>(initialKuisList)

  const [kuisHasilList, setKuisHasilList] = useState<KuisHasil[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_kuis_hasil`)
      return saved ? JSON.parse(saved) : generateInitialKuisHasilList()
    } catch {
      return generateInitialKuisHasilList()
    }
  })

  const [keaktifanList, setKeaktifanList] = useState<Keaktifan[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_keaktifan`)
      return saved ? JSON.parse(saved) : generateInitialKeaktifanList()
    } catch {
      return generateInitialKeaktifanList()
    }
  })

  // Current logged in user (default: Najla, ID 1)
  const [currentUser, setCurrentUser] = useState<Praktikan>(() => {
    try {
      const savedId = localStorage.getItem(`${STORAGE_KEY}_current_user_id`)
      if (savedId) {
        const id = parseInt(savedId, 10)
        const found = [...initialPraktikanList, ...initialAsprakList].find((u) => u.id === id)
        if (found) return found
      }
    } catch {}
    return initialPraktikanList[0]
  })

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_praktikan`, JSON.stringify(praktikanList))
    } catch {}
  }, [praktikanList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_asprak`, JSON.stringify(asprakList))
    } catch {}
  }, [asprakList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pertemuan`, JSON.stringify(pertemuanList))
    } catch {}
  }, [pertemuanList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_materi`, JSON.stringify(materiList))
    } catch {}
  }, [materiList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_lkp`, JSON.stringify(lkpList))
    } catch {}
  }, [lkpList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_absensi`, JSON.stringify(absensiList))
    } catch {}
  }, [absensiList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_kuis_hasil`, JSON.stringify(kuisHasilList))
    } catch {}
  }, [kuisHasilList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_keaktifan`, JSON.stringify(keaktifanList))
    } catch {}
  }, [keaktifanList])

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_current_user_id`, currentUser.id.toString())
    } catch {}
  }, [currentUser])

  const allUsers = [...praktikanList, ...asprakList]

  // Auth handler
  const login = (nimOrUsername: string, pass: string) => {
    const trimmedUser = nimOrUsername.trim().toLowerCase()
    const trimmedPass = pass.trim()

    // 1. Check Aspraks
    const foundAsprak = asprakList.find(
      (a) =>
        a.nim.toLowerCase() === trimmedUser ||
        a.nama.toLowerCase().includes(trimmedUser) ||
        (trimmedUser === "admin" && a.nim === "admin") ||
        (trimmedUser === "fatih" && a.nim === "M0403241040") ||
        (trimmedUser === "nadine" && a.nim === "M0403241041")
    )

    if (foundAsprak) {
      if (
        foundAsprak.password === trimmedPass ||
        (trimmedUser === "admin" && trimmedPass === "admin") ||
        (foundAsprak.nim === "M0403241040" && (trimmedPass === "fatih" || trimmedPass === "fatih123")) ||
        (foundAsprak.nim === "M0403241041" && (trimmedPass === "nadine" || trimmedPass === "nadine123"))
      ) {
        setCurrentUser(foundAsprak)
        return { success: true, user: foundAsprak }
      }
    }

    // 2. Check Students
    const foundStudent = praktikanList.find(
      (s) =>
        s.nim.toLowerCase() === trimmedUser ||
        s.nama.toLowerCase().includes(trimmedUser)
    )

    if (foundStudent) {
      // Allow password match or default password = NIM
      if (foundStudent.password === trimmedPass || foundStudent.nim.toLowerCase() === trimmedPass.toLowerCase()) {
        setCurrentUser(foundStudent)
        return { success: true, user: foundStudent }
      }
    }

    // Fallback: If password was omitted or matches standard demo
    if (foundStudent && (trimmedPass === "" || trimmedPass.length >= 4)) {
      setCurrentUser(foundStudent)
      return { success: true, user: foundStudent }
    }

    return {
      success: false,
      error: "NIM / Username atau Password tidak sesuai. Silakan periksa kembali!",
    }
  }

  const logout = () => {
    // Keep user state or switch to first student
  }

  const switchUserById = (id: number) => {
    const user = allUsers.find((u) => u.id === id)
    if (user) {
      setCurrentUser(user)
    }
  }

  // Attendance management: set specific meeting status
  const setStudentMeetingAttendance = (
    praktikanId: number,
    pertemuanId: number,
    status: Absensi["status"]
  ) => {
    setAbsensiList((prev) =>
      prev.map((a) => {
        if (a.praktikan_id === praktikanId && a.pertemuan_id === pertemuanId) {
          const nowStr = new Date().toISOString().replace("T", " ").substring(0, 19)
          return {
            ...a,
            status,
            waktu_absen: status === "Hadir" ? nowStr : a.waktu_absen,
          }
        }
        return a
      })
    )
  }

  // Quick increment attendance count (adds next meeting as Hadir)
  const incrementAttendance = (praktikanId: number) => {
    setAbsensiList((prev) => {
      // find student records sorted by meeting
      const studentRecords = prev
        .filter((a) => a.praktikan_id === praktikanId)
        .sort((a, b) => a.pertemuan_id - b.pertemuan_id)

      // Find first record that is not Hadir
      const nextNotHadir = studentRecords.find((a) => a.status !== "Hadir")
      if (!nextNotHadir) return prev // already all hadir

      const nowStr = new Date().toISOString().replace("T", " ").substring(0, 19)
      return prev.map((a) => {
        if (a.praktikan_id === praktikanId && a.pertemuan_id === nextNotHadir.pertemuan_id) {
          return { ...a, status: "Hadir", waktu_absen: nowStr }
        }
        return a
      })
    })
  }

  // Quick decrement attendance count (removes latest Hadir)
  const decrementAttendance = (praktikanId: number) => {
    setAbsensiList((prev) => {
      const studentRecords = prev
        .filter((a) => a.praktikan_id === praktikanId)
        .sort((a, b) => b.pertemuan_id - a.pertemuan_id) // descending

      // Find the highest meeting with status Hadir
      const latestHadir = studentRecords.find((a) => a.status === "Hadir")
      if (!latestHadir) return prev // already 0 hadir

      return prev.map((a) => {
        if (a.praktikan_id === praktikanId && a.pertemuan_id === latestHadir.pertemuan_id) {
          return { ...a, status: "Alpa", waktu_absen: "-" }
        }
        return a
      })
    })
  }

  // Materi Link & Access
  const updateMateriLink = (pertemuanId: number, fileUrl: string | null, isOpen?: boolean) => {
    setMateriList((prev) =>
      prev.map((m) => {
        if (m.pertemuan_id === pertemuanId) {
          return {
            ...m,
            file_url: fileUrl,
            is_open: isOpen !== undefined ? isOpen : (fileUrl ? m.is_open : false),
          }
        }
        return m
      })
    )
  }

  const toggleMateriAccess = (pertemuanId: number) => {
    setMateriList((prev) =>
      prev.map((m) => {
        if (m.pertemuan_id === pertemuanId) {
          return { ...m, is_open: !m.is_open }
        }
        return m
      })
    )
  }

  // LKP Link & Access
  const updateLKPLink = (pertemuanId: number, fileUrl: string | null, isOpen?: boolean) => {
    setLKPList((prev) =>
      prev.map((l) => {
        if (l.pertemuan_id === pertemuanId) {
          return {
            ...l,
            file_url: fileUrl,
            is_open: isOpen !== undefined ? isOpen : (fileUrl ? l.is_open : false),
          }
        }
        return l
      })
    )
  }

  const toggleLKPAccess = (pertemuanId: number) => {
    setLKPList((prev) =>
      prev.map((l) => {
        if (l.pertemuan_id === pertemuanId) {
          return { ...l, is_open: !l.is_open }
        }
        return l
      })
    )
  }

  // Update profile
  const updatePraktikanProfile = (praktikanId: number, data: Partial<Praktikan>) => {
    setPraktikanList((prev) =>
      prev.map((s) => (s.id === praktikanId ? { ...s, ...data } : s))
    )
    if (currentUser.id === praktikanId) {
      setCurrentUser((prev) => ({ ...prev, ...data }))
    }
  }

  // Calculations
  const getStudentAttendanceSummary = (praktikanId: number): AttendanceSummary => {
    const list = absensiList.filter((a) => a.praktikan_id === praktikanId)
    const hadir = list.filter((a) => a.status === "Hadir").length
    const izin = list.filter((a) => a.status === "Izin").length
    const sakit = list.filter((a) => a.status === "Sakit").length
    const alpa = list.filter((a) => a.status === "Alpa").length
    const totalPertemuan = pertemuanList.length || 14
    const percentage = Math.round((hadir / totalPertemuan) * 100)

    return { hadir, izin, sakit, alpa, totalPertemuan, percentage }
  }

  const getStudentAbsensiList = (praktikanId: number) => {
    const list = absensiList.filter((a) => a.praktikan_id === praktikanId)
    return list.map((a) => ({
      ...a,
      pertemuan: pertemuanList.find((p) => p.id === a.pertemuan_id) || {
        id: a.pertemuan_id,
        minggu_ke: a.pertemuan_id,
        topik_pertemuan: `Pertemuan ${a.pertemuan_id}`,
        waktu_buka_akses: null,
        date: `2026-09-${a.pertemuan_id * 7}`,
        title: `Pertemuan ${a.pertemuan_id}`,
      },
    }))
  }

  const getStudentKuisSummary = (praktikanId: number): KuisSummary => {
    const attempts = kuisHasilList.filter((k) => k.praktikan_id === praktikanId)
    if (attempts.length === 0) {
      return { totalKuis: 0, avgScore: 0, totalBenar: 0, totalSalah: 0 }
    }
    const sumScore = attempts.reduce((acc, cur) => acc + cur.skor, 0)
    const sumBenar = attempts.reduce((acc, cur) => acc + cur.jumlah_benar, 0)
    const sumSalah = attempts.reduce((acc, cur) => acc + cur.jumlah_salah, 0)
    return {
      totalKuis: attempts.length,
      avgScore: Math.round(sumScore / attempts.length),
      totalBenar: sumBenar,
      totalSalah: sumSalah,
    }
  }

  const getStudentKeaktifanSummary = (praktikanId: number): KeaktifanSummary => {
    const records = keaktifanList.filter((k) => k.praktikan_id === praktikanId)
    const totalBertanya = records.reduce((acc, cur) => acc + cur.jumlah_bertanya, 0)
    const totalMenjawab = records.reduce((acc, cur) => acc + cur.jumlah_menjawab, 0)
    const totalPoin = totalBertanya * 10 + totalMenjawab * 15
    return { totalBertanya, totalMenjawab, totalPoin }
  }

  const resetDatabaseToDefault = () => {
    localStorage.clear()
    setPraktikanList(initialPraktikanList)
    setAsprakList(initialAsprakList)
    setPertemuanList(initialPertemuanList)
    setMateriList(initialMateriList)
    setLKPList(initialLKPList)
    setAbsensiList(generateInitialAbsensiList())
    setKuisHasilList(generateInitialKuisHasilList())
    setKeaktifanList(generateInitialKeaktifanList())
    setCurrentUser(initialPraktikanList[0])
  }

  return (
    <DatabaseContext.Provider
      value={{
        praktikanList,
        asprakList,
        allUsers,
        pertemuanList,
        materiList,
        lkpList,
        absensiList,
        kuisList,
        kuisHasilList,
        keaktifanList,
        currentUser,
        setCurrentUser,
        login,
        logout,
        switchUserById,
        setStudentMeetingAttendance,
        incrementAttendance,
        decrementAttendance,
        updateMateriLink,
        toggleMateriAccess,
        updateLKPLink,
        toggleLKPAccess,
        updatePraktikanProfile,
        getStudentAttendanceSummary,
        getStudentAbsensiList,
        getStudentKuisSummary,
        getStudentKeaktifanSummary,
        resetDatabaseToDefault,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext)
  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider")
  }
  return context
}
