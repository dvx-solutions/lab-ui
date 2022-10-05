import { AxiosInstance } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Dialog,
  DialogDisclosureProps,
  Select,
  SaveFormButton,
} from '+/components';
import {
  Autocomplete,
  TAutocompleteOption,
} from '+/components/form/Autocomplete';
import {
  useUnidadeCentrosListarCentros,
  useUnidadeCentrosListarUnidades,
} from '+/hooks';
import { useContasContabeis } from '+/hooks/react-query/financas/contas-contabeis';
import { useContasReceitas } from '+/hooks/react-query/financas/contas-receitas';
import { getRequestErrorToast } from '+/lib';

interface Props extends DialogDisclosureProps {
  produtoUnidadeId: number;
  axiosInstance: AxiosInstance;
  empresaAnoFiscalId: number;
}

const schema = z.object({
  centroId: z.number(),
  contaContabilId: z.number(),
  contaReceitaId: z.number(),
  empresaAnoFiscalId: z.number(),
  produtoUnidadeId: z.number().nonnegative(),
  unidadeId: z.number(),
});

type FormValuesType = z.infer<typeof schema>;

export function CUProdutoUnidadeAno({
  produtoUnidadeId,
  axiosInstance,
  empresaAnoFiscalId,
  ...disclousure
}: Props) {
  // const appConfig = useAppConfigStore(s => s.appConfig); - NÃO VAI USAR MAIS?
  const queryClient = useQueryClient();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValuesType>({
    defaultValues: {
      // empresaAnoFiscalId: appConfig?.empresaAnoFiscal.id ?? 0,
      empresaAnoFiscalId,
      produtoUnidadeId,
    },
  });

  const queriesConfig = {
    API_Instance: axiosInstance,
    // empresaAnoFiscalId: appConfig?.empresaAnoFiscal.id ?? 0,
    empresaAnoFiscalId,
    pageSize: 100000,
  };

  const [unidadeIdSelecionada, setUnidadeIdSelecionada] = useState(0);

  const { data: contasContabeis } = useContasContabeis(queriesConfig);
  const { data: contasReceitas } = useContasReceitas(queriesConfig);
  const { data: unidades } = useUnidadeCentrosListarUnidades(queriesConfig);
  const { data: centros } = useUnidadeCentrosListarCentros({
    ...queriesConfig,
    compartilhado: null,
    unidadeId: unidadeIdSelecionada,
  });

  const [contaContabilQuery, setContaContabilQuery] = useState('');
  const [contaContabilSelecionado, setContaContabilSelecionado] =
    useState<TAutocompleteOption>();

  const contaContabeisWithMatchedQuery = contasContabeis?.data
    .filter(item => {
      const codigoItem = item.codigo.toLowerCase();
      const nomeItem = item.nome.toLowerCase();
      const query = contaContabilQuery.toLowerCase();

      return nomeItem.includes(query) || codigoItem.includes(query);
    })
    .slice(0, 20);

  const closeAndReset = () => {
    disclousure.onClose();
    reset();
    setContaContabilQuery('');
  };

  const onFormSubmit = async (values: FormValuesType) => {
    values.contaContabilId = contaContabilSelecionado?.id ?? 0;
    await axiosInstance({
      data: values,
      method: 'POST',
      url: 'produtos/produtos-unidades-anos',
    })
      .then(async () => {
        await queryClient.invalidateQueries(['produtos-unidades-anos']);
        toast.success('Produto vinculado');
        closeAndReset();
      })
      .catch(getRequestErrorToast);
  };

  return (
    <Dialog
      {...disclousure}
      onClose={closeAndReset}
      title={`Vincular produto por unidade ID ${produtoUnidadeId} à um ano`}
    >
      <form
        className="grid w-[70vw] grid-cols-3"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Select
          {...register('unidadeId', {
            valueAsNumber: true,
            onChange(event) {
              setUnidadeIdSelecionada(Number(event.target.value));
            },
          })}
          error={errors.unidadeId}
          label="Unidade"
          options={unidades?.options}
        />
        <Select
          {...register('centroId', { valueAsNumber: true })}
          error={errors.centroId}
          label="Centro"
          options={centros?.options}
        />
        <Select
          {...register('contaReceitaId', { valueAsNumber: true })}
          error={errors.contaReceitaId}
          label="Conta de receita"
          options={contasReceitas?.options}
        />
        <Autocomplete
          options={contaContabeisWithMatchedQuery?.map(x => ({
            id: x.id,
            name: `${x.codigo} - ${x.nome}`,
          }))}
          inputProps={{
            ...register('contaContabilId'),
            placeholder: 'Digite o nome ou código da conta contábil',
          }}
          error={errors.contaContabilId}
          isSearchingOptions={false}
          label="Conta contábil"
          query={contaContabilQuery}
          selectedValue={contaContabilSelecionado}
          setQuery={setContaContabilQuery}
          setSelectedValue={setContaContabilSelecionado}
        />
        <SaveFormButton isSubmitting={isSubmitting} />
      </form>
    </Dialog>
  );
}

export default CUProdutoUnidadeAno;
