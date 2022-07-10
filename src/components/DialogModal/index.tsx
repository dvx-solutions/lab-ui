import { BoxProps } from '@chakra-ui/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { FiX } from 'react-icons/fi';

import { Button } from 'components/Button';

interface Props extends BoxProps {
  isOpen: boolean;
  closeModal: () => void;
  modalTitle: string | ReactNode;
  children: ReactNode;
}

export function DialogModal({
  closeModal,
  isOpen,
  children,
  modalTitle,
  ...rest
}: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 backdrop:backdrop-blur"
        onClose={closeModal}
        {...rest}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" fixed inset-0 bg-slate-900 bg-opacity-20 backdrop-blur-sm backdrop-filter" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-fit min-w-[30rem] max-w-6xl transform rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-8 flex w-full items-center justify-between text-xl font-medium leading-6 text-gray-900"
                >
                  {modalTitle}

                  <Button
                    className="secondary-button p-1 text-gray-800 shadow-none transition-colors"
                    onClick={closeModal}
                  >
                    <FiX />
                  </Button>
                </Dialog.Title>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
