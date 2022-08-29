import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Checkbox,
  Dialog,
  DialogProps,
  Input,
  Select,
  Spinner,
} from '+/components';
import { customErrorMap, convertEnumToSelectOptions } from '+/lib';
import {
  EPessoaContribuinte,
  EPorteEstabelecimento,
  IAPIResponse,
  IPessoaJuridica,
} from '+/types';

const schema = z.object({
  cnpj: z
    .string()
    .min(14, { message: 'CNPJ inválido' })
    .max(14, { message: 'CNPJ inválido' }),
  industria: z.boolean(),
  pessoaContribuinte: z.number(),
  quantidadeEmpregados: z.number(),
  porteEstabelecimento: z.number(),
});

export type TCriarPJFormValues = z.infer<typeof schema>;

export interface CUPessoaJuridicaProps extends DialogProps {
  axiosInstance: AxiosInstance;
  dialogTitle?: string;
  onSubmitError: (error: AxiosError) => Promise<void> | void;
  onSubmitSuccess: () => Promise<void>;
  registryIdToEdit?: number;
}

export function CUPessoaJuridica({
  axiosInstance,
  dialogTitle = 'Cadastrar pessoa jurídica',
  isOpen,
  onClose,
  onOpen,
  onSubmitError,
  onSubmitSuccess,
  registryIdToEdit = -1,
}: CUPessoaJuridicaProps) {
  const { data: registerToEdit, isFetching: isFetchingRegisterToEdit } =
    useQuery(['pessoas-juridicas', `id-${registryIdToEdit}`], async () => {
      if (registryIdToEdit <= 0) return null;

      const { data: res } = await axiosInstance.get<
        IAPIResponse<IPessoaJuridica>
      >(`pessoas/pessoas-juridicas/${registryIdToEdit}`);

      return res.data;
    });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<TCriarPJFormValues>({
    resolver: zodResolver(schema),
  });

  const onFormSubmit = async (values: TCriarPJFormValues) => {
    await axiosInstance
      .post('pessoas/pessoas-juridicas', values)
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
    if (registerToEdit) {
      Object.entries(registerToEdit).forEach(([key, value]) => {
        setValue(key as keyof TCriarPJFormValues, value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerToEdit, isOpen]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
      onOpen={onOpen}
      title={dialogTitle}
    >
      {isFetchingRegisterToEdit && registryIdToEdit > 0 ? (
        <Spinner />
      ) : (
        <form
          className="grid min-w-[40vw] grid-cols-2 items-end rounded bg-white"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="col-span-full">
            <Input
              {...register('cnpj', { valueAsNumber: false })}
              disabled={registryIdToEdit > 0}
              error={errors.cnpj}
              label="CNPJ"
              type="number"
            />
          </div>

          <Input
            {...register('quantidadeEmpregados', { valueAsNumber: true })}
            error={errors.quantidadeEmpregados}
            label="Qtde. de empregados"
            type="number"
          />

          <Select
            {...register('porteEstabelecimento', { valueAsNumber: true })}
            error={errors.porteEstabelecimento}
            label="Porte do estabelecimento"
            options={convertEnumToSelectOptions(EPorteEstabelecimento)}
          />

          <Checkbox {...register('industria')} label="Industria" />

          <Select
            {...register('pessoaContribuinte', { valueAsNumber: true })}
            error={errors.pessoaContribuinte}
            label="Contribuinte"
            options={convertEnumToSelectOptions(EPessoaContribuinte)}
          />

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
