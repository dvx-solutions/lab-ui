import { AxiosInstance } from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Checkbox, Input, SaveFormButton, Spinner } from '+/components';
import { getRequestErrorToast } from '+/lib';
import { IAPIResponse, ITabelaBasica } from '+/types';

import { Dialog, DialogDisclosureProps } from '..';

interface Props extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  postRoute: string;
  putRoute?: string;
  queryClientInstance: QueryClient;
  queryToInvalidate: string;
  recordIdToEdit: number;
  tableName: string;
}

type TFormValues = {
  ativo: boolean;
  codigo: string;
  id: number | undefined;
  inicioValidade: string;
  nome: string;
  terminoValidade: string | undefined;
};

export function CUTabelaBasica({
  axiosInstance,
  isOpen,
  onClose,
  onOpen,
  postRoute,
  putRoute = postRoute,
  queryClientInstance,
  queryToInvalidate,
  recordIdToEdit,
  tableName,
}: Props) {
  const isEdition = recordIdToEdit > 0;

  const {
    data: recordToEdit,
    isFetching: isFetchingRecordToEdit,
    refetch: refetchRecordToEdit,
  } = useQuery(
    [queryToInvalidate, `ID-${recordIdToEdit}`],
    () =>
      axiosInstance
        .get<IAPIResponse<ITabelaBasica>>(`${postRoute}/${recordIdToEdit}`)
        .then(({ data }) => data),
    {
      enabled: isEdition,
    }
  );

  const [isActive, setIsActive] = useState(true);

  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<TFormValues>({
    mode: 'all',
    defaultValues: {
      ativo: true,
      inicioValidade: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const closeModalAndResetForm = () => {
    onClose();
    reset();
    setIsActive(true);
  };

  const onFormSubmitRequest = async (values: TFormValues) => {
    await axiosInstance({
      data: values,
      method: isEdition ? 'PUT' : 'POST',
      url: isEdition ? putRoute : postRoute,
    })
      .then(async () => {
        await queryClientInstance.invalidateQueries([queryToInvalidate]);
        toast.success(isEdition ? 'Registro editado' : 'Registro criado');
        closeModalAndResetForm();
      })
      .catch(getRequestErrorToast);
  };

  useEffect(() => {
    if (recordToEdit?.data) {
      const { data } = recordToEdit;
      Object.entries(data).forEach(([key, value]) => {
        const typedKey = key as keyof TFormValues;
        if (key.includes('Validade')) {
          setValue(typedKey, format(new Date(value), 'yyyy-MM-dd'));
        } else {
          setValue(typedKey, value);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, recordToEdit]);

  useEffect(() => {
    refetchRecordToEdit();
  }, [refetchRecordToEdit]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={closeModalAndResetForm}
      onOpen={onOpen}
      title={
        isEdition
          ? `Editar ${tableName.toLowerCase()} - ID ${recordIdToEdit}`
          : `Adicionar ${tableName.toLowerCase()}`
      }
    >
      {isFetchingRecordToEdit && isEdition ? (
        <Spinner />
      ) : (
        <form
          className="grid w-[60vw] grid-cols-3 items-end gap-4"
          onSubmit={handleSubmit(onFormSubmitRequest)}
        >
          <Input {...register('codigo')} disabled={isEdition} label="Código" />
          <div className="col-span-2">
            <Input {...register('nome')} label="Nome" />
          </div>
          <Checkbox
            {...register('ativo', {
              onChange: e => {
                setIsActive(e.target.checked);
                if (e.target.checked) setValue('terminoValidade', undefined);
              },
            })}
            label="Ativo"
          />
          <Input
            {...register('inicioValidade')}
            label="Início da validade"
            type="date"
          />
          <Input
            {...register('terminoValidade')}
            disabled={isActive}
            label="Término da validade"
            type="date"
          />

          <SaveFormButton isSubmitting={isSubmitting} />
        </form>
      )}
    </Dialog>
  );
}

export default CUTabelaBasica;
