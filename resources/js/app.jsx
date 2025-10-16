import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
const appName = import.meta.env.VITE_APP_NAME || 'Noir';

createInertiaApp({
    title: (title) => `${title ? title : appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx');
        return pages[`./pages/${name}.jsx`]();
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