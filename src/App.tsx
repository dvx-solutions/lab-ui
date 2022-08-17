import { Avatar } from '+/components/Avatar';

import { Button } from './components/buttons/Button';
import { Select } from './components/form/Select';
import { convertClassnames } from './lib/convertClassnames';

export function App() {
  return (
    <div className="w[100vw] flex h-[100vh] items-center justify-center">
      <Button
        onClick={() => alert('haha')}
        className="primary-button"
        isDisabled
      >
        Teste
      </Button>
    </div>
  );
}
