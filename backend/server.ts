import express from 'express';
import cors from 'cors';
import { query } from './db';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support for large photo uploads

// Users
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await query('SELECT id, username, role, name, created_at FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, password_hash, role, name } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO users (username, password_hash, role, name) VALUES ($1, $2, $3, $4) RETURNING id, username, role, name',
      [username, password_hash, role, name]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Meetings
app.get('/api/meetings', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM meetings ORDER BY date DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});

// Attendance
app.get('/api/attendance', async (req, res) => {
  const { user_id, meeting_id } = req.query;
  let q = 'SELECT * FROM attendance WHERE 1=1';
  const params: any[] = [];
  if (user_id) {
    params.push(user_id);
    q += ` AND user_id = $${params.length}`;
  }
  if (meeting_id) {
    params.push(meeting_id);
    q += ` AND meeting_id = $${params.length}`;
  }
  
  try {
    const { rows } = await query(q, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

app.post('/api/attendance', async (req, res) => {
  const { user_id, meeting_id, status, reason, photos } = req.body;
  try {
    // Start transaction manually since we don't have a transaction helper yet
    // For simplicity we will just do sequence
    const { rows: attRows } = await query(
      'INSERT INTO attendance (user_id, meeting_id, status, reason) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, meeting_id) DO UPDATE SET status = EXCLUDED.status, reason = EXCLUDED.reason RETURNING id',
      [user_id, meeting_id, status, reason]
    );
    
    const attendanceId = attRows[0].id;
    
    // Insert photos if any
    if (photos && photos.length > 0) {
      await query('DELETE FROM attendance_photos WHERE attendance_id = $1', [attendanceId]);
      for (const p of photos) {
        await query('INSERT INTO attendance_photos (attendance_id, pose, photo_url) VALUES ($1, $2, $3)', [attendanceId, p.pose, p.photo_url]);
      }
    }
    
    res.status(201).json({ success: true, attendanceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit attendance' });
  }
});

// Profiles
app.get('/api/profiles/:user_id', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM profiles WHERE user_id = $1', [req.params.user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

app.put('/api/profiles/:user_id', async (req, res) => {
  const { header_theme, header_image_url } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO profiles (user_id, header_theme, header_image_url) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET header_theme = EXCLUDED.header_theme, header_image_url = EXCLUDED.header_image_url RETURNING *',
      [req.params.user_id, header_theme, header_image_url]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ERD Diagrams
app.get('/api/erd/:user_id', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM erd_diagrams WHERE user_id = $1', [req.params.user_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ERD diagrams' });
  }
});

app.post('/api/erd', async (req, res) => {
  const { user_id, title, data } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO erd_diagrams (user_id, title, data) VALUES ($1, $2, $3) RETURNING *',
      [user_id, title, data]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save ERD diagram' });
  }
});

// =========================================================
// Endpoints for ERD Schema Tables
// =========================================================

// Praktikan
app.get('/api/praktikan', async (req, res) => {
  try {
    const { rows } = await query('SELECT id, nim, nama, role, profile_picture, header_picture FROM praktikan ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch praktikan' });
  }
});

// Pertemuan
app.get('/api/pertemuan', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM pertemuan ORDER BY minggu_ke ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pertemuan' });
  }
});

// Materi
app.get('/api/materi', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM materi ORDER BY pertemuan_id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch materi' });
  }
});

app.put('/api/materi/:pertemuan_id', async (req, res) => {
  const { file_url, is_open } = req.body;
  try {
    const { rows } = await query(
      'UPDATE materi SET file_url = $1, is_open = $2 WHERE pertemuan_id = $3 RETURNING *',
      [file_url, is_open, req.params.pertemuan_id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update materi' });
  }
});

// LKP
app.get('/api/lkp', async (req, res) => {
  try {
    const { rows } = await query('SELECT * FROM lkp ORDER BY pertemuan_id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lkp' });
  }
});

app.put('/api/lkp/:pertemuan_id', async (req, res) => {
  const { file_url, is_open } = req.body;
  try {
    const { rows } = await query(
      'UPDATE lkp SET file_url = $1, is_open = $2 WHERE pertemuan_id = $3 RETURNING *',
      [file_url, is_open, req.params.pertemuan_id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lkp' });
  }
});

// Absensi (ERD table)
app.get('/api/absensi', async (req, res) => {
  const { praktikan_id, pertemuan_id } = req.query;
  let q = 'SELECT * FROM absensi WHERE 1=1';
  const params: any[] = [];
  if (praktikan_id) {
    params.push(praktikan_id);
    q += ` AND praktikan_id = $${params.length}`;
  }
  if (pertemuan_id) {
    params.push(pertemuan_id);
    q += ` AND pertemuan_id = $${params.length}`;
  }
  try {
    const { rows } = await query(q, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch absensi' });
  }
});

app.put('/api/absensi/:praktikan_id/:pertemuan_id', async (req, res) => {
  const { status, waktu_absen } = req.body;
  try {
    const { rows } = await query(
      'INSERT INTO absensi (praktikan_id, pertemuan_id, status, waktu_absen) VALUES ($1, $2, $3, $4) ON CONFLICT (praktikan_id, pertemuan_id) DO UPDATE SET status = EXCLUDED.status, waktu_absen = EXCLUDED.waktu_absen RETURNING *',
      [req.params.praktikan_id, req.params.pertemuan_id, status, waktu_absen]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update absensi' });
  }
});

app.listen(port, () => {
  console.log(`Backend API running on port ${port}`);
});
