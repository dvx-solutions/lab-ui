import { AxiosInstance } from 'axios';

import { DescritivosTab } from '+/components/Tab/produto/Descritivos';
import { InformacoesBasicasTab } from '+/components/Tab/produto/InformacoesBasica';
import { Tabs } from '+/components/Tabs';

import { Dialog, DialogDisclosureProps } from '../_general';

interface Props extends DialogDisclosureProps {
  recordIdToEdit: number;
  axiosInstance: AxiosInstance;
}

export function CUProduto({
  recordIdToEdit,
  axiosInstance,
  ...disclousure
}: Props) {
  const isEdition = recordIdToEdit > 0;

  return (
    <Dialog
      {...disclousure}
      title={
        isEdition ? `Editar produto - ID ${recordIdToEdit}` : 'Criar produto'
      }
    >
      <Tabs
        tabContentClassname="p-0"
        tabListClassname="py-0.5 text-sm font-semibold"
        tabListActiveClassname="py-0.5 text-sm font-semibold"
        tabsContent={[
          {
            children: (
              <InformacoesBasicasTab
                recordIdToEdit={recordIdToEdit}
                axiosInstance={axiosInstance}
                id={recordIdToEdit}
              />
            ),
            tabFor: 'dados_cadastrais',
          },
          {
            children: (
              <DescritivosTab
                produtoId={recordIdToEdit}
                axiosInstance={axiosInstance}
              />
            ),
            tabFor: 'descritivos',
          },
        ]}
        tabsList={[
          { id: 'dados_cadastrais', name: 'Dados cadastrais' },
          { id: 'descritivos', name: 'Descritivos' },
        ]}
      />
    </Dialog>
  );
}
