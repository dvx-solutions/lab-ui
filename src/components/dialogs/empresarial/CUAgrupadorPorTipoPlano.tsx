import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Checkbox,
  Dialog,
  DialogDisclosureProps,
  Input,
  SaveFormButton,
  Select,
  Textarea,
} from '+/components';
import { useAgrupadores, useAgrupadorPorId, usePlanos } from '+/hooks';
import { getRequestErrorToast } from '+/lib';
import { ETipoPlano } from '+/types';

interface CUAgrupadorPorTipoPlanoProps extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  queryClientInstance: QueryClient;
  recordIdToEdit: number;
  tipoPlano: ETipoPlano;
}

const schema = z.object({
  ativo: z.boolean(),
  codigo: z.string().min(1).max(16),
  descricao: z.string().min(1),
  inicioValidade: z.string().min(1),
  nome: z.string().min(1),
  planoId: z.number().nonnegative(),
  superiorId: z.union([z.number(), z.undefined()]),
  terminoValidade: z.string(),
});

export type AgrupadorFormValuesType = z.infer<typeof schema>;

export function CUAgrupadorPorTipoPlano({
  axiosInstance,
  recordIdToEdit,
  tipoPlano,
  queryClientInstance,
  ...disclousure
}: CUAgrupadorPorTipoPlanoProps) {
  const isEdition = recordIdToEdit > 0;
  const modalTitle = isEdition
    ? `Editar agrupador de ${ETipoPlano[
        tipoPlano
      ].toLowerCase()} - ID ${recordIdToEdit}`
    : `Criar agrupador de ${ETipoPlano[tipoPlano].toLowerCase()}`;

  const { data: registroParaEditar } = useAgrupadorPorId({
    id: recordIdToEdit,
    axiosInstance,
  });

  const [planoId, setPlanoId] = useState(0);

  const { data: planos } = usePlanos({
    API_Instance: axiosInstance,
    pageSize: 100000,
    tipoPlano,
  });

  const { data: superiores } = useAgrupadores({
    API_Instance: axiosInstance,
    nivel: 1,
    planoId,
  });

  const {
    formState: { isSubmitting, errors },
    register,
    reset,
    handleSubmit,
    setValue,
  } = useForm<AgrupadorFormValuesType>({
    resolver: zodResolver(schema),
    defaultValues: {
      superiorId: undefined,
    },
  });

  const closeModalAndReset = () => {
    disclousure.onClose();
    setPlanoId(0);
    reset();
  };

  const onSubmitRequest = async (values: AgrupadorFormValuesType) => {
    await axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'empresarial/agrupadores',
    })
      .then(async () => {
        await queryClientInstance.invalidateQueries();
        toast.success(`Agrupador ${ETipoPlano[tipoPlano].toLowerCase()} salvo`);
        closeModalAndReset();
      })
      .catch(getRequestErrorToast);
  };

  useEffect(() => {
    if (registroParaEditar) {
      Object.entries(registroParaEditar.data).forEach(([key, value]) => {
        const typedKey = key as keyof AgrupadorFormValuesType;

        if (typedKey.includes('Validade')) {
          setValue(typedKey, format(new Date(value), 'yyyy-MM-dd'));
        } else {
          setValue(typedKey, value);
        }
      });
    }
  }, [registroParaEditar, setValue]);

  return (
    <Dialog {...disclousure} title={modalTitle}>
      <form
        className="grid w-[60vw] grid-cols-3 items-end"
        onSubmit={handleSubmit(onSubmitRequest)}
      >
        <Input {...register('codigo')} label="Código" error={errors.codigo} />
        <div className="col-span-2">
          <Input {...register('nome')} label="Nome" error={errors.nome} />
        </div>
        <div className="col-span-full">
          <Textarea
            {...register('descricao')}
            error={errors.descricao}
            label="Descrição"
          />
        </div>
        <Checkbox {...register('ativo')} label="Ativo" error={errors.ativo} />
        <Input
          {...register('inicioValidade')}
          error={errors.inicioValidade}
          label="Início da validade"
          type="date"
        />
        <Input
          {...register('terminoValidade')}
          error={errors.terminoValidade}
          label="Término da validade"
          type="date"
        />
        <Select
          {...register('planoId', {
            valueAsNumber: true,
            onChange(event) {
              setPlanoId(Number(event.target.value));
            },
          })}
          error={errors.planoId}
          label="Plano"
          options={planos?.options}
        />
        <Select
          {...register('superiorId', { valueAsNumber: true })}
          error={errors.superiorId}
          label="Superior"
          options={superiores?.options}
        />

        <SaveFormButton isSubmitting={isSubmitting} />
      </form>
    </Dialog>
  );
}
