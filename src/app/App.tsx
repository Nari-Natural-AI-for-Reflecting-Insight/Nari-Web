import GlobalErrorBoundary from '@/app/providers/GlobalErrorBoundary';
import { QueryClientProvider } from '@/app/providers/QueryClientProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import ToastProvider from '@/app/providers/ToastProvider';

function App() {
  return (
    <QueryClientProvider>
      <GlobalErrorBoundary>
        <RouterProvider />
        <ToastProvider />
      </GlobalErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
