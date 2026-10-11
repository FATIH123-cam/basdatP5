export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Apa fungsi primary key?",
    options: [
      "Mengidentifikasi secara unik setiap baris dalam tabel",
      "Menghubungkan dua tabel yang berbeda",
      "Mengurutkan data dalam tabel",
      "Menyimpan data ganda"
    ],
    correctAnswer: 0,
    explanation: "Primary key adalah kolom yang digunakan untuk mengidentifikasi setiap baris/record secara unik dalam sebuah tabel."
  },
  {
    id: 2,
    question: "Manakah perintah SQL untuk menambahkan data baru?",
    options: [
      "ADD NEW",
      "INSERT INTO",
      "UPDATE DATA",
      "CREATE RECORD"
    ],
    correctAnswer: 1,
    explanation: "Perintah INSERT INTO digunakan untuk menambahkan record atau baris baru ke dalam tabel."
  },
  {
    id: 3,
    question: "Apa fungsi dari perintah SELECT?",
    options: [
      "Menghapus tabel",
      "Mengubah data",
      "Menampilkan atau mengambil data dari database",
      "Membuat tabel baru"
    ],
    correctAnswer: 2,
    explanation: "Perintah SELECT digunakan untuk melakukan query dan mengambil data dari database."
  }
];
