import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
const appName = import.meta.env.VITE_APP_NAME || 'Noir';
const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });

createInertiaApp({
    title: (title) => `${title ? title : appName}`,
    resolve: (name) => {
        
        const pagePath = `./pages/${name}.jsx`;
        const page = pages[pagePath];

        if (!page) {
            throw new Error(`Page not found: ${pagePath}`);
        }

        return page.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "hsl(var(--primary))",
    },
});

initializeTheme();