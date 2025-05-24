'use client';

import "./globals.css";
import { Poppins, Dancing_Script } from "next/font/google";
import { ThemeProvider } from "./components/utils/themeProvider";
import Header from "./components/Header";
import { useState } from 'react'; // useEffect might be needed if we add more complex logic, for now useState is key.
import PageLoadReveal from './components/utils/PageLoadReveal';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({ children }) {
  const [isRevealAnimationVisible, setIsRevealAnimationVisible] = useState(true);

  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        {isRevealAnimationVisible && (
          <PageLoadReveal onAnimationComplete={() => setIsRevealAnimationVisible(false)} />
        )}
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
