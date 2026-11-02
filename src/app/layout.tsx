import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyễn Quang Đạt",
  description:
    "Đồng sáng lập Vi-Tech. 15 năm đồng hành cùng doanh nghiệp về Chữ ký số, Hóa đơn điện tử. Giúp doanh nghiệp vận hành bằng quy trình, dữ liệu và AI.",
  icons: { icon: "/assets/logo.png" },
  openGraph: {
    type: "profile",
    title: "Nguyễn Quang Đạt – Đồng sáng lập Vi-Tech",
    description: "Đưa doanh nghiệp từ vận hành theo kinh nghiệm sang vận hành bằng quy trình, dữ liệu và AI.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B1459",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${beVietnam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
