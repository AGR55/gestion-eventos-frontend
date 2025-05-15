import type { Metadata } from "next";
//import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme_provider";
import { Navbar } from "@/components/ui/navbar/navbar";
import { Footer } from "@/components/ui/footer/footer";

// Configuración de la fuente principal con múltiples pesos
/*const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  // Incluir varios pesos para mayor versatilidad
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});*/

export const metadata: Metadata = {
  title: "Event Horizon | Find Amazing Events",
  description: "Discover and attend the best events in your area",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-white dark:bg-[#111E27] ${
          /*${jakarta.variable}*/ ""
        } antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
