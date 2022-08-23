import { FiDatabase } from 'react-icons/fi';

import { Button } from './components/buttons/Button';

export function App() {
  return (
    <div className="w[100vw] flex h-[100vh] items-center justify-center">
      <Button
        className="primary-button"
        isLoading
        leftIcon={<FiDatabase />}
        loadingText="Carregando"
        type="button"
      >
        Increase tab
      </Button>
    </div>
  );
}
