import { Outfit } from "next/font/google";
import "@/app/globals.css";
import DashboardLayout from "@/themes/components/DashboardLayout";

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

        <DashboardLayout>
            {children}
        </DashboardLayout>

    );
}