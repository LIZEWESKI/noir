
import { ThemeProvider } from '@/Components/ThemeProvider';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '@/Components/Header';
import { Footer } from '@/Components/Footer';
import { useMediaQuery } from 'react-responsive'
export default function Layout({ children }) {

    const isMobile = useMediaQuery({query:'(max-width: 768px)'});
    return (
        <ThemeProvider>
            <ScrollArea className="h-screen w-full">
                <div className='flex flex-col gap-4 h-screen w-full min-h-screen'>
                    <Header/>
                    <main className={`flex flex-col flex-grow bg-card ${isMobile ? "px-4" : "px-20"} `}>
                        {children}
                    </main>
                    <Footer/>
                </div>
            </ScrollArea>
        </ThemeProvider>
    );
}
