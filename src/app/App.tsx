import { QueryClientProvider } from '@/app/providers/QueryClientProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import ToastProvider from '@/app/providers/ToastProvider';

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider />
      <ToastProvider />
    </QueryClientProvider>
  );
}

export default App;
