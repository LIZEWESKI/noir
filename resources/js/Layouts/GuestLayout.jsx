
import { ThemeProvider } from '@/Components/ThemeProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '@/Components/Header';

export default function GuestLayout({ children }) {
    return (
        <ThemeProvider>
            <ScrollArea className="h-screen w-full">
                <Header/>
                <main className="bg-card px-20 py-4 shadow-md">
                    {children}
                </main>
            </ScrollArea>
        </ThemeProvider>
    );
}
