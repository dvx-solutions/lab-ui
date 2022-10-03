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
import { useNaturezasProdutosTiposDescritivosPorId } from '+/hooks';
import { useNaturezaProdutos } from '+/hooks/react-query/produto/natureza-produtos';
import { getRequestErrorToast } from '+/lib';

import { Dialog, DialogDisclosureProps } from '../_general';

export const formSchema = z.object({
  ativo: z.boolean(),
  descricao: z.string().min(1),
  id: z.union([z.number(), z.undefined()]),
  inicioValidade: z.string().min(1),
  naturezaProdutoId: z.number(),
  nome: z.string().min(1),
  obrigatorio: z.boolean(),
  sequencia: z.number(),
  terminoValidade: z.union([z.string(), z.undefined()]),
});

type FormValuesType = z.infer<typeof formSchema>;

interface Props extends DialogDisclosureProps {
  recordIdToEdit: number;
  axiosInstance: AxiosInstance;
}

export function NaturezasProdutosTiposDescritivos({
  recordIdToEdit,
  axiosInstance,
  ...disclousure
}: Props) {
  const [isActive, setIsActive] = useState(true);

  const queryClient = useQueryClient();

  const { data: naturezasProdutos } = useNaturezaProdutos({
    API_Instance: axiosInstance,
  });
  const {
    data: registroParaEditar,
    isLoading: isLoadingRegistroParaEditar,
    refetch: refetchRegistroParaEditar,
  } = useNaturezasProdutosTiposDescritivosPorId({
    axiosInstance,
    id: recordIdToEdit,
  });

  const isEdition = recordIdToEdit > 0;

  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormValuesType>({
    defaultValues: { ativo: true, terminoValidade: undefined },
    resolver: zodResolver(formSchema),
  });

  const closeModalAndResetForm = () => {
    disclousure.onClose();
    reset();
    setIsActive(true);
  };

  const onSubmit = async (values: FormValuesType) =>
    axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'produtos/naturezas-produtos-tipos-descritivos',
    })
      .then(async () => {
        await queryClient.invalidateQueries();
        closeModalAndResetForm();
        toast.success('Descritivo de produto salvo');
      })
      .catch(getRequestErrorToast);

  useEffect(() => {
    if (registroParaEditar) {
      Object.entries(registroParaEditar).forEach(([key, value]) => {
        const typedKey = key as keyof FormValuesType;
        if (typedKey.includes('Validade')) {
          setValue(typedKey, format(new Date(value), 'yyyy-MM-dd'));
        } else {
          setValue(typedKey, value);
        }
      });
    }
  }, [registroParaEditar, naturezasProdutos?.options, setValue]);

  useEffect(() => {
    refetchRegistroParaEditar();
  }, [refetchRegistroParaEditar]);

  return (
    <Dialog
      {...disclousure}
      onClose={closeModalAndResetForm}
      title={
        isEdition
          ? `Editar descritivo de produto - ID ${recordIdToEdit}`
          : 'Criar descritivo de produto'
      }
    >
      {isLoadingRegistroParaEditar ? (
        <Spinner />
      ) : (
        <form
          className="grid min-w-[35vw] grid-cols-3 items-end"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('sequencia', { valueAsNumber: true })}
            error={errors.sequencia}
            label="Sequência"
            type="number"
          />
          <div className="col-span-2">
            <Input {...register('nome')} error={errors.nome} label="Nome" />
          </div>
          <div className="col-span-full">
            <Textarea
              {...register('descricao')}
              error={errors.descricao}
              label="Descrição"
            />
          </div>
          <Select
            {...register('naturezaProdutoId', { valueAsNumber: true })}
            error={errors.naturezaProdutoId}
            label="Natureza do produto"
            options={naturezasProdutos?.options}
          />
          <Checkbox
            {...register('obrigatorio')}
            error={errors.obrigatorio}
            label="Obrigatório"
          />
          <Checkbox
            {...register('ativo', {
              onChange(event) {
                setIsActive(event.target.checked);
                if (event.target.checked) {
                  setValue('terminoValidade', undefined);
                }
              },
            })}
            error={errors.ativo}
            label="Ativo"
          />
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

export default NaturezasProdutosTiposDescritivos;
