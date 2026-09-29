# BEM FILKOM UNIDA

Situs retrospektif bertema **desktop operating system** (ala Windows XP) untuk
Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda Bogor.

Bukan situs "kartu-kartu dengan border" — ini simulasi OS beneran: ada booting,
desktop, Start Menu, taskbar, window yang bisa di-drag, diminimize, dan ditutup.

---

## Fitur

**Sistem operasi**

- **Boot sequence** ala XP (logo + progress bar "Starting Filkom OS..."), lengkap
  dengan layar "It's now safe to turn off your computer" saat dimatikan
- **Matikan / Nyalakan** dari Start Menu
- **Start Menu** dengan dua kolom, submenu "Semua Halaman", dan navigasi keyboard
- **Taskbar** dengan tombol *Mulai*, task button per window (bisa minimize/restore),
  **Show Desktop**, dan **system tray**
- **System tray**: tombol `^` (show hidden icons) berisi link GitHub & LinkedIn,
  jam digital + tanggal Bahasa Indonesia, dan kalender flyout yang muncul saat
  jam diklik

**Window system**

- Window yang bisa di-drag, ditutup, dan diminimize ke taskbar
- Z-index management (klik window = bring to front)
- Ukuran window menyesuaikan isi konten, dengan batas maksimum agar tetap rapi
- `Esc` untuk menutup window aktif

**Aplikasi**

| Halaman | Isi |
|---|---|
| Beranda | Hero, statistik, berita terbaru |
| Tentang | Visi & misi, tombol OK menutup window |
| Departemen | File explorer + halaman detail tiap departemen |
| Program Kerja | Tabel program kerja (responsif di mobile) |
| Kabinet | Kartu pengurus |
| Berita | Inbox berita + panel artikel |
| Galeri | Galeri foto |
| Kontak | Kanal kontak + alamat & jam layanan |
| Snake | Game ular (resident window, persist) |
| Minesweeper | Game minesweeper (resident window, persist) |

**Game**

Dua game dengan logika murni yang terpisah dari UI (`src/games/*.ts`):

- **Snake** — grid 18×18, kontrol panah/WASD, on-screen D-pad khusus mobile
- **Minesweeper** — 9×9 dengan 10 ranjau, first-click aman, flood fill, chording,
  mode toggle buka/tandai (karena klik kanan nggak ada di sentuh)

Keduanya **resident**: tetap nempel di desktop walau buka halaman lain, dan
bisa diminimize ke taskbar. Kalau window-nya ditutup, game otomatis pause.

---

## Tech stack

- **React 19** + **React Router 7** (routing via `createBrowserRouter`)
- **Vite 8** + **TypeScript 5.7**
- **Tailwind CSS v4** (lewat `@tailwindcss/vite`, tanpa config file)
- **lucide-react** untuk icon
- **oxfmt** untuk formatting

Tanpa runtime dependency lain — logo dan mark GitHub/LinkedIn digambar sendiri
sebagai inline SVG.

---

## Menjalankan

Butuh **Node 22** dan **pnpm 10**.

```bash
pnpm install
pnpm dev        # http://localhost:8443
```

Script lain:

```bash
pnpm build      # output ke dist/
pnpm preview    # preview hasil build
pnpm format     # oxfmt
```

### Port & host

Default port **8443** (bisa diubah via `PORT`), host `0.0.0.0`.
Untuk path berbeda saat build (misal GitHub Pages), set `PUBLIC_URL`:

```bash
PUBLIC_URL=/bemfilkom-experimental pnpm build
```

---

## Struktur

```
src/
  components/      Window, BootScreen, tray (jam, kalender, icon), mark SVG
  contexts/        DesktopContext — state window (open, minimized, posisi, z-index)
  games/           snake.ts / minesweeper.ts (logika murni) + komponen UI
  layouts/         DesktopLayout — shell OS: taskbar, Start Menu, task buttons
  lib/             tanggal.ts (format tanggal/waktu Bahasa Indonesia)
  pages/           Tiap halaman = satu atau lebih window
  assets/          logo BEM
  routes.tsx
  index.css        tema warna, font, dan utilitas global
```

`DesktopLayout` memegang semua state window dan dibagikan lewat
`DesktopContext`, jadi tiap window bisa saling berkomunikasi tanpa prop drilling.

---

## Deploy

Deploy otomatis ke **GitHub Pages** lewat `.github/workflows/deploy.yml` —
setiap push ke `main` akan build dan publish.

Karena aplikasinya SPA, GitHub Pages butuh dua penyesuaian:

1. `base` di-set ke `/bemfilkom-experimental/` (project page tidak berada di root domain)
2. `dist/404.html` adalah salinan `index.html`, supaya URL dalam (mis.
   `/departemen/psdm`) tetap resolve ke aplikasi

Kalau mau pindah ke Netlify / Cloudflare Pages, `public/_redirects` sudah
disertakan untuk menangani hal yang sama.

---

## Catatan

Seluruh konten (nama pengurus, statistik, tanggal berita, detail kontak)
merupakan **data contoh** untuk keperluan demonstrasi, dan perlu diganti dengan
data resmi BEM FILKOM UNIDA sebelum dipakai untuk publikasi sungguhan.

---

Dibuat dengan React + Vite + Tailwind CSS.
