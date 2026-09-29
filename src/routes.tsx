import { createBrowserRouter } from "react-router-dom"
import { DesktopLayout } from "./layouts/DesktopLayout"
import { Beranda } from "./pages/Beranda"
import { Tentang } from "./pages/Tentang"
import { DepartemenList } from "./pages/DepartemenList"
import { DepartemenDetail } from "./pages/DepartemenDetail"
import { ProgramKerja } from "./pages/ProgramKerja"
import { Kabinet } from "./pages/Kabinet"
import { Berita } from "./pages/Berita"
import { Galeri } from "./pages/Galeri"
import { Desktop } from "./pages/Desktop"
import { Kontak } from "./pages/Kontak"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DesktopLayout />,
    children: [
      { index: true, element: <Beranda /> },
      { path: "desktop", element: <Desktop /> },
      { path: "kontak", element: <Kontak /> },
      { path: "tentang", element: <Tentang /> },
      { path: "departemen", element: <DepartemenList /> },
      { path: "departemen/:slug", element: <DepartemenDetail /> },
      { path: "program-kerja", element: <ProgramKerja /> },
      { path: "kabinet", element: <Kabinet /> },
      { path: "berita", element: <Berita /> },
      { path: "galeri", element: <Galeri /> },
      { path: "snake", element: <></> },
      { path: "minesweeper", element: <></> },
    ],
  },
], { basename: import.meta.env.BASE_URL })
