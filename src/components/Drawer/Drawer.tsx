import * as Dialog from '@radix-ui/react-dialog';

export function Drawer() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* eslint-disable-next-line react/button-has-type */}
        <button className="mt-[18px] w-full rounded-xl bg-blue-600 p-3 text-sm text-white hover:bg-blue-700">
          Abrir Drawer
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black bg-opacity-[0.7]" />
        {/* 
        className="positionLeft"- para abrir a esquerda
        className="positionRight"- para abrir a direita
        className="positionTop"- para abrir no topo
        className="positionTop"- para abrir embaixo 
        */}
        <Dialog.Content className="positionLeft">
          O CONTEÚDO DO DRAWER VAI AQUI DENTRO
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
