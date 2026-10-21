import { useState } from "react";
import { NavContext, PageName, Role } from "./context";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AttendancePage from "./pages/AttendancePage";
import AttendanceHistoryPage from "./pages/AttendanceHistoryPage";
import LKPPage from "./pages/LKPPage";
import MaterialsPage from "./pages/MaterialsPage";
import QuizPage from "./pages/QuizPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProfilePage from "./pages/ProfilePage";
import ERDBuilderPage from "./pages/ERDBuilderPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAttendancePage from "./pages/AdminAttendancePage";
import PhotoVerificationPage from "./pages/PhotoVerificationPage";
import AdminContentPage from "./pages/AdminContentPage";

import GlobalMusicPlayer from "./components/GlobalMusicPlayer";
import { DatabaseProvider } from "./context/DatabaseContext";

const attendancePages: PageName[] = [
  "student-attendance-select",
  "student-attendance-instructions",
  "student-attendance-camera",
  "student-attendance-review",
  "student-attendance-success",
];

const adminContentPages: PageName[] = [
  "admin-meetings",
  "admin-lkp",
  "admin-materials",
  "admin-quiz",
  "admin-announcements",
  "admin-settings",
];

function PageRouter({ page }: { page: PageName }) {
  if (page === "landing") return <LandingPage />;
  if (page === "login") return <LoginPage />;

  // Student pages
  if (page === "student-dashboard") return <StudentDashboard />;
  if (attendancePages.includes(page)) return <AttendancePage />;
  if (page === "student-attendance-history")
    return <AttendanceHistoryPage />;
  if (page === "student-lkp") return <LKPPage />;
  if (page === "student-materials") return <MaterialsPage />;
  if (page === "student-quiz") return <QuizPage />;
  if (page === "student-leaderboard") return <LeaderboardPage />;
  if (page === "student-profile") return <ProfilePage />;
  if (page === "student-erd") return <ERDBuilderPage />;

  // Admin pages
  if (page === "admin-dashboard") return <AdminDashboard />;
  if (page === "admin-attendance") return <AdminAttendancePage />;
  if (page === "admin-photo-verify") return <PhotoVerificationPage />;
  if (page === "admin-erd") return <ERDBuilderPage />;
  if (adminContentPages.includes(page)) return <AdminContentPage />;

  return <LandingPage />;
}

export default function App() {
  const [page, setPage] = useState<PageName>("landing");
  const [role, setRole] = useState<Role>(null);
  const [selectedMeeting, setSelectedMeeting] = useState(1);
  const [selectedVerifyId, setSelectedVerifyId] =
    useState<number | null>(null);

  return (
    <DatabaseProvider>
      <NavContext.Provider
        value={{
          page,
          navigate: setPage,
          role,
          setRole,
          selectedMeeting,
          setSelectedMeeting,
          selectedVerifyId,
          setSelectedVerifyId,
        }}
      >
        <GlobalMusicPlayer />
        <PageRouter page={page} />
      </NavContext.Provider>
    </DatabaseProvider>
  );
}
