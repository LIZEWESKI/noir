
import { ThemeProvider } from '@/Components/ThemeProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '@/Components/Header';

export default function GuestLayout({ children }) {
    return (
        <ThemeProvider>
            <ScrollArea className="h-screen w-full">
                <Header/>
                <main className="mt-6 w-full h-auto bg-card px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </main>
            </ScrollArea>
        </ThemeProvider>
    );
}
