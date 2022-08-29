import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { z } from 'zod';

import { Button, Input, Select, Checkbox } from '+/components';
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

export interface CUPessoaJuridicaProps {
  axiosInstance: AxiosInstance;
  dialogTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
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
  const { data: registerToEdit } = useQuery(
    ['pessoas-juridicas', `id-${registryIdToEdit}`],
    async () => {
      if (registryIdToEdit <= 0) return null;

      const { data: res } = await axiosInstance.get<
        IAPIResponse<IPessoaJuridica>
      >(`pessoas/pessoas-juridicas/${registryIdToEdit}`);

      return res.data;
    }
  );

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<TCriarPJFormValues>({
    resolver: zodResolver(schema),
  });

  const handleStateChange = (state: boolean) => {
    if (state) {
      onOpen();
    } else {
      onClose();
      reset();
    }
  };

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
    <Dialog.Root open={isOpen} onOpenChange={handleStateChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/25" />

      <Dialog.Content className="fixed top-2/4 left-2/4 w-fit min-w-[25vw] -translate-y-2/4 -translate-x-2/4 rounded bg-white p-4 shadow-md">
        <Dialog.Title className="mb-4 flex items-center justify-between gap-16 text-xl font-medium">
          {dialogTitle}
          <Dialog.Close>
            <Button className="rounded-full p-1 transition-all duration-300 hover:bg-brand-primary hover:text-brand-text-primary">
              <FiX />
            </Button>
          </Dialog.Close>
        </Dialog.Title>

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
      </Dialog.Content>
    </Dialog.Root>
  );
}
