import { TSelectOption } from '..';

type DataProps = {
  codigo: string | number;
  id: string | number;
  nome: string;
}[];

interface Props {
  data: DataProps;
}
export const getDataAsSelectOptions = (data: Props): TSelectOption[] =>
  data.data.map(x => ({
    text: `${x.codigo} - ${x.nome}`,
    value: x.id,
  }));
