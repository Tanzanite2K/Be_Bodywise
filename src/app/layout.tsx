import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "BODYWISE — Your Skin. Your Journey. Your Progress.",
  description:
    "Results Journey: a personalised skincare companion that helps you understand your products, follow your routine, set realistic expectations and track progress.",
};
export const viewport: Viewport = { themeColor: "#FFF5F7", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-rose-cta focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
