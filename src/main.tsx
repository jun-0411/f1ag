import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { queryClient } from './utils/queryClient';

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('Root element not found');
}

const startMocking = async () => {
  const shouldEnableMocking =
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCKING === 'true';

  if (!shouldEnableMocking) {
    return;
  }

  const { worker } = await import('@/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
};

const renderApplication = () => {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
};

const initializeApplication = async () => {
  try {
    await startMocking();
  } catch (error: unknown) {
    // Mock 초기화 실패가 실제 API를 사용하는 개발까지 막지 않도록 앱은 계속 실행한다.
    console.error('MSW를 시작하지 못했습니다.', error);
  }

  renderApplication();
};

void initializeApplication();
