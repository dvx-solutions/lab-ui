import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { Dialog, DialogDisclosureProps } from '+/components';
import { SaveFormButton } from '+/components/buttons';
import { Checkbox, Input, Select } from '+/components/form';
import { Spinner } from '+/components/Spinner';
import { customErrorMap, convertEnumToSelectOptions } from '+/lib';
import {
  EDeficiencia,
  EGenero,
  EPessoaContribuinte,
  EPorteEstabelecimento,
  ERaca,
  IAPIResponse,
  IPessoaFisica,
} from '+/types';

export interface CUPessoaFisicaProps extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  dialogTitle: string;
  onSubmitError: (error: AxiosError) => Promise<void> | void;
  onSubmitSuccess: () => Promise<void>;
  registryIdToEdit?: number;
}

const schema = z.object({
  cpf: z
    .string()
    .min(11, { message: 'CPF inválido' })
    .max(11, { message: 'CPF inválido' }),
  nome: z.string(),
  dataNascimento: z.string(),
  naturalidade: z.string(),
  pessoaFisicaTratadaComoJuridica: z.boolean(),
  pessoaContribuinte: z.number(),
  quantidadeEmpregados: z.number(),
  porteEstabelecimento: z.number(),
  genero: z.number().optional(),
  raca: z.number().optional(),
  industria: z.boolean(),
  deficiencia: z.number().optional(),
  nomePai: z.string().optional(),
  nomeMae: z.string().optional(),
  nomeResponsavel: z.string().optional(),
  numeroGfip: z.string().optional(),
  numeroRG: z.string().min(7, { message: 'RG inválido' }),
  orgemExpeditorRG: z.string().min(1, { message: 'Campo obrigatório' }),
  dataEmissaoRG: z.string().min(1, { message: 'Campo obrigatório' }),
  numeroCtps: z.string().optional(),
  serieCtps: z.string().optional(),
  dataEmissaoCtps: z.string().optional(),
  ufCtps: z.string().optional(),
  numeroNIT: z.string().optional(),
  numeroPisPasep: z.string().optional(),
});

export type TCriarPFFormValues = z.infer<typeof schema>;

export function CUPessoaFisica({
  axiosInstance,
  dialogTitle = 'Cadastrar pessoa jurídica',
  onSubmitError,
  onSubmitSuccess,
  registryIdToEdit = -1,
  ...disclousure
}: CUPessoaFisicaProps) {
  const { data: registerToEdit, isFetching: isFetchingRegisterToEdit } =
    useQuery(
      ['pessoas-fisicas', `fisicas-id-${registryIdToEdit}`],
      async () => {
        if (registryIdToEdit <= 0) return null;

        const { data: res } = await axiosInstance.get<
          IAPIResponse<IPessoaFisica>
        >(`pessoas/pessoas-fisicas/${registryIdToEdit}`);

        return res.data;
      }
    );

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<TCriarPFFormValues>({
    resolver: zodResolver(schema),
  });

  const closeAndResetForm = () => {
    disclousure.onClose();
    reset();
  };

  const onFormSubmit = async (values: TCriarPFFormValues) => {
    await axiosInstance
      .post('pessoas/pessoas-fisicas', values)
      .then(onSubmitSuccess)
      .catch(onSubmitError);
  };

  useEffect(() => {
    z.setErrorMap(customErrorMap);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('⌨️ ~ file: CUPessoaFisica.tsx ~ errors', errors);
  }, [errors]);

  useEffect(() => {
    if (registerToEdit) {
      Object.entries(registerToEdit).forEach(([key, value]) => {
        setValue(key as keyof TCriarPFFormValues, value);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerToEdit, disclousure.isOpen]);

  return (
    <Dialog {...disclousure} onClose={closeAndResetForm} title={dialogTitle}>
      {isFetchingRegisterToEdit && registryIdToEdit > 0 ? (
        <Spinner />
      ) : (
        <form
          className="grid min-w-[40vw] grid-cols-2 items-end gap-4 rounded bg-white"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            {...register('cpf', { valueAsNumber: false })}
            disabled={registryIdToEdit > 0}
            error={errors.cpf}
            label="CPF"
            type="number"
          />
          <Input label="Nome" {...register('nome')} error={errors.nome} />

          <Input
            label="Data de nascimento"
            {...register('dataNascimento')}
            error={errors.dataNascimento}
            type="date"
          />

          <Input
            label="Naturalidade"
            {...register('naturalidade')}
            error={errors.naturalidade}
          />

          <Select
            options={convertEnumToSelectOptions(EGenero)}
            label="Gênero"
            {...register('genero', { valueAsNumber: true })}
            error={errors.genero}
          />

          <Select
            label="Raça"
            {...register('raca', { valueAsNumber: true })}
            error={errors.raca}
            options={convertEnumToSelectOptions(ERaca)}
          />
          <div className="col-span-full flex items-end justify-between gap-4">
            <Select
              label="PCD"
              {...register('deficiencia', { valueAsNumber: true })}
              error={errors.deficiencia}
              options={convertEnumToSelectOptions(EDeficiencia)}
            />
            <Checkbox
              {...register('pessoaFisicaTratadaComoJuridica')}
              label="Tratado como Pessoa Jurídica"
            />
            <Checkbox {...register('industria')} label="Indústria" />
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

          <Select
            {...register('pessoaContribuinte', { valueAsNumber: true })}
            error={errors.pessoaContribuinte}
            label="Contribuinte"
            options={convertEnumToSelectOptions(EPessoaContribuinte)}
          />

          <Input
            label="Nome do pai"
            {...register('nomePai')}
            error={errors.nomePai}
          />

          <Input
            label="Nome da mãe"
            {...register('nomeMae')}
            error={errors.nomeMae}
          />

          <Input
            label="Nome do responsável"
            {...register('nomeResponsavel')}
            error={errors.nomeResponsavel}
          />

          <Input
            label="Número do GFIP"
            {...register('numeroGfip')}
            error={errors.numeroGfip}
          />

          <Input
            label="Número do RG"
            {...register('numeroRG')}
            error={errors.numeroRG}
          />

          <Input
            label="Órgão expedidor"
            {...register('orgemExpeditorRG')}
            error={errors.orgemExpeditorRG}
          />

          <Input
            label="Data de emissão do RG"
            type="date"
            {...register('dataEmissaoRG')}
            error={errors.dataEmissaoRG}
          />

          <Input
            label="Número da CTPS"
            {...register('numeroCtps')}
            error={errors.numeroCtps}
          />

          <Input
            label="Série da CTPS"
            {...register('serieCtps')}
            error={errors.serieCtps}
          />

          <Input
            label="Data de emissão da CTPS"
            {...register('dataEmissaoCtps')}
            type="date"
            error={errors.dataEmissaoCtps}
          />

          <Input
            label="UF da CTPS"
            {...register('ufCtps')}
            error={errors.ufCtps}
          />

          <Input
            label="Número do PIS/PASEP"
            {...register('numeroPisPasep')}
            error={errors.numeroPisPasep}
          />
          <Input
            label="Número do NIT"
            {...register('numeroNIT')}
            error={errors.numeroNIT}
          />

          <SaveFormButton isSubmitting={isSubmitting} />
        </form>
      )}
    </Dialog>
  );
}
