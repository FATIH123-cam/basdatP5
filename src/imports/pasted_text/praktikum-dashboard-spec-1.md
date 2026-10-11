# Build a Complete Practicum Dashboard Web App

Design and build a modern, responsive, high-fidelity web application for a private university practicum class. The platform is called **Praktikum Ilkom** and is intended for students, practicum assistants (asprak), and administrators.

This is a frontend prototype with realistic mock data. Focus on creating a polished, consistent, interactive UI with connected pages and working navigation. Do not implement a real backend, authentication service, or actual camera upload yet.

## 1. Design Direction

Create a clean, modern academic dashboard inspired by Notion, Linear, and contemporary education platforms.

* Primary colors: deep indigo, royal purple, white, and soft lavender.
* Use a clean sans-serif font such as Inter.
* Use rounded cards, subtle borders, soft shadows, and generous spacing.
* Use a professional but friendly visual style suitable for university students.
* Use a responsive layout for desktop, tablet, and mobile.
* Use a fixed left sidebar on desktop and a collapsible navigation menu on mobile.
* Include a consistent top navigation bar with page title, notifications, and user profile.
* Use Indonesian language throughout the interface.
* Create realistic Indonesian student names, NIMs, practicum meeting numbers, LKP titles, and quiz data.
* Avoid excessive gradients, clutter, unnecessary animations, and overly decorative elements.

## 2. Landing Page

Create a visually impressive public landing page for Praktikum Ilkom.

### Hero section

* Large, full-width hero image of a modern Indonesian university campus or computer science laboratory.
* The image must be easy to replace later. Use a clearly defined image component or placeholder asset.
* Add a dark overlay so the text remains readable.
* Main headline: "Selamat Datang di Praktikum Ilkom"
* Supporting text: "Satu ruang untuk absensi, LKP, materi, latihan soal, dan perkembangan belajarmu."
* Primary CTA: "Masuk ke Dashboard"
* Secondary CTA: "Lihat Fitur"

### Additional sections

1. Overview of the platform's features.
2. Three or four feature cards:

   * Absensi Praktikum
   * LKP dan Materi
   * Latihan Soal
   * Papan Peringkat
3. A short "Cara Kerja" section showing the student workflow.
4. Footer containing the practicum class name, navigation links, and contact information.

Create a visually appealing layout with a large hero image and a strong visual hierarchy.

## 3. Login Page

Create a dedicated login page with a centered authentication card.

Fields:

* Email Kampus
* Password (NIM)

Additional UI:

* Show/hide password toggle.
* "Ingat saya" checkbox.
* Login button.
* Validation and error-state examples.
* Link to contact the practicum assistant if the student has trouble logging in.
* Optional demo-account selector for the prototype so different user roles can be previewed.

For this prototype, treat the campus email and NIM as mock credentials only. Do not build real authentication or expose real student credentials.

## 4. Student Dashboard

After login, display the main student dashboard.

Sidebar navigation:

* Beranda
* Absen Praktikum
* LKP
* Materi & Rangkuman
* Latihan Soal
* Daftar Absen
* Profil
* Keluar

Dashboard content:

* Greeting: "Halo, [Nama Mahasiswa] 👋"
* Short motivational message.
* Summary cards:

  * Pertemuan Berikutnya
  * Kehadiran
  * LKP Terbaru
  * Skor Latihan
* A prominent "Absen Sekarang" card for the current practicum meeting.
* Practicum schedule and meeting status.
* Recent LKP and learning materials.
* Announcements from the practicum assistants.
* Progress overview for attendance and quiz scores.

Use realistic sample data and make the cards clickable to their respective pages.

## 5. Attendance System — Student Flow

Create a complete multi-step attendance UI.

### Attendance meeting selection

The student can select a meeting from a list or dropdown:

* Pertemuan 1
* Pertemuan 2
* Pertemuan 3
* and so on.

Each meeting should show:

* Date
* Practicum topic
* Attendance status
* Whether photo submission is required or completed

### Photo attendance instructions

Create a friendly, visually clear interface explaining that the student must take three photos with different expressions.

The three poses are:

1. "Muka Jelek"
2. "Muka Kaget"
3. "Senyum Jahat"

Display the three pose instructions as cards with simple illustrative icons or mock face illustrations. Make the design playful but still appropriate for an academic platform.

### Camera capture interface

Create a camera-style screen with:

* Large camera preview area using a mock camera frame or placeholder.
* Camera permission state.
* Current pose instruction.
* Capture button.
* Photo counter: "Foto 1 dari 3".
* Progress indicator.
* Retake button.
* Next button.
* Clear instructions for the student.

The three photos should be captured sequentially. Use mock image placeholders or sample assets for the prototype. Do not implement actual camera access yet.

### Photo review

After all three photos are taken, display:

* Three photo previews.
* Labels for each pose.
* Retake individual photo option.
* "Unduh Semua Foto" button.
* "Kirim ke Asprak" button.
* A note explaining that the photos will be submitted to the practicum assistants.

### Submission confirmation

Create a success screen showing:

* "Absensi Berhasil Dikirim!"
* Meeting number.
* Submission timestamp.
* Three submitted photo thumbnails.
* Attendance status: "Menunggu Verifikasi" or "Terkirim".
* Button to return to dashboard.

## 6. Admin Dashboard — Practicum Assistants

Create a separate admin interface for the user and fellow practicum assistants.

The admin dashboard should have a slightly more data-oriented appearance while preserving the same visual design system.

Admin sidebar:

* Dashboard
* Data Mahasiswa
* Daftar Absensi
* Verifikasi Foto
* Kelola Pertemuan
* Kelola LKP
* Kelola Materi
* Kelola Latihan Soal
* Pengumuman
* Pengaturan

Admin dashboard content:

* Total mahasiswa.
* Total mahasiswa yang sudah absen.
* Total mahasiswa yang belum absen.
* Pending photo submissions.
* Average attendance percentage.
* Recent activity.
* Quick actions for creating a new meeting or reviewing submissions.

### Attendance management

Create a table with:

* Nama Mahasiswa
* NIM
* Email Kampus
* Pertemuan
* Waktu Submit
* Status
* Foto
* Action

Features:

* Search by name or NIM.
* Filter by meeting.
* Filter by attendance status.
* View photo submission.
* Verify or reject a submission.
* Add a rejection reason.
* Export/download photo submissions as a prototype action.
* Empty state and loading state.

### Photo verification page

Create a detailed verification screen with:

* Student identity.
* Meeting information.
* Three submitted photos.
* Pose labels.
* Submission time.
* Buttons: "Terima", "Tolak", and "Minta Kirim Ulang".
* Status badge.
* Notes or comments section.

Use mock data to demonstrate pending, approved, rejected, and resubmission states.

## 7. LKP Page

Create a learning-resource page where students can access LKP (Lembar Kerja Praktikum).

Include:

* Tabs: "Sebelum Praktikum" and "Setelah Praktikum".
* List or card layout of LKP documents.
* Meeting number.
* LKP title.
* Description.
* File type and file size.
* Publication date.
* Download button.
* Read/view button.
* Completion status.

Example titles:

* LKP 1 — Pengenalan Lingkungan Pemrograman
* LKP 2 — Dasar Pemrograman
* LKP 3 — Struktur Data

Create a document preview modal or detail page for viewing an LKP.

## 8. Materi & Rangkuman

Create a page for learning materials and summaries.

Include:

* Meeting-based material cards.
* Topic title.
* Short summary.
* Learning objectives.
* Key concepts.
* Download material button.
* Read summary button.
* Search and category filters.
* Completion indicator.

Create a detail page for each material with a clean reading layout, headings, bullet points, code snippets, and examples relevant to computer science practicum.

## 9. Latihan Soal

Create an interactive quiz page.

Features:

* Quiz list organized by practicum meeting.
* Difficulty labels: Mudah, Sedang, Sulit.
* Number of questions.
* Estimated duration.
* Start quiz button.
* Progress indicator.
* Multiple-choice questions.
* Next and previous navigation.
* Submit quiz confirmation.
* Score result screen.
* Correct and incorrect answer review.
* Explanation for each answer.
* Retry quiz button.

Use realistic computer science questions and sample answer options.

## 10. Leaderboard and Student Progress

Create a leaderboard section accessible from the Latihan Soal page or as a dedicated tab.

Display:

* Student ranking.
* Student name.
* Avatar.
* Total score.
* Number of completed quizzes.
* Rank change indicator.
* Current user's highlighted row.

Add a personal progress section with:

* Average quiz score.
* Completed materials.
* Attendance percentage.
* Quiz completion rate.
* Weekly learning activity.

Use mock student data. Make it clear that the leaderboard is based on quiz performance, not physical appearance or attendance.

## 11. Attendance History

Create a "Daftar Absen" page where students can see their own attendance history.

Include:

* Total meetings.
* Present count.
* Absent count.
* Pending verification count.
* Unsubmitted photo count.
* Attendance percentage.
* Meeting-by-meeting table.
* Date.
* Topic.
* Status: Hadir, Tidak Hadir, Menunggu Verifikasi, Foto Belum Submit.
* View submission details button.

Create clear empty states and status badges.

## 12. Profile Page

Create a student profile page with:

* Profile avatar.
* Full name.
* NIM.
* Campus email.
* Class information.
* Attendance summary.
* Quiz summary.
* Edit profile UI.
* Change password UI as a visual prototype only.

## 13. Navigation and Interaction Requirements

Make the prototype feel like a real connected web application.

* All sidebar items must navigate to the correct page.
* CTA buttons must work.
* Tabs must switch content.
* Search and filter controls should update the displayed mock data.
* Attendance meeting selection should update the displayed meeting information.
* The photo workflow should move through the three capture steps.
* Retake buttons should return to the appropriate photo step.
* Photo review should display the three mock photos.
* The submit button should lead to a success state.
* Quiz navigation and result screens should work with mock questions.
* Use modals for confirmations and detailed views where appropriate.
* Provide hover, focus, loading, empty, error, and success states.

## 14. Technical and Component Structure

Use React with TypeScript and a reusable component architecture suitable for future integration with a Laravel backend.

Suggested components:

* AppLayout
* Sidebar
* Topbar
* StatCard
* AttendanceCard
* MeetingSelector
* CameraCapture
* PhotoReview
* StatusBadge
* DataTable
* MaterialCard
* LKPCard
* QuizCard
* LeaderboardTable
* Modal
* EmptyState

Organize the prototype so student and admin pages can share reusable components but have separate navigation and permissions in the future.

Use mock data and local UI state. Do not create a real database or backend integration yet.

## 15. Final Deliverable

Generate a complete, polished, multi-page practicum dashboard prototype with:

1. Landing Page
2. Login Page
3. Student Dashboard
4. Attendance Meeting Selection
5. Camera Attendance Flow
6. Photo Review
7. Submission Success
8. Attendance History
9. LKP Page
10. Material & Summary Page
11. Quiz Page
12. Quiz Results
13. Leaderboard
14. Student Profile
15. Admin Dashboard
16. Admin Attendance Management
17. Photo Verification Page
18. Admin Content Management Pages

Prioritize visual consistency, responsive design, realistic mock data, clear user flows, and a professional academic experience. The landing page hero image must be replaceable later.
