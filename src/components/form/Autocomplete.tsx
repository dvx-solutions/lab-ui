import { Combobox, Transition } from '@headlessui/react';
import debounce from 'lodash.debounce';
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { FieldError } from 'react-hook-form';
import { FiCheck, FiXCircle } from 'react-icons/fi';

import { FormControl } from '+/components/form/FormControl';
import { FormErrorMessage } from '+/components/form/FormErrorMessage';
import { Input } from '+/components/form/Input';
import { classNames } from '+/lib';

import { Label } from './Label';

export type TAutocompleteOption = {
  id: number;
  name: string;
};

type TInputProps = {
  name: string;
  heightShouldFit?: boolean;
  placeholder?: string;
};
// } & ChakraInputProps;

export interface Props {
  error?: FieldError;
  inputProps: TInputProps;
  isSearchingOptions: boolean;
  label?: string;
  options: TAutocompleteOption[] | undefined;
  query: string;
  selectedValue: TAutocompleteOption | undefined;
  setQuery: Dispatch<SetStateAction<string>>;
  setSelectedValue: Dispatch<SetStateAction<TAutocompleteOption | undefined>>;
}

const useComboboxDisclousure = () => {
  const [isComboboxOptionsOpen, setIsComboboxOptionsOpen] = useState(false);
  const onOpenComboboxOptionsRequest = () => setIsComboboxOptionsOpen(true);
  const onCloseComboboxOptionsRequest = () => setIsComboboxOptionsOpen(false);

  return {
    isComboboxOptionsOpen,
    onOpenComboboxOptionsRequest,
    onCloseComboboxOptionsRequest,
  };
};

export function Autocomplete({
  error,
  inputProps,
  isSearchingOptions,
  label,
  options = [],
  query,
  selectedValue,
  setQuery,
  setSelectedValue,
}: Props) {
  const {
    isComboboxOptionsOpen,
    onCloseComboboxOptionsRequest,
    onOpenComboboxOptionsRequest,
  } = useComboboxDisclousure();

  const debounceQuery = debounce((dbcValue: string) => setQuery(dbcValue), 500);

  const debounceCallbackQuery = useCallback(
    (clbValue: string) => debounceQuery(clbValue),
    [debounceQuery]
  );

  const onInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    debounceCallbackQuery(value);
  };

  const iClearButtonVisible = !!selectedValue;

  useEffect(() => {
    if (query?.trim().length >= 3) {
      onOpenComboboxOptionsRequest();
    } else {
      onCloseComboboxOptionsRequest();
    }

    if (query.trim() === '') setSelectedValue(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Combobox
      value={selectedValue}
      onChange={setSelectedValue}
      name={inputProps.name}
    >
      {() => (
        <FormControl
          // isInvalid={!!error}
          className="relative flex w-full flex-col"
        >
          {!!label && <Label label={label} name={inputProps.name} />}

          <div
            className={classNames(
              'relative w-full cursor-default overflow-hidden bg-transparent text-left  focus:outline-none sm:text-sm',
              inputProps.heightShouldFit
                ? 'form-element-with-height-fitted'
                : 'default-form-element'
            )}
          >
            <Input
              // {...inputProps}
              // as={Input}
              autoComplete="off"
              className={classNames(
                'w-full border pl-3 pr-8 text-gray-600 outline-none',
                error ? 'border-red-500' : 'border-gray-500',
                inputProps.heightShouldFit
                  ? 'form-element-with-height-fitted'
                  : 'default-form-element'
              )}
              // displayValue={(item: TAutocompleteOption) => {
              //   if (!item) return '';
              //   const { name: nameDisplayValue } = item as TAutocompleteOption;
              //   return nameDisplayValue;
              // }}
              onBlur={onCloseComboboxOptionsRequest}
              onChange={onInputChange}
              name=""
            />

            <Combobox.Button
              className={classNames(
                'absolute inset-y-2 right-0 flex items-center pr-2',
                iClearButtonVisible ? '' : 'hidden'
              )}
              onClick={() => {
                if (iClearButtonVisible) {
                  setSelectedValue(undefined);
                }
              }}
            >
              <FiXCircle className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>

          {!!error && (
            <FormErrorMessage className="text-xs text-red-500" error={error} />
            //   {error.message}
            // </FormErrorMessage>
          )}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={isComboboxOptionsOpen}
          >
            <Combobox.Options
              static
              className="absolute z-50 mt-1 max-h-60 w-fit min-w-full max-w-screen-sm overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  {isSearchingOptions ? 'Procurando...' : 'Não encontrado'}
                </div>
              ) : (
                options.map(option => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        'relative cursor-default select-none py-2 pl-12 pr-4 ',
                        active ? 'bg-brand-primary text-white' : 'text-gray-900'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            selected ? 'font-medium' : 'font-normal'
                          )}
                        >
                          {option.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              'absolute inset-y-0 left-0 flex items-center pl-3',
                              active ? 'text-white' : 'text-lime-600'
                            )}
                          >
                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </FormControl>
      )}
    </Combobox>
  );
}
