import { getRequestErrorToast } from '+/lib';

import { AxiosInstance } from 'axios';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { Button, ButtonProps, ExcluirRegistroModal, Tooltip } from '..';

export type CellType = { data: { data: Record<string, unknown> } };

type AditionalActionProps = ButtonProps & {
  onCellClick: (e: CellType) => void;
  tooltipMessage: string;
};

export interface DatagridRegisterActionsProps {
  aditionalActions?: Array<AditionalActionProps>;
  aditionalActionsWithFnc?: Array<(e: CellType) => AditionalActionProps>;
  axiosInstance: AxiosInstance;
  customDeleteRoute?: (e: CellType) => string;
  e: CellType;
  onEditDataRequest?: (e: CellType) => void;
  pathToDeleteRegister?: string;
  queryClientInstance: QueryClient;
  queryToInvalidate: string;
}

export function DatagridRegisterActions({
  aditionalActions = [],
  aditionalActionsWithFnc = [],
  axiosInstance,
  customDeleteRoute,
  e,
  onEditDataRequest,
  pathToDeleteRegister,
  queryClientInstance,
}: DatagridRegisterActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const customDeleteRoutePath = customDeleteRoute?.(e);

  const canRenderDeleteButton = pathToDeleteRegister || customDeleteRoutePath;

  const onDeleteRequest = async () => {
    setIsDeleting(true);
    return axiosInstance
      .delete(
        customDeleteRoutePath || `${pathToDeleteRegister}/${e.data.data.id}`
      )
      .then(async () => {
        await queryClientInstance.invalidateQueries();
        toast.info('Registro excluído');
        return true;
      })
      .catch(error => {
        getRequestErrorToast(error);
        return false;
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <div className="flex w-full items-center justify-center">
      {aditionalActions.map(b => (
        <Tooltip key={b.tooltipMessage} label={b.tooltipMessage}>
          <Button
            {...b}
            onClick={() => (b.onCellClick ? b.onCellClick(e) : b.onClick)}
          />
        </Tooltip>
      ))}

      {aditionalActionsWithFnc.map(b => (
        <Tooltip key={b(e).tooltipMessage} label={b(e).tooltipMessage}>
          <Button
            {...b(e)}
            onClick={() => (b(e) ? b(e).onCellClick(e) : b(e).onClick)}
          />
        </Tooltip>
      ))}

      {onEditDataRequest && (
        <Button
          onClick={() => onEditDataRequest(e)}
          className="icon-button text-yellow-500 hover:bg-yellow-500/[.2]"
        >
          <FiEdit />
        </Button>
      )}

      {canRenderDeleteButton && (
        <ExcluirRegistroModal
          onDeleteRequest={onDeleteRequest}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
