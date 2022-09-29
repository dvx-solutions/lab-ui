import { Button, ButtonProps, classNames } from '+/index';

interface Props extends ButtonProps {
  saveAndNewBtnProps?: ButtonProps;
  isSubmitting: boolean;
}

export function SaveFormButton({
  saveAndNewBtnProps,
  isSubmitting,
  ...props
}: Props) {
  return (
    <div className="col-span-full mt-4 flex justify-end gap-2">
      {saveAndNewBtnProps && (
        <Button
          {...saveAndNewBtnProps}
          className={classNames(
            'secondary-button h-8 w-fit rounded font-semibold shadow-none'
          )}
        >
          Salvar e novo
        </Button>
      )}

      <Button
        {...props}
        className={classNames(
          'primary-button h-8 w-fit rounded font-semibold shadow-none'
        )}
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText="Salvando"
        type="submit"
      >
        Salvar
      </Button>
    </div>
  );
}
