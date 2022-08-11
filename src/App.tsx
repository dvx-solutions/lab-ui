import { useForm } from 'react-hook-form';

import { Checkbox } from './components';
import { CurrencyInput } from './components/form/CurrencyInput';

export default function App() {
  const { control, register } = useForm<{ teste: string }>();

  return <Checkbox name="haha" label="haha" />;
}
