export interface Tea {
  id: string;
  title: string;
  description: string;
}

export const teas: Tea[] = [
  {
    id: 't1',
    title: 'Tea 1',
    description: 'Description of Tea 1'
  },
  {
    id: 't2',
    title: 'Tea 2',
    description: 'Description of Tea 2'
  }
];

export const teaMap: Record<string, Tea> = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {} as Record<string, Tea>);
