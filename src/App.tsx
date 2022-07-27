import { Checkbox } from './components';

export default function App() {
  return (
    <form className="grid w-[50rem] grid-cols-3 items-end bg-red-100">
      <input type="text" />
      <Checkbox name="teste" label="Teste" />
      <input type="text" />
    </form>
  );
}
