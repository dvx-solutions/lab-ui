import { Button } from './components';
import { useEventos } from './hooks';
import { internal_api } from './lib/internal_api';
import { ENivelValorizacaoEvento, EOrigemValorEvento } from './types';

export default function App() {
  const { refetch } = useEventos({
    API_Instance: internal_api,
    empresaId: 2,
    origemEvento: EOrigemValorEvento.Manual,
    nivelValorizacao: ENivelValorizacaoEvento.Colaborador,
  });

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => refetch()} className="cursor-pointer">
        Refetch
      </Button>
    </div>
  );
}
