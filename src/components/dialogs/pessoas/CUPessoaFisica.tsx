import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import { Button } from '+/components/buttons';
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

import { Dialog, DialogDisclosureProps } from '../Dialog';

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
  genero: z.number().optional(),
  raca: z.number().optional(),
  industria: z.boolean(),
  deficiencia: z.number().nullable(),
  nomePai: z.string().optional(),
  nomeMae: z.string().optional(),
  nomeResponsavel: z.string().optional(),
  numeroGfip: z.string().optional(),
  numeroRG: z.string(),
  orgemExpeditorRG: z.string(),
  dataEmissaoRG: z.string(),
  numeroCtps: z.string().optional(),
  serieCtps: z.string().optional(),
  dataEmissaoCtps: z.string().optional(),
  ufCtps: z.string().optional(),
  numeroNIT: z.string().optional(),
  numeroPisPasep: z.string().optional(),
});
// quantidadeEmpregados: z.number(),
// porteEstabelecimento: z.number(),

export type TCriarPFFormValues = z.infer<typeof schema>;

export function CUPessoaFisica({
  axiosInstance,
  dialogTitle = 'Cadastrar pessoa jurídica',
  isOpen,
  onClose,
  onOpen,
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
          <div className="col-span-full flex items-end justify-between">
            <Select
              label="PCD"
              {...register('deficiencia')}
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

          {/* <Input
            label="Atividade econômica principal"
            {...register("atividade_principal")} error={errors.atividade_principal}
          />

          <Input label="Estado" {...register("estado")} error={errors.estado} />

          <Input label="Cidade" {...register("cidade")} error={errors.cidade} />

          <Input label="" {...register("" )}/> error = { errors.(""}

    < Input label = "CEP" {...register("cep") } error = { errors.cep } />

          <Input label="Situação cadastral" {...register("situacao_cadastral")} error={errors.situacao_cadastral} />

          <Input
            label="Motivo situação cadastral"
            {...register("motivo_situacao_cadastral")} error={errors.motivo_situacao_cadastral}
          />
          <Input label="Incricoes estaduais" {...register("inscricoes_estaduais")} error={errors.inscricoes_estaduais} />

          <Input label="Incricoes suframa" {...register("inscricoes_suframa")} error={errors.inscricoes_suframa} /> */}

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
