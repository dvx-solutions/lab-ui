import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { SaveFormButton } from '+/components/buttons';
import { Checkbox, Input, Select, Textarea } from '+/components/form';
import { Spinner } from '+/components/Spinner';
import {
  useAgrupadores,
  usePlanos,
  useProdutoPorId,
  useTabelasBasicas,
  useTiposProdutos,
} from '+/hooks';
import { useNaturezaProdutos } from '+/hooks/react-query/produto/natureza-produtos';
import { getRequestErrorToast } from '+/lib';
import { ETipoPlano } from '+/types';

const schema = z.object({
  agrupadorId: z.number(),
  ativo: z.boolean(),
  codigo: z.string().min(1).max(16, 'Máximo de caracteres aceitos: 16'),
  codigoFormulario: z.union([z.string(), z.undefined()]),
  combo: z.boolean(),
  descricao: z.string().min(1),
  homologado: z.boolean(),
  inicioValidade: z.string(),
  naturezaProdutoId: z.number(),
  nome: z.string().min(1),
  planoId: z.number(),
  possuiFicha: z.boolean(),
  superiorId: z.union([z.number(), z.undefined()]),
  terminoValidade: z.union([z.string(), z.undefined()]),
  tipoProdutoId: z.number(),
  unidadeMedidaId: z.number(),
});

type FormValuesType = z.infer<typeof schema>;

interface Props {
  axiosInstance: AxiosInstance;
  isModalOpen: boolean;
  recordIdToEdit: number;
}

export function InformacoesBasicasTab({
  axiosInstance,
  isModalOpen,
  recordIdToEdit,
}: Props) {
  const { data: naturezaParaEditar, isLoading: isLoadingNaturezaParaEditar } =
    useProdutoPorId({ axiosInstance, id: recordIdToEdit });
  const queryClient = useQueryClient();
  const isEdition = recordIdToEdit > 0;
  const [isActive, setIsActive] = useState(true);

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<FormValuesType>({
    mode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      ativo: true,
      codigoFormulario: undefined,
      inicioValidade: format(new Date(), 'yyyy-MM-dd'),
      superiorId: undefined,
      terminoValidade: undefined,
    },
  });

  const [selectedPlan, setSelectedPlan] = useState(0);

  const resetForm = () => {
    reset();
    setIsActive(true);
  };

  const { data: planos } = usePlanos({
    API_Instance: axiosInstance,
    pageSize: 100000,
    tipoPlano: ETipoPlano.Produto,
  });
  const { data: agrupadores } = useAgrupadores({
    planoId: selectedPlan,
    API_Instance: axiosInstance,
  });
  const { data: naturezasProduto } = useNaturezaProdutos({
    API_Instance: axiosInstance,
  });
  const { data: tiposProdutos } = useTiposProdutos({
    API_Instance: axiosInstance,
  });

  const { data: unidadesMedida } = useTabelasBasicas({
    API_Instance: axiosInstance,
    pageSize: 100000,
    rota: 'unidades-medidas',
  });

  const [renderCodigoForm, setRenderCodigoForm] = useState(false);

  const onFormSubmit = async (values: FormValuesType) => {
    await axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'produtos/produtos',
    })
      .then(async () => {
        await queryClient.invalidateQueries(['produtos']);
        resetForm();
        toast.success('Produto salvo');
      })
      // .catch(({ response }: AxiosError) => getRequestErrorToast(response));
      .catch(error => getRequestErrorToast(error));
  };

  useEffect(() => {
    if (!isEdition && planos?.options.length === 1) {
      const toSet = Number(planos.options[0].value);
      setValue('planoId', toSet);
      setSelectedPlan(toSet);
    }
  }, [isEdition, planos?.options, setValue]);

  useEffect(() => {
    if (isModalOpen)
      if (naturezaParaEditar) {
        console.log(
          '⌨️ ~ file: InformacoesBasica.tsx ~ line 138 ~ useEffect ~ naturezaParaEditar',
          naturezaParaEditar
        );
        Object.entries(naturezaParaEditar).forEach(([key, value]) => {
          const typedKey = key as keyof FormValuesType;
          if (typedKey.includes('Validade')) {
            setValue(
              typedKey,
              format(new Date(value.toString()), 'yyyy-MM-dd')
            );
          } else {
            setValue(typedKey, value.toString());
          }
        });

        setIsActive(naturezaParaEditar.ativo);
        setSelectedPlan(naturezaParaEditar.planoId);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isModalOpen,
    naturezaParaEditar,
    naturezasProduto?.options,
    planos?.options,
    tiposProdutos?.options,
    unidadesMedida?.options,
  ]);

  if (isLoadingNaturezaParaEditar) {
    return <Spinner />;
  }

  return (
    <form
      className="grid h-[80vh] w-[60vw] grid-cols-4 items-end overflow-auto"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="col-span-full grid grid-cols-3 gap-4">
        <Input
          {...register('codigo')}
          disabled={isEdition}
          error={errors.codigo}
          label="Código"
        />
        <div className="col-span-2">
          <Input error={errors.nome} {...register('nome')} label="Nome" />
        </div>
      </div>
      <div className="col-span-full">
        <Textarea
          {...register('descricao')}
          error={errors.descricao}
          label="Descrição"
        />
      </div>
      <Select
        {...register('planoId', {
          valueAsNumber: true,
          onChange(event) {
            setSelectedPlan(Number(event.target.value));
          },
        })}
        error={errors.planoId}
        label="Plano"
        options={planos?.options}
      />
      <Select
        {...register('agrupadorId', { valueAsNumber: true })}
        error={errors.agrupadorId}
        label="Agrupador"
        options={agrupadores?.options}
      />
      <Select
        {...register('tipoProdutoId', { valueAsNumber: true })}
        error={errors.tipoProdutoId}
        label="Tipo do produto"
        options={tiposProdutos?.options}
      />
      <Select
        {...register('unidadeMedidaId', { valueAsNumber: true })}
        error={errors.unidadeMedidaId}
        label="Unidade de medida"
        options={unidadesMedida?.options}
      />{' '}
      <Select
        {...register('naturezaProdutoId', {
          valueAsNumber: true,
          onChange(event) {
            const value = Number(event.target.value);
            const natureza = naturezasProduto?.data.find(x => x.id === value);
            setRenderCodigoForm(!!natureza?.planoSmd);
          },
        })}
        error={errors.naturezaProdutoId}
        label="Natureza do produto"
        options={naturezasProduto?.options}
      />
      {renderCodigoForm && (
        <Input
          {...register('codigoFormulario')}
          error={errors.codigoFormulario}
          label="Código do formulário"
        />
      )}
      <div className="col-span-full flex items-end gap-4">
        <Checkbox {...register('combo')} error={errors.combo} label="Combo" />
        <Checkbox
          {...register('homologado')}
          error={errors.homologado}
          label="Homologado"
        />
        <Checkbox
          {...register('possuiFicha')}
          error={errors.possuiFicha}
          label="Possui ficha"
        />
        <Checkbox
          error={errors.ativo}
          {...register('ativo', {
            onChange(event) {
              setIsActive(event.target.checked);
            },
          })}
          label="Ativo"
        />
      </div>
      <div className="col-span-full flex items-end gap-4">
        <Input
          {...register('inicioValidade')}
          error={errors.inicioValidade}
          label="Início da validade"
          type="date"
        />
        <Input
          {...register('terminoValidade')}
          disabled={isActive}
          error={errors.terminoValidade}
          label="Término da validade"
          type="date"
        />
      </div>
      <SaveFormButton isSubmitting={isSubmitting} />
    </form>
  );
}
