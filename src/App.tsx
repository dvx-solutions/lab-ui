import { useForm } from 'react-hook-form';

import { CurrencyInput } from './components/form/CurrencyInput';

export default function App() {
  const { control, register } = useForm<{ teste: string }>();

  return (
    <form className="flex w-[25vw] items-center justify-center rounded bg-white p-3 shadow-lg">
      <CurrencyInput
        {...register('teste')}
        control={control}
        error={{ type: 'required', message: 'This field is required' }}
        label="Teste"
      />
    </form>
  );
}
