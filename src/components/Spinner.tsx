import { FiLoader } from 'react-icons/fi';

export function Spinner() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <FiLoader className="h-6 w-6 animate-spin" />
    </div>
  );
}
