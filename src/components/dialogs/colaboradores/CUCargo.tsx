import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, AxiosInstance } from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiPercent } from 'react-icons/fi';
import { z } from 'zod';

import { Button } from '+/components/buttons';
import { Dialog, DialogDisclosureProps } from '+/components/dialogs/Dialog';
import { Checkbox } from '+/components/form';
import { Input } from '+/components/form/Input';
import { Select } from '+/components/form/Select';
import { Spinner } from '+/components/Spinner';
import { useGruposCargo } from '+/hooks';
import { useCargoPorId } from '+/hooks/react-query/colaboradores/cargo';
import { convertEnumToSelectOptions } from '+/lib';
import { customErrorMap } from '+/lib/zod';
import { ETipoCargo, ETipoSalarioCargo } from '+/types';

const schema = z.object({
  ativo: z.boolean(),
  codigo: z.string().min(1).max(16),
  docente: z.boolean(),
  grupoCargoId: z.number().positive(),
  inicioValidade: z.date().optional(),
  nome: z.string().min(1),
  percentualInsalubridade: z.number().nonnegative().optional(),
  percentualPericulosidade: z.number().nonnegative().optional(),
  terminoValidade: z.date().optional(),
  tipoCargo: z.number().positive().optional(),
  tipoSalario: z.number().positive(),
});

export type TCriarCargoFormValues = z.infer<typeof schema>;

export interface CUCargoProps extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  empresaId: number;
  onSubmitError: (error: AxiosError) => Promise<void> | void;
  onSubmitSuccess: () => Promise<void>;
  recordIdToEdit?: number;
}

export function CUCargo({
  axiosInstance,
  isOpen,
  onClose,
  onOpen,
  onSubmitError,
  onSubmitSuccess,
  recordIdToEdit = -1,
  empresaId,
}: CUCargoProps) {
  const isEdition = recordIdToEdit > 0;

  const { data: cargoParaEditar, isFetching: isFetchingCargoParaEditar } =
    useCargoPorId({
      id: recordIdToEdit,
      axiosInstance,
    });

  const { data: gruposCargo } = useGruposCargo({
    API_Instance: axiosInstance,
    empresaId,
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
  } = useForm<TCriarCargoFormValues>({
    resolver: zodResolver(schema),
  });

  const [formFieldsDisabled, setFormFieldsDisabled] = useState({
    grupoCargoId: false,
    terminoValidade: true,
  });

  const handleFieldChangeState = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) => {
      const valueAsNumber = Number(target.value);

      switch (target.name as keyof TCriarCargoFormValues) {
        case 'tipoSalario': {
          const isMenorAprendiz =
            getValues('tipoCargo') === ETipoCargo['Menor aprendiz'];

          setFormFieldsDisabled(curr => ({
            ...curr,
            grupoCargoId:
              isMenorAprendiz || valueAsNumber === ETipoSalarioCargo.Horista,
          }));

          break;
        }

        case 'tipoCargo': {
          const isHorista =
            getValues('tipoSalario') === ETipoSalarioCargo.Horista;

          setFormFieldsDisabled(curr => ({
            ...curr,
            grupoCargoId:
              isHorista || valueAsNumber === ETipoCargo['Menor aprendiz'],
          }));

          break;
        }

        default: {
          break;
        }
      }
    },
    [getValues]
  );

  const handleResetFormAndCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onFormSubmit = async (values: TCriarCargoFormValues) => {
    return axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: 'colaboradores/cargos',
    })
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  useEffect(() => {
    z.setErrorMap(customErrorMap);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('⌨️ ~ file: CUPessoaJuridica.tsx ~ errors', errors);
  }, [errors]);

  useEffect(() => {
    if (cargoParaEditar) {
      Object.entries(cargoParaEditar).forEach(([key, value]) => {
        setValue(key as keyof TCriarCargoFormValues, value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargoParaEditar, isOpen, gruposCargo?.data]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleResetFormAndCloseModal}
      onOpen={onOpen}
      title={
        isEdition ? `Editar cargo - ID ${recordIdToEdit}` : 'Adicionar cargo'
      }
    >
      {isFetchingCargoParaEditar ? (
        <Spinner />
      ) : (
        <form
          className="grid w-[60vw] grid-cols-3"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input {...register('codigo')} label="Código" disabled={isEdition} />
          <div className="col-span-2">
            <Input {...register('nome')} label="Nome" />
          </div>
          <Select
            {...register('tipoSalario', { valueAsNumber: true })}
            label="Tipo do salário"
            options={convertEnumToSelectOptions({
              Mensalista: ETipoSalarioCargo.Mensalista,
              Horista: ETipoSalarioCargo.Horista,
            })}
            onChange={handleFieldChangeState}
          />
          <Select
            {...register('tipoCargo', {
              valueAsNumber: true,
            })}
            label="Tipo do cargo"
            options={convertEnumToSelectOptions(ETipoCargo, [
              ETipoCargo.Autônomo,
              ETipoCargo['Função de confiança'],
            ])}
            onChange={handleFieldChangeState}
          />
          <Select
            {...register('grupoCargoId', { valueAsNumber: true })}
            label="Grupo de cargo"
            options={gruposCargo?.options ?? null}
            disabled={formFieldsDisabled.grupoCargoId}
          />

          <div className="flex items-center justify-center">
            <Checkbox
              {...register('ativo')}
              label="Ativo"
              onChange={({ target: { checked } }) =>
                setFormFieldsDisabled(curr => ({
                  ...curr,
                  terminoValidade: checked,
                }))
              }
            />

            <Checkbox {...register('docente')} label="Docente" />
          </div>
          <Input
            {...register('inicioValidade')}
            label="Início da validade"
            type="date"
          />
          <Input
            {...register('terminoValidade')}
            disabled={formFieldsDisabled.terminoValidade}
            label="Término da validade"
            type="date"
          />

          <div className="col-span-full grid grid-cols-2 gap-4">
            <Input
              {...register('percentualInsalubridade', { valueAsNumber: true })}
              label="Insalubridade"
              type="number"
              rightIcon={<FiPercent />}
              placeholder="0"
            />
            <Input
              {...register('percentualPericulosidade', { valueAsNumber: true })}
              label="Periculosidade"
              type="number"
              rightIcon={<FiPercent />}
              placeholder="0"
            />
          </div>
          <div className="col-span-full flex justify-end">
            <Button
              className="primary-button"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
