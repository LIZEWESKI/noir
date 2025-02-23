
import { ThemeProvider } from '@/Components/ThemeProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '@/Components/Header';
import { useMediaQuery } from 'react-responsive'
export default function Layout({ children }) {

    const isMobile = useMediaQuery({query:'(max-width: 768px)'});
    return (
        <ThemeProvider>
            <ScrollArea className="h-screen w-full">
                <Header/>
                <main className={`bg-card ${isMobile ? "px-4" : "px-20" } py-2 shadow-md`}>
                    {children}
                </main>
            </ScrollArea>
        </ThemeProvider>
    );
}
