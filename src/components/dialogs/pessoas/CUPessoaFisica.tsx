import { AxiosError, AxiosInstance } from 'axios';

import { Spinner } from '+/components/Spinner';

import { Dialog, DialogDisclosureProps } from '../Dialog';

export interface CUPessoaFisicaProps extends DialogDisclosureProps {
  axiosInstance: AxiosInstance;
  onSubmitError: (error: AxiosError) => Promise<void> | void;
  onSubmitSuccess: () => Promise<void>;
  registryIdToEdit?: number;
}

export function CUPessoaFisica({
  axiosInstance,
  onSubmitError,
  onSubmitSuccess,
  registryIdToEdit = -1,
  ...disclousure
}: CUPessoaFisicaProps) {
  const dialogTitle =
    registryIdToEdit > 0 ? 'Editar pessoa física' : 'Cadastrar pessoa física';

  return (
    <Dialog title={dialogTitle} {...disclousure}>
      <Spinner />
    </Dialog>
  );
}
