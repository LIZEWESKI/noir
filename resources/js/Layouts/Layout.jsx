
import { ThemeProvider } from '@/Components/ThemeProvider';
import Header from '@/Components/Header';
import { Footer } from '@/Components/Footer';
export default function Layout({ children }) {
    return (
        <ThemeProvider>
            <div className='flex flex-col gap-4 h-screen w-full min-h-screen '>
                <Header/>
                <main className={`flex flex-col flex-grow md:px-20 px-4 bg-card `}>
                    {children}
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}
