import { AxiosError, AxiosInstance } from 'axios';
import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { SaveFormButton } from '+/components/buttons';
import { Textarea } from '+/components/form';
import { useNaturezasProdutosTiposDescritivos, useProdutoPorId } from '+/hooks';
import { useProdutosDescritivos } from '+/hooks/react-query/produto/produtos-descritivos';
import { IRequestError } from '+/types';

interface Props {
  axiosInstance: AxiosInstance;
  produtoId: number;
}

type FormValuesType = {
  descritivos: {
    id?: number;
    naturezaProdutoTipoDescritivoId: number;
    nome: string;
    obrigatorio: boolean;
    produtoId: number;
    registroId?: number;
    sequencia: number;
    texto: string;
  }[];
};

export function DescritivosTab({ produtoId, axiosInstance }: Props) {
  const queryClient = useQueryClient();
  const { data: produto } = useProdutoPorId({ axiosInstance, id: produtoId });
  const { data: descritivos } = useNaturezasProdutosTiposDescritivos({
    naturezaProdutoId: produto?.naturezaProdutoId,
    API_Instance: axiosInstance,
  });
  const { data: produtosDescritivos } = useProdutosDescritivos({
    API_Instance: axiosInstance,
    produtoId,
  });

  const {
    control,
    formState: { isSubmitting, errors: formErrors },
    handleSubmit,
    register,
  } = useForm<FormValuesType>();

  const { fields, append, remove } = useFieldArray({
    name: 'descritivos',
    control,
  });

  const onFormSubmit = async (values: FormValuesType) => {
    const requestErrors: { errors: IRequestError['errors']; field: string }[] =
      [];
    const successfulRequests: string[] = [];

    await Promise.all(
      values.descritivos.map(async x => {
        const payload = {
          naturezaProdutoTipoDescritivoId: x.naturezaProdutoTipoDescritivoId,
          produtoId: x.produtoId,
          texto: x.texto,
        };

        await axiosInstance({
          data: x.registroId ? { ...payload, id: x.registroId } : payload,
          method: x.registroId ? 'put' : 'post',
          url: 'produtos/produtos-descritivos',
        })
          .then(() => {
            successfulRequests.push(x.nome);
          })
          .catch(({ response }: AxiosError) => {
            const { errors } = response?.data as IRequestError;
            if (errors) requestErrors.push({ errors, field: x.nome });
          });
      })
    );

    if (requestErrors.length) {
      toast.error(
        <div className="flex flex-col gap-4">
          {requestErrors.map(re => (
            <div key={re.field}>
              <h1 className="text-sm font-semibold uppercase">{re.field}</h1>
              <ul className="list-inside list-disc text-xs">
                {Object.entries(re.errors).map(([, value]) =>
                  value.map(v => <li key={v}>{v}</li>)
                )}
              </ul>
            </div>
          ))}
        </div>,
        { autoClose: 5000 }
      );
    }
    if (successfulRequests.length) {
      await queryClient.invalidateQueries();

      toast.success(
        <div className="flex flex-col gap-4">
          <h1 className="text-sm font-semibold uppercase">
            Descritivos salvos
          </h1>
          <ul className="list-inside list-disc text-xs">
            {successfulRequests.map(v => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  useEffect(() => {
    if (produtosDescritivos?.length) {
      remove();

      produtosDescritivos
        .sort(
          (a, b) =>
            a.naturezaProdutoTipoDescritivo.sequencia -
            b.naturezaProdutoTipoDescritivo.sequencia
        )
        .forEach(x =>
          append({
            ...x,
            nome: x.naturezaProdutoTipoDescritivo.nome,
            obrigatorio: x.naturezaProdutoTipoDescritivo.obrigatorio,
            registroId: x.id,
            sequencia: x.naturezaProdutoTipoDescritivo.sequencia,
          })
        );
    } else {
      const descritivosAtivos = descritivos?.data.filter(
        x => x.ativo && x.naturezaProdutoId === produto?.naturezaProdutoId
      );

      if (descritivosAtivos?.length) {
        descritivosAtivos
          .sort((a, b) => a.sequencia - b.sequencia)
          .forEach(descritivo => {
            if (
              !fields.find(
                x => x.naturezaProdutoTipoDescritivoId === descritivo.id
              )
            ) {
              append({
                naturezaProdutoTipoDescritivoId: descritivo.id,
                nome: descritivo.nome,
                obrigatorio: descritivo.obrigatorio,
                produtoId,
                sequencia: descritivo.sequencia,
                texto: '',
              });
            }
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descritivos, produto?.naturezaProdutoId, produtoId, produtosDescritivos]);

  if (produtoId <= 0)
    return (
      <div className="flex h-[80vh] w-[60vw] flex-col items-center justify-center gap-2 text-yellow-600">
        <RiErrorWarningLine className="text-2xl" />
        <span className="w-2/5 text-center">
          Salve as informações do produto para registrar os descritivos
        </span>
      </div>
    );

  return (
    <form
      className="mt-2 flex w-[60vw] flex-col"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      {fields.map((field, index) => (
        <Textarea
          {...register(`descritivos.${index}.texto`, {
            required: {
              value: !!field.obrigatorio,
              message: 'Descritivo obrigatório',
            },
          })}
          error={formErrors.descritivos?.[index]?.texto}
          key={field.id}
          label={`${field.sequencia} - ${field.nome}`}
        />
      ))}
      <SaveFormButton isSubmitting={isSubmitting} />
    </form>
  );
}
