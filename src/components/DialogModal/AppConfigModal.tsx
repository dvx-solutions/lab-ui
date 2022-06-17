import { Tooltip } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGear } from "react-icons/bs";
import { toast } from "react-toastify";
import { SetterOrUpdater } from "recoil";
import * as yup from "yup";

import { Button } from "+/components/Button";
import { DialogModal } from "+/components/DialogModal";
import { Input } from "+/components/form/Input";
import { Select } from "+/components/form/Select";
import { ISelectOption } from "+/types/select-option";

const useAppConfigModalDisclousere = () => {
  const [isOpenModalOpen, setIsOpen] = useState(false);
  const onOpenModalRequest = () => setIsOpen(true);
  const onCloseModalRequest = () => setIsOpen(false);

  return {
    isOpenModalOpen,
    onOpenModalRequest,
    onCloseModalRequest,
  };
};

const formSchemaValidation = yup.object().shape({
  empresaId: yup
    .number()
    .typeError("Campo obrigatório")
    .required("Campo obrigatório"),
  ano: yup
    .number()
    .min(2000, "O ano não pode ser antes de 2000")
    .max(2100, "O ano não pode ser depois de 2100")
    .typeError("Campo obrigatório")
    .required("Campo obrigatório"),
});

export type TAppConfig = {
  empresaId: number;
  ano: number;
};

export interface AppConfigModalProps {
  empresasSelectOptions: ISelectOption[] | null;
  appConfigData: TAppConfig;
  setAppConfigData: SetterOrUpdater<TAppConfig | null>;
}

export function AppConfigModal({
  empresasSelectOptions,
  appConfigData,
  setAppConfigData,
}: AppConfigModalProps) {
  const { isOpenModalOpen, onCloseModalRequest, onOpenModalRequest } =
    useAppConfigModalDisclousere();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAppConfig>({
    mode: "all",
    defaultValues: { ...appConfigData },
    resolver: yupResolver(formSchemaValidation),
  });

  const onFormSubmitRequest = (formValues: TAppConfig) => {
    setAppConfigData(formValues);
    onCloseModalRequest();
    toast.info("Configurações salvas");
  };

  return (
    <>
      <Tooltip>
        <Button
          onClick={onOpenModalRequest}
          className="secondary-button p-2 text-2xl shadow-none"
        >
          <BsGear />
        </Button>
      </Tooltip>

      <DialogModal
        isOpen={isOpenModalOpen}
        closeModal={onCloseModalRequest}
        modalTitle="Configurações da aplicação"
      >
        <form className="gap-3" onSubmit={handleSubmit(onFormSubmitRequest)}>
          <Select
            {...register("empresaId", { valueAsNumber: true })}
            error={errors.empresaId}
            label="Empresa"
            options={empresasSelectOptions}
          />

          <Input
            {...register("ano", { valueAsNumber: true })}
            error={errors.ano}
            label="Ano"
            type="number"
          />

          <Button className="mt-6" type="submit" isDisabled={!isValid}>
            Salvar
          </Button>
        </form>
      </DialogModal>
    </>
  );
}
