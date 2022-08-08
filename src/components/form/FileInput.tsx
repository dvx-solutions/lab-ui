/* eslint-disable react/function-component-definition */
import {
  ChangeEvent,
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';
import { FiFilePlus, FiTrash } from 'react-icons/fi';

import { Button } from '+/components/buttons';
import { Label } from '+/components/form/Label';
import { classNames } from '+/lib';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  file: File | null;
  label?: string;
  name: string;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const BaseComponent: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { name, label = 'Arquivo', className = '', file, setFile, ...props },
  ref
) => {
  const handleFileChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    if (files.length < 0) return;
    const [selectedFile] = files;
    setFile(selectedFile);
  };

  const handleFileRemove = () => setFile(null);

  return (
    <div className="flex w-full items-end justify-center gap-2">
      <label
        className="flex w-full flex-col items-start justify-center"
        htmlFor={name}
      >
        <input
          {...props}
          className="hidden"
          id={name}
          name={name}
          onChange={handleFileChange}
          ref={ref}
          type="file"
        />
        <Label name={name} label={label} />
        <div
          className={classNames(
            'flex w-full cursor-pointer items-center justify-center gap-2 rounded border-2 border-dashed border-brand-primary bg-brand-primary/[.15] py-4 text-sm transition-colors duration-300 hover:bg-brand-primary/[.25]',
            className
          )}
        >
          {file ? <span>{file.name}</span> : <span>Selecionar arquivo</span>}

          <span className="text-base">
            <FiFilePlus />
          </span>
        </div>
      </label>

      {file && (
        <Button
          className="rounded-md border border-transparent py-5 text-red-500 hover:bg-red-500/[.25]"
          onClick={handleFileRemove}
        >
          <FiTrash />
        </Button>
      )}
    </div>
  );
};

export const FileInput = forwardRef(BaseComponent);
