import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlus, FiX } from 'react-icons/fi';
import { z } from 'zod';

import { Button, Input, Select, Checkbox } from '+/components';
import { customErrorMap, convertEnumToSelectOptions } from '+/lib';
import { EPorteEstabelecimento, EPessoaContribuinte } from '+/types';

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
  onSubmitError: (error: AxiosError) => Promise<void> | void;
  onSubmitSuccess: () => Promise<void>;
}

export function CUPessoaJuridica({
  axiosInstance,
  onSubmitError,
  onSubmitSuccess,
}: CUPessoaJuridicaProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
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

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button rightIcon={<FiPlus />} className="primary-button">
          Adicionar PJ
        </Button>
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/25" />

      <Dialog.Content className="fixed top-2/4 left-2/4 w-fit min-w-[25vw] -translate-y-2/4 -translate-x-2/4 rounded bg-white p-4 shadow">
        <Dialog.Title className="mb-4 flex items-center justify-between gap-16 text-xl font-medium">
          Criar pessoa jurídica
          <Dialog.Close>
            <Button className="rounded-full p-1 transition-all duration-300 hover:bg-brand-primary hover:text-brand-text-primary">
              <FiX />
            </Button>
          </Dialog.Close>
        </Dialog.Title>

        <form
          className="grid grid-cols-2 rounded bg-white p-4 shadow"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="col-span-full">
            <Input
              {...register('cnpj', { valueAsNumber: false })}
              label="CNPJ"
              type="number"
              error={errors.cnpj}
            />
          </div>

          <Input
            {...register('quantidadeEmpregados')}
            label="Qtde. de empregados"
            type="number"
            error={errors.quantidadeEmpregados}
          />

          <Select
            {...register('porteEstabelecimento', { valueAsNumber: true })}
            label="Porte do estabelecimento"
            options={convertEnumToSelectOptions(EPorteEstabelecimento)}
            error={errors.porteEstabelecimento}
          />

          <Checkbox {...register('industria')} label="Industria" />

          <Select
            {...register('pessoaContribuinte', { valueAsNumber: true })}
            label="Contribuinte"
            options={convertEnumToSelectOptions(EPessoaContribuinte)}
            error={errors.pessoaContribuinte}
          />

          <div className="col-span-full flex justify-end">
            <Button type="submit" className="primary-button">
              Salvar
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
