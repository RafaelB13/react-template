import { Toaster } from 'sonner';

import AppRouter from './core/router';

function App() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
