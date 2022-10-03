import { Button } from '+/components';
import { useDisclosure } from '+/hooks';

import { ReactNode } from 'react';
import { FiTrash } from 'react-icons/fi';

import { Dialog } from '..';

interface Props {
  openModalButton?: ReactNode;
  onDeleteRequest: () => Promise<boolean>;
  isDeleting?: boolean;
}

export function ExcluirRegistroModal({
  openModalButton,
  isDeleting,
  onDeleteRequest,
}: Props) {
  const disclousure = useDisclosure();

  return (
    <>
      {openModalButton || (
        <Button
          className="icon-button text-red-500 hover:bg-red-500/[.2]"
          onClick={disclousure.onOpen}
        >
          <FiTrash />
        </Button>
      )}

      <Dialog {...disclousure} title="Excluir registro">
        <div className="flex flex-col">
          <p className="text-lg font-normal">
            Deseja realmente excluir este registro?
          </p>

          <Button
            onClick={async () => {
              const success = await onDeleteRequest();

              if (success) disclousure.onClose();
            }}
            isLoading={isDeleting}
            className="primary-button mt-8 h-8 w-fit self-end bg-red-500 px-4 text-sm text-white hover:bg-opacity-75"
          >
            Excluir
          </Button>
        </div>
      </Dialog>
    </>
  );
}
