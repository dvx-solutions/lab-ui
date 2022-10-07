import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError, AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { z } from 'zod';

import {
  Button,
  Checkbox,
  Dialog,
  DialogDisclosureProps,
  Input,
  Select,
  Spinner,
  Tabs,
} from '+/components';
import { useTabelasBasicas } from '+/hooks';
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
  quantidadeTerceirizados: z.number(),
  grauRiscoSaude: z.number(),
  porteEstabelecimento: z.number(),
  oferecePlanoSaude: z.boolean(),
  sesmt: z.boolean(),
  inscricaoEstadual: z.string().optional(),
  inscricaoMunicipal: z.string().optional(),
});

export type TCriarPJFormValues = z.infer<typeof schema> & {
  poloIndustrialId: number | undefined;
};

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
  onSubmitError,
  onSubmitSuccess,
  registryIdToEdit = -1,
  ...disclousure
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

  const { data: polosIndustriais } = useTabelasBasicas({
    API_Instance: axiosInstance,
    pageNumber: 1,
    pageSize: 100000,
    rota: 'polos-industriais',
  });

  const { data: dataReceita, isFetching: isFetchingDataReceita } = useQuery(
    [
      'pessoas-juridicas-por-cnpj',
      `pessoas-juridicas-por-cnpj-${cnpjSelecionado}`,
    ],
    async () => {
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

  const closeAndResetForm = () => {
    disclousure.onClose();
    setCnpjSelecionado('');
    reset();
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
  }, [registerToEdit, disclousure.isOpen]);

  return (
    <Dialog {...disclousure} onClose={closeAndResetForm} title={dialogTitle}>
      {isFetchingRegisterToEdit && registryIdToEdit > 0 ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="h-[36rem] max-h-[40rem]"
        >
          <div className="grid max-h-[40rem] w-full min-w-[60vw] grid-cols-2 items-start gap-2 divide-x-2 divide-gray-300 rounded bg-white">
            <div className="grid h-fit w-full grid-cols-2 gap-2 p-2">
              <div className="col-span-full">
                <span className="text-lg font-semibold">
                  Dados a serem cadastrados
                </span>
              </div>
              <div className="col-span-full">
                <Input
                  {...register('cnpj', { valueAsNumber: false })}
                  disabled={registryIdToEdit > 0}
                  error={errors.cnpj}
                  label="CNPJ"
                  onChange={({ target: { value } }) => {
                    setCnpjSelecionado(value);
                    // setValue(
                    //   'cnpj',
                    //   value.replace(
                    //     /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                    //     '$1.$2.$3/$4-$5'
                    //   )
                    // );
                  }}
                  placeholder="Digite o CNPJ (somente números)"
                  type="number"
                />
              </div>

              <Input
                {...register('inscricaoEstadual')}
                error={errors.inscricaoEstadual}
                label="Inscrição Estadual"
              />
              <Input
                {...register('inscricaoMunicipal')}
                error={errors.inscricaoMunicipal}
                label="Inscrição Municipal"
              />

              <Input
                {...register('quantidadeEmpregados', { valueAsNumber: true })}
                error={errors.quantidadeEmpregados}
                label="Qtde. de empregados"
                type="number"
              />
              <Input
                {...register('quantidadeTerceirizados', {
                  valueAsNumber: true,
                })}
                error={errors.quantidadeTerceirizados}
                label="Qtde. de terceirizados"
                type="number"
              />

              <div className="col-span-full">
                <Checkbox {...register('industria')} label="Indústria" />
                <Checkbox {...register('sesmt')} label="SESMT" />
                <Checkbox
                  {...register('oferecePlanoSaude')}
                  label="Oferece plano de saúde"
                />
              </div>
              {/* <Checkbox
                {...register('poloIndustrialId')}
                label="Polo industrial"
              /> */}

              <Select
                {...register('poloIndustrialId', { valueAsNumber: true })}
                error={errors.poloIndustrialId}
                label="Polo industrial"
                options={
                  polosIndustriais?.data.map(polo => ({
                    text: polo.nome,
                    value: polo.id,
                  })) ?? []
                }
              />

              <Select
                {...register('pessoaContribuinte', { valueAsNumber: true })}
                error={errors.pessoaContribuinte}
                label="Contribuinte"
                options={convertEnumToSelectOptions(EPessoaContribuinte)}
              />

              <Select
                {...register('porteEstabelecimento', { valueAsNumber: true })}
                error={errors.porteEstabelecimento}
                label="Porte do estabelecimento"
                options={convertEnumToSelectOptions(EPorteEstabelecimento)}
              />

              <Input
                {...register('grauRiscoSaude', { valueAsNumber: true })}
                error={errors.grauRiscoSaude}
                label="Grau de risco"
                type="number"
              />
            </div>
            <div className="flex w-full flex-col gap-4 p-2">
              <div className="col-span-full">
                <span className="text-lg font-semibold">
                  {`Dados da receita do cnpj ${cnpjSelecionado}`}
                </span>
              </div>
              {cnpjSelecionado.length === 14 ? (
                isFetchingDataReceita ? (
                  <Spinner />
                ) : (
                  <Tabs
                    tabsList={[
                      {
                        id: 'dados-gerais',
                        name: 'Dados gerais',
                      },
                      {
                        id: 'socios',
                        name: 'Socios',
                      },
                      {
                        id: 'cnaes',
                        name: 'Atividades econômicas',
                      },
                    ]}
                    tabsContent={[
                      {
                        tabFor: 'dados-gerais',
                        children: (
                          <div className="grid grid-cols-2 gap-2">
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
                              value={
                                dataReceita?.natureza_Juridica.descricao ?? ''
                              }
                              label="Natureza jurídica"
                              name="natureza_Juridica"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.nome_fantasia ?? ''
                              }
                              label="Nome fantasia"
                              name="nome_fantasia"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.atividade_principal
                                  .descricao ?? ''
                              }
                              label="Atividade econômica principal"
                              name="atividade_principal"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.estado.nome ?? ''
                              }
                              label="Estado"
                              name="estado"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.cidade.nome ?? ''
                              }
                              label="Cidade"
                              name="cidade"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                `${
                                  dataReceita?.estabelecimento
                                    .tipo_logradouro ?? ''
                                } ${
                                  dataReceita?.estabelecimento.logradouro ?? ''
                                } ${
                                  dataReceita?.estabelecimento.numero ?? ''
                                }, ${
                                  dataReceita?.estabelecimento.bairro ?? ''
                                }` ?? ''
                              }
                              label="Endereço"
                              name="endereco"
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
                              value={
                                dataReceita?.estabelecimento
                                  .situacao_cadastral ?? ''
                              }
                              label="Situação cadastral"
                              name="situacao_cadastral"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento
                                  .motivo_situacao_cadastral ?? ''
                              }
                              label="Motivo situação cadastral"
                              name="motivo_situacao_cadastral"
                            />
                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.inscricoes_estaduais.join(
                                  ','
                                ) ?? ''
                              }
                              label="Incricoes estaduais"
                              name="inscricoes_estaduais"
                            />

                            <Input
                              disabled
                              readOnly
                              value={
                                dataReceita?.estabelecimento.inscricoes_suframa.join(
                                  ','
                                ) ?? ''
                              }
                              label="Incricoes suframa"
                              name="inscricoes_suframa"
                            />
                          </div>
                        ),
                      },
                      {
                        tabFor: 'socios',
                        children: (
                          <div className="grid max-h-[36rem] grid-cols-1 gap-4 divide-y-2 divide-gray-400 overflow-y-auto pr-4">
                            {dataReceita?.socios
                              ? dataReceita?.socios.map(socio => (
                                  <div
                                    key={socio.nome}
                                    className="grid grid-cols-2 gap-2 py-4"
                                  >
                                    <Input
                                      disabled
                                      readOnly
                                      value={socio.cpf_cnpj_socio}
                                      label="CPF do sócio"
                                      name="cpf_socio"
                                    />
                                    <Input
                                      disabled
                                      readOnly
                                      value={socio.faixa_etaria}
                                      label="Faixa etária"
                                      name="faixa_etaria"
                                    />
                                    <div className="col-span-full">
                                      <Input
                                        disabled
                                        readOnly
                                        value={socio.nome}
                                        label="Nome do sócio"
                                        name="nome_socio"
                                      />
                                    </div>
                                  </div>
                                ))
                              : null}
                          </div>
                        ),
                      },
                      {
                        tabFor: 'cnaes',
                        children: (
                          <div className="grid max-h-[36rem] grid-cols-1 gap-4 divide-y-2 divide-gray-400 overflow-y-auto pr-4">
                            <div>
                              <span className="font-semibold text-gray-700">
                                CNAE Primário
                              </span>
                              <div className="grid grid-cols-2 gap-2 py-4">
                                <Input
                                  disabled
                                  readOnly
                                  value={
                                    dataReceita?.estabelecimento
                                      ?.atividade_principal.secao
                                  }
                                  label="Seção"
                                  name="secao"
                                />
                                <Input
                                  disabled
                                  readOnly
                                  value={
                                    dataReceita?.estabelecimento
                                      ?.atividade_principal.subclasse
                                  }
                                  label="Subclasse"
                                  name="subclasse"
                                />
                                <div className="col-span-full">
                                  <Input
                                    disabled
                                    readOnly
                                    value={
                                      dataReceita?.estabelecimento
                                        ?.atividade_principal.descricao
                                    }
                                    label="Descrição"
                                    name="descricao"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">
                                CNAEs Secundários
                              </span>
                              {dataReceita?.estabelecimento
                                ?.atividades_secundarias
                                ? dataReceita?.estabelecimento?.atividades_secundarias.map(
                                    cnae => (
                                      <div
                                        key={cnae.id}
                                        className="grid grid-cols-2 gap-2 py-4"
                                      >
                                        <Input
                                          disabled
                                          readOnly
                                          value={cnae.secao}
                                          label="Seção"
                                          name="secao"
                                        />
                                        <Input
                                          disabled
                                          readOnly
                                          value={cnae.subclasse}
                                          label="Subclasse"
                                          name="subclasse"
                                        />
                                        <div className="col-span-full">
                                          <Input
                                            disabled
                                            readOnly
                                            value={cnae.descricao}
                                            label="Descrição"
                                            name="descricao"
                                          />
                                        </div>
                                      </div>
                                    )
                                  )
                                : null}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                  />
                )
              ) : null}
            </div>
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
