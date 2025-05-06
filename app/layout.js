import "./globals.css";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "./components/utils/themeProvider";




const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
