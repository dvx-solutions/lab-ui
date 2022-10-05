import { AxiosInstance } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Dialog,
  DialogDisclosureProps,
  SaveFormButton,
  Select,
} from '+/components';
import {
  Autocomplete,
  TAutocompleteOption,
} from '+/components/form/Autocomplete';
import { useProdutos, useUnidadeNegocio } from '+/hooks';
import { useAtividadesEconomicas } from '+/hooks/react-query/atividades-economicas';
import { useCodigoTributacaoMunicipios } from '+/hooks/react-query/codigo-tributacao-municipios';
import { getRequestErrorToast } from '+/lib';

interface Props extends DialogDisclosureProps {
  recordIdToEdit: number;
  axiosInstance: AxiosInstance;
  empresaAnoFiscalId: number;
  planoProdutoId: number;
}

const schema = z.object({
  empresaAnoFiscalId: z.number(),
  produtoId: z.number().nonnegative(),
  unidadeNegocioId: z.number(),
  atividadeEconomicaId: z.number(),
  codigoTributacaoMunicipioId: z.number(),
});

type FormValuesType = z.infer<typeof schema>;

export function CUProdutoUnidade({
  recordIdToEdit,
  axiosInstance,
  empresaAnoFiscalId,
  planoProdutoId,
  ...disclousure
}: Props) {
  const isEdition = recordIdToEdit > 0;
  const {
    register,
    formState: { isSubmitting, errors },
    reset,
    handleSubmit,
  } = useForm<FormValuesType>({
    defaultValues: {
      empresaAnoFiscalId,
    },
  });

  const queriesConfig = {
    API_Instance: axiosInstance,
    pageSize: 100000,
  };

  const { data: produtos } = useProdutos({
    ...queriesConfig,
    planoId: planoProdutoId,
  });
  const { data: unidadesNegocio } = useUnidadeNegocio(queriesConfig);
  const { data: atividadesEconomicas } = useAtividadesEconomicas({
    axiosInstance,
    id: planoProdutoId,
  });
  const { data: codigoTributacao } = useCodigoTributacaoMunicipios({
    axiosInstance,
    id: planoProdutoId,
  });

  const [produtosQuery, setProdutosQuery] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<TAutocompleteOption>();

  const produtosWithMatchedQuery = produtos?.data
    .filter(produto => {
      const codigoProduto = produto.codigo.toLowerCase();
      const nomeProduto = produto.nome.toLowerCase();
      const query = produtosQuery.toLowerCase();

      return nomeProduto.includes(query) || codigoProduto.includes(query);
    })
    .slice(0, 20);

  const queryClient = useQueryClient();

  const closeAndReset = () => {
    disclousure.onClose();
    reset();
    setProdutosQuery('');
  };

  const onFormSubmit = async (values: FormValuesType) => {
    values.produtoId = produtoSelecionado?.id ?? 0;
    await axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'produtos/produtos-unidades',
    })
      .then(async () => {
        await queryClient.invalidateQueries(['produtos-unidades']);
        toast.success('Produto vinculado');
        closeAndReset();
      })
      .catch(getRequestErrorToast);
  };

  // useEffect(() => {
  //   if (produtoSelecionado) setValue('produtoId', produtoSelecionado.id);
  // }, [produtoSelecionado, setValue]);

  return (
    <Dialog
      {...disclousure}
      onClose={closeAndReset}
      title={
        isEdition
          ? `Editar produto por unidade - ID ${recordIdToEdit}`
          : 'Criar produto por unidade'
      }
    >
      <form
        className="grid w-[50vw] grid-cols-2"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Autocomplete
          label="Produto"
          options={produtosWithMatchedQuery?.map(x => ({
            id: x.id,
            name: `${x.codigo} - ${x.nome}`,
          }))}
          inputProps={{
            ...register('produtoId'),
            placeholder: 'Digite o nome ou código do produto',
          }}
          isSearchingOptions={false}
          query={produtosQuery}
          setQuery={setProdutosQuery}
          selectedValue={produtoSelecionado}
          setSelectedValue={setProdutoSelecionado}
          error={errors.produtoId}
        />
        <Select
          {...register('unidadeNegocioId', { valueAsNumber: true })}
          label="Unid. Negócio"
          options={unidadesNegocio?.options}
          error={errors.unidadeNegocioId}
        />
        <Select
          {...register('atividadeEconomicaId', { valueAsNumber: true })}
          label="Ativ. Econômica"
          options={atividadesEconomicas?.options}
          error={errors.atividadeEconomicaId}
        />
        <Select
          {...register('codigoTributacaoMunicipioId', { valueAsNumber: true })}
          label="Cód. Tributação Municipal"
          options={codigoTributacao?.options}
          error={errors.codigoTributacaoMunicipioId}
        />
        <SaveFormButton isSubmitting={isSubmitting} />
      </form>
    </Dialog>
  );
}

// export default CUProdutoUnidade;
// function useAppConfigStore(arg0: (s: any) => any) {
//   throw new Error('Function not implemented.');
// }
