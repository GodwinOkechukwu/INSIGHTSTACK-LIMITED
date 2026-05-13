// import type { Metadata, Viewport } from "next";

// // Styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "react-toastify/dist/ReactToastify.css";
// import "rc-drawer/assets/index.css";
// import "@styles/globals.css";

// // Components & Constants
// import AppProvider from "@src/components/config/AppProvider";
// import { SEODATA, SITE_NAME, SITE_URL } from "@constants/seoContants";

// // 1. Professional Viewport Configuration
// // Separated from metadata as per Next.js 15+ standards
// export const viewport: Viewport = {
//   themeColor: "#0A48B2",
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
//   viewportFit: "cover", // Ensures app fills the screen on iPhone notches
// };

// // 2. World-Class Metadata Configuration
// const { description, keywords, title, url, ogImage } = SEODATA.default;

// export const metadata: Metadata = {
//   title: {
//     default: title,
//     template: `%s | ${SITE_NAME}`, // Allows sub-pages to have "Page Title | Warespire"
//   },
//   description: description,
//   keywords: keywords,
//   applicationName: SITE_NAME,
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: "black-translucent",
//     title: SITE_NAME,
//     // startupImage: [] <-- Add your pwa-asset-generator links here
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/icons/apple-touch-icon.png", // Standard Apple icon path
//     other: [
//       {
//         rel: "mask-icon",
//         url: "/icons/safari-pinned-tab.svg",
//         color: "#0A48B2",
//       },
//     ],
//   },
//   openGraph: {
//     type: "website",
//     url: SITE_URL,
//     siteName: SITE_NAME,
//     title: title,
//     description: description,
//     images: [
//       {
//         url: ogImage ?? "",
//         width: 1200,
//         height: 630,
//         alt: SITE_NAME,
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: title,
//     description: description,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body
//         className="font-plushTrial w-full min-h-screen antialiased bg-white text-slate-900"
//       >
//         <AppProvider>
//           {/* Main Content */}
//           <main className="relative flex flex-col min-h-screen">
//             {children}
//           </main>
//         </AppProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata, Viewport } from "next";

import { Syne } from "next/font/google";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import "rc-drawer/assets/index.css";
import "@styles/globals.css";

// Components & Constants
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA, SITE_NAME, SITE_URL } from "@constants/seoContants";

// FONT

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

// 1. Professional Viewport Configuration
export const viewport: Viewport = {
  themeColor: "#0A48B2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

// 2. World-Class Metadata Configuration
const { description, keywords, title, url, ogImage } = SEODATA.default;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description: description,
  keywords: keywords,
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#0A48B2",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: title,
    description: description,
    images: [
      {
        url: ogImage ?? "",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} scroll-smooth`}>
      <body className="font-plushTrial w-full min-h-screen antialiased bg-white text-slate-900">
        <AppProvider>
          <main className="relative flex flex-col min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
