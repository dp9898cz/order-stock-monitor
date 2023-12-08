import { FilterProvider } from "@/context/FiltersContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PaginationProvider } from "@/context/Pagination";
import AppBar from "@/components/layout/AppBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Objednávkový systém",
    description: "Monitoring stock items and showing when to order them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="cs">
            <body className={inter.className}>
                <FilterProvider>
                    <PaginationProvider>
                        <AppBar />
                        {children}
                    </PaginationProvider>
                </FilterProvider>
            </body>
        </html>
    );
}
