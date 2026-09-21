import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    display: "swap",
    fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata = {
    title: "My Dashboard",
    description: "Dashboard application",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={outfit.variable}>
            <body>{children}</body>
        </html>
    );
}