import { createContext, useContext } from "react"

export type PageName =
  | "landing"
  | "login"
  | "student-dashboard"
  | "student-attendance-select"
  | "student-attendance-instructions"
  | "student-attendance-camera"
  | "student-attendance-review"
  | "student-attendance-success"
  | "student-attendance-history"
  | "student-lkp"
  | "student-materials"
  | "student-quiz"
  | "student-leaderboard"
  | "student-profile"
  | "student-erd"
  | "admin-dashboard"
  | "admin-attendance"
  | "admin-photo-verify"
  | "admin-meetings"
  | "admin-lkp"
  | "admin-materials"
  | "admin-quiz"
  | "admin-announcements"
  | "admin-settings"
  | "admin-erd"

export type Role = "student" | "admin" | null

export interface NavContextValue {
  page: PageName
  navigate: (p: PageName) => void
  role: Role
  setRole: (r: Role) => void
  selectedMeeting: number
  setSelectedMeeting: (n: number) => void
  selectedVerifyId: number | null
  setSelectedVerifyId: (n: number | null) => void
}

export const NavContext = createContext<NavContextValue>({
  page: "landing",
  navigate: () => {},
  role: null,
  setRole: () => {},
  selectedMeeting: 1,
  setSelectedMeeting: () => {},
  selectedVerifyId: null,
  setSelectedVerifyId: () => {},
})

export const useNav = () => useContext(NavContext)
