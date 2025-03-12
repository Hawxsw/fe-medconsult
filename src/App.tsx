import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { router } from './routes';
import { Toaster } from 'react-hot-toast';

export function App() {
    return (
        <QueryProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
        </QueryProvider>
    );
}
