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

export const getApiDataAsSelectOptions = (
  data: { codigo?: string; nome: string; id: number }[]
): TSelectOption[] =>
  data.map(x => ({
    value: x.id,
    text: x.codigo ? `${x.codigo} - ${x.nome}` : x.nome,
  }));
