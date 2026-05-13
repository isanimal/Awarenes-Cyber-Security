# Panduan Setup Supabase - Secure the Voyage

## 1. Kenapa Project Ini Memakai Supabase

Secure the Voyage adalah awareness game untuk kelas/training. Peserta tidak perlu login, tetapi trainer perlu melihat hasil dari semua peserta dalam satu dashboard.

Supabase dipakai sebagai database sederhana untuk menyimpan:

- attempt peserta
- jawaban per skenario
- skor akhir
- final report

Untuk MVP training 1 hari, aplikasi memakai anon key Supabase di frontend. Ini sederhana dan cukup untuk classroom, tetapi bukan desain keamanan production-grade.

## 2. Cara Membuat Project Supabase

1. Buka `https://supabase.com`.
2. Login atau buat akun.
3. Klik `New project`.
4. Pilih organization.
5. Isi nama project, misalnya `secure-the-voyage`.
6. Buat database password dan simpan di tempat aman.
7. Pilih region terdekat.
8. Klik `Create new project`.

Tunggu sampai project selesai dibuat.

## 3. Cara Membuka SQL Editor

1. Masuk ke Supabase Dashboard project Anda.
2. Di sidebar kiri, pilih `SQL Editor`.
3. Klik `New query`.

## 4. Cara Menjalankan `supabase/schema.sql`

1. Buka file lokal `supabase/schema.sql`.
2. Copy seluruh isi file.
3. Paste ke Supabase SQL Editor.
4. Klik `Run`.

Schema ini akan membuat:

- table `game_attempts`
- table `game_answers`
- index untuk dashboard/query
- RLS policy MVP classroom

## 5. Cara Mengambil Project URL dan Anon Key

1. Di Supabase Dashboard, buka `Project Settings`.
2. Pilih menu `API`. sb_publishable_DRAD_RV1demcFe1CvPt3-w_FIOewH4_
3. Copy `Project URL`. https://bpzfknsqpgfdnrqtxmzw.supabase.co
4. Copy `anon public` key. eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwemZrbnNxcGdmZG5ycXR4bXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MjYyNTQsImV4cCI6MjA5NDIwMjI1NH0.OnV-AbR-dRKk2y3bqKSvwKfYHYzuQEQhu8cz6iRfxgo

Jangan gunakan `service_role` key di frontend. `service_role` hanya untuk backend/server yang terlindungi.

## 6. Cara Mengisi `.env`

Copy `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Isi dengan data Supabase Anda:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_TRAINER_PASSCODE=change-this-passcode
```

Ganti `VITE_TRAINER_PASSCODE` dengan passcode sederhana untuk trainer, misalnya:

```bash
VITE_TRAINER_PASSCODE=stv-training-2026
```

Restart dev server setelah mengubah `.env`.

## 7. Cara Menjalankan Aplikasi

Install dependency:

```bash
npm install
```

Jalankan dev server:

```bash
npm run dev
```

Buka URL Vite yang muncul di terminal, biasanya `http://localhost:5173`.

## 8. Cara Test Sebagai Peserta

1. Buka landing page.
2. Klik `Mulai Simulasi`.
3. Isi nama, role/divisi, dan mode individual/team.
4. Klik mulai game.
5. Jawab beberapa skenario.
6. Cek Supabase Table Editor:
   - row baru harus muncul di `game_attempts`
   - row jawaban harus muncul di `game_answers`
7. Selesaikan game.
8. Pastikan `game_attempts.status` berubah menjadi `completed`.

Jika `.env` belum diisi, aplikasi tetap jalan dalam Local Mode dan data hanya tersimpan di browser yang sama.

## 9. Cara Test Sebagai Trainer

1. Buka `/trainer`.
2. Masukkan passcode dari `VITE_TRAINER_PASSCODE`.
3. Jika benar, session trainer disimpan di `sessionStorage` dengan key `stv_trainer_access`.
4. Dashboard akan menampilkan:
   - total attempts
   - completed attempts
   - in progress attempts
   - average score
   - decision summary
   - table peserta
   - detail jawaban peserta

Jika Supabase aktif, badge dashboard menampilkan `Connected to Supabase`.
Jika Supabase belum aktif, badge menampilkan `Local Mode`.

## 10. Cara Export CSV

1. Login ke `/trainer`.
2. Buka tab `Evaluasi Peserta`.
3. Klik `Export CSV`.

CSV berisi:

- `participant_name`
- `participant_role`
- `mode`
- `team_name`
- `total_score`
- `security_score`
- `operation_score`
- `compliance_score`
- `recovery_score`
- `rating`
- `strongest_area`
- `weakest_area`
- `status`
- `completed_at`

## 11. Catatan Security

Policy RLS di `supabase/schema.sql` dibuat untuk MVP classroom/training agar peserta tanpa login bisa mengirim data dan trainer dashboard bisa membaca hasil.

Ini bukan production-grade security.

Untuk production:

- gunakan Supabase Auth, atau
- pindahkan trainer dashboard ke protected backend API, dan
- jangan expose query select seluruh peserta langsung dari frontend.

## 12. Troubleshooting

### Env Kosong

Gejala:

- muncul banner `Local Mode aktif`
- data tidak muncul di Supabase

Solusi:

- isi `.env`
- pastikan nama variabel benar:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_TRAINER_PASSCODE`
- restart `npm run dev`

### Supabase Fetch Error

Gejala:

- trainer dashboard menampilkan error fetch

Solusi:

- cek koneksi internet
- cek `VITE_SUPABASE_URL`
- cek anon key
- cek apakah table sudah dibuat

### RLS Policy Error

Gejala:

- insert/select gagal dengan pesan permission/RLS

Solusi:

- jalankan ulang seluruh isi `supabase/schema.sql`
- pastikan policy untuk anon sudah ada
- buka Supabase Table Editor > Authentication/RLS untuk memastikan RLS aktif dan policy tersedia

### Data Tidak Muncul di Dashboard

Kemungkinan:

- peserta menjalankan app dalam Local Mode
- `.env` baru diisi tetapi dev server belum direstart
- peserta belum menjawab skenario
- trainer melihat dashboard di browser berbeda saat Local Mode

Solusi:

- pastikan badge trainer menunjukkan `Connected to Supabase`
- refresh dashboard
- cek table `game_attempts` dan `game_answers` di Supabase

### CORS / Network Error

Gejala:

- browser console menunjukkan network error
- request ke Supabase gagal

Solusi:

- cek Project URL
- pastikan project Supabase aktif
- pastikan tidak ada ad blocker/proxy yang memblokir request
- coba jaringan internet lain

### Passcode Trainer Salah

Gejala:

- `/trainer` tetap menampilkan login

Solusi:

- cek isi `VITE_TRAINER_PASSCODE`
- restart dev server setelah mengubah `.env`
- hapus session lama bila perlu dari browser devtools:
  - `sessionStorage.removeItem("stv_trainer_access")`
