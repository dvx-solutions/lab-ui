import { Button } from './components';
import { useEventosValores } from './hooks/react-query/colaboradores/eventos-valores';
import { internal_api } from './lib/internal_api';
import { ENivelValorizacaoEvento, ETipoListagemEventoValor } from './types';

export default function App() {
  const { refetch } = useEventosValores({
    API_Instance: internal_api,
    empresaAnoFiscalId: 1,
    nivelValorizacaoEvento: ENivelValorizacaoEvento.Colaborador,
    planejamentoColaboradorId: 1,
    tipoListagemEventoValor: ETipoListagemEventoValor.Colaborador,
  });

  return (
    <div className="flex items-center justify-center">
      <Button onClick={() => refetch()} className="cursor-pointer">
        Refetch
      </Button>
    </div>
  );
}
