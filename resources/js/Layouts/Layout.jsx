import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/header/header';
import { Footer } from '@/components/Footer';
export default function Layout({ children }) {
    return (
        <ThemeProvider>
            <div className='flex flex-col gap-4 h-screen w-full min-h-screen '>
                <Header/>
                <main className={`flex flex-col flex-grow md:px-20 px-4 bg-card mt-14 `}>
                    {children}
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}
