import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Checkbox,
  Dialog,
  DialogDisclosureProps,
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
  IPessoaJuridicaReceita,
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

export interface CUPessoaJuridicaProps extends DialogDisclosureProps {
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
  const [cnpjSelecionado, setCnpjSelecionado] = useState('');
  const { data: registerToEdit, isFetching: isFetchingRegisterToEdit } =
    useQuery(['pessoas-juridicas', `id-${registryIdToEdit}`], async () => {
      if (registryIdToEdit <= 0) return null;

      const { data: res } = await axiosInstance.get<
        IAPIResponse<IPessoaJuridica>
      >(`pessoas/pessoas-juridicas/${registryIdToEdit}`);

      return res.data;
    });

  const { data: dataReceita, isFetching: isFetchingDataReceita } = useQuery(
    ['pessoas-juridicas', `id-${registryIdToEdit}`],
    async () => {
      if (registryIdToEdit <= 0) return null;
      if (cnpjSelecionado.length < 14) return null;

      const { data: res } = await axiosInstance.get<
        IAPIResponse<IPessoaJuridicaReceita>
      >(`pessoas/pessoas-juridicas/consultar-por-cnpj/${cnpjSelecionado}`);

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
              onChange={({ target: { value } }) => {
                setCnpjSelecionado(value);
              }}
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

          <Input
            disabled
            readOnly
            value={dataReceita?.razao_social ?? ''}
            label="Razão social"
            name="razao_social"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.capital_social ?? ''}
            label="Capital social"
            name="capital_social"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.porte.descricao ?? ''}
            label="Porte"
            name="porte"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.natureza_Juridica.descricao ?? ''}
            label="Natureza jurídica"
            name="natureza_Juridica"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.nome_fantasia ?? ''}
            label="Nome fantasia"
            name="nome_fantasia"
          />

          <Input
            disabled
            readOnly
            value={
              dataReceita?.estabelecimento.atividade_principal.descricao ?? ''
            }
            label="Atividade econômica principal"
            name="atividade_principal"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.estado.nome ?? ''}
            label="Estado"
            name="estado"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.cidade.nome ?? ''}
            label="Cidade"
            name="cidade"
          />

          <Input
            disabled
            readOnly
            value={
              `${dataReceita?.estabelecimento.tipo_logradouro} ${dataReceita?.estabelecimento.logradouro} ${dataReceita?.estabelecimento.numero}, ${dataReceita?.estabelecimento.bairro}` ??
              ''
            }
            label=""
            name=""
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.cep ?? ''}
            label="CEP"
            name="cep"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.situacao_cadastral ?? ''}
            label="Situação cadastral"
            name="situacao_cadastral"
          />

          <Input
            disabled
            readOnly
            value={dataReceita?.estabelecimento.motivo_situacao_cadastral ?? ''}
            label="Motivo situação cadastral"
            name="motivo_situacao_cadastral"
          />
          <Input
            disabled
            readOnly
            value={
              dataReceita?.estabelecimento.inscricoes_estaduais.join(',') ?? ''
            }
            label="Incricoes estaduais"
            name="inscricoes_estaduais"
          />

          <Input
            disabled
            readOnly
            value={
              dataReceita?.estabelecimento.inscricoes_suframa.join(',') ?? ''
            }
            label="Incricoes suframa"
            name="inscricoes_suframa"
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
