import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Checkbox,
  Dialog,
  DialogDisclosureProps,
  Input,
  SaveFormButton,
  Select,
  Spinner,
  Textarea,
} from '+/components';
import {
  usePlanos,
  useQuadros,
  useTemas,
  useTiposOrdensServicos,
} from '+/hooks';
import { useNaturezaProdutoPorId } from '+/hooks/react-query/produto/natureza-produtos';
import { convertEnumToSelectOptions, getRequestErrorToast } from '+/lib';
import { ENaturezaConsumo, EOrigemProduto, ETipoPlano } from '+/types';

const schema = z.object({
  ativo: z.boolean(),
  codigo: z.string().min(1).max(16, 'Máximo de caracteres aceitos: 16'),
  descricao: z.string().min(1),
  id: z.number().optional(),
  inicioValidade: z.string(),
  naturezaConsumo: z.number(),
  nome: z.string().min(1),
  origemProduto: z.number(),
  padraoConsumo: z.boolean(),
  planoId: z.number(),
  planoSmd: z.boolean(),
  possuiMeta: z.boolean(),
  quadroId: z.number(),
  sigla: z.string().min(1),
  temaId: z.number(),
  terminoValidade: z.string().optional(),
  tipoOrdemServicoId: z.number(),
});

type FormValuesType = z.infer<typeof schema>;

interface Props extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  empresaAnoFiscalId: number;
  recordIdToEdit: number;
  modulo: number | undefined;
}

export function CUNaturezaProduto({
  axiosInstance,
  empresaAnoFiscalId,
  recordIdToEdit,
  modulo = undefined,
  ...disclousure
}: Props) {
  const { data: naturezaParaEditar, isLoading: isLoadingNaturezaParaEditar } =
    useNaturezaProdutoPorId({ axiosInstance, id: recordIdToEdit });

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
      terminoValidade: undefined,
    },
  });

  const closeAndResetForm = () => {
    disclousure.onClose();
    reset();
    setIsActive(true);
  };

  const { data: planos } = usePlanos({
    API_Instance: axiosInstance,
    pageSize: 100000,
    tipoPlano: ETipoPlano.Produto,
  });

  const [selectedBoard, setSelectedBoard] = useState(0);

  const { data: quadros } = useQuadros({
    API_Instance: axiosInstance,
    empresaAnoFiscalId,
    modulo,
  });

  const { data: temas } = useTemas({
    API_Instance: axiosInstance,
    empresaAnoFiscalId,
    quadroId: selectedBoard,
  });

  const { data: tiposOrdensServico } = useTiposOrdensServicos({
    API_Instance: axiosInstance,
  });

  const queryClient = useQueryClient();

  const onFormSubmit = async (values: FormValuesType) => {
    await axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'produtos/naturezas-produtos',
    })
      .then(async () => {
        await queryClient.invalidateQueries(['naturezas-produtos']);
        toast.success('Natureza de produto');
        closeAndResetForm();
      })
      .catch(getRequestErrorToast);
  };

  useEffect(() => {
    if (!isEdition && planos?.options.length === 1)
      setValue('planoId', Number(planos.options[0].value));
  }, [isEdition, planos?.options, setValue]);

  useEffect(() => {
    if (naturezaParaEditar) {
      Object.entries(naturezaParaEditar).forEach(([key, value]) => {
        const typedKey = key as keyof FormValuesType;
        if (typedKey.includes('Validade')) {
          setValue(typedKey, format(new Date(value.toString()), 'yyyy-MM-dd'));
        } else {
          setValue(typedKey, value);
        }
      });

      setIsActive(naturezaParaEditar.ativo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    naturezaParaEditar,
    planos?.options,
    quadros?.options,
    temas?.options,
    tiposOrdensServico?.options,
  ]);

  return (
    <Dialog
      {...disclousure}
      onClose={closeAndResetForm}
      title={
        isEdition
          ? `Editar natureza de produto - ID ${recordIdToEdit}`
          : 'Criar natureza de produto'
      }
    >
      {isLoadingNaturezaParaEditar ? (
        <Spinner />
      ) : (
        <form
          className="grid max-h-[85vh] w-full min-w-[60vw] grid-cols-4 items-end overflow-auto"
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
          <Input error={errors.sigla} {...register('sigla')} label="Sigla" />
          <Select
            {...register('naturezaConsumo', { valueAsNumber: true })}
            error={errors.naturezaConsumo}
            label="Natureza de consumo"
            options={convertEnumToSelectOptions(ENaturezaConsumo)}
          />
          <Select
            {...register('origemProduto', { valueAsNumber: true })}
            error={errors.origemProduto}
            label="Origem do produto"
            options={convertEnumToSelectOptions(EOrigemProduto)}
          />
          <Select
            {...register('planoId', { valueAsNumber: true })}
            error={errors.planoId}
            label="Plano"
            options={planos?.options}
          />
          <Select
            {...register('quadroId', {
              valueAsNumber: true,
              onChange(event) {
                setSelectedBoard(Number(event.target.value));
              },
            })}
            error={errors.quadroId}
            label="Quadro"
            options={quadros?.options}
          />

          <Select
            {...register('temaId', { valueAsNumber: true })}
            error={errors.temaId}
            label="Tema"
            options={temas?.options}
          />
          <Select
            {...register('tipoOrdemServicoId', { valueAsNumber: true })}
            error={errors.tipoOrdemServicoId}
            label="Tipo da ordem de serviço"
            options={tiposOrdensServico?.options}
          />

          <div className="col-span-full flex items-end gap-4">
            <Checkbox
              {...register('padraoConsumo')}
              error={errors.padraoConsumo}
              label="Padrão de consumo"
            />
            <Checkbox
              {...register('planoSmd')}
              error={errors.planoSmd}
              label="Plano SMD"
            />
            <Checkbox
              {...register('possuiMeta')}
              error={errors.possuiMeta}
              label="Possui meta"
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
      )}
    </Dialog>
  );
}
