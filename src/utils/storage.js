const KEY = 'vivo_consultores';

const DEFAULT_CONSULTORES = [
  {
    nome: 'Pamella',
    foto: '/foto/pamella.webp',
    numero: '5547991434460'
  },
  {
    nome: 'Crisley',
    foto: '/foto/crisley.webp',
    numero: '5547992742740'
  },
  {
    nome: 'Camilly',
    foto: '/foto/camilly.webp',
    numero: '5547991866235'
  },
  {
    nome: 'Ingrid',
    foto: '/foto/ingrid.webp',
    numero: '5547992876919'
  },
  {
    nome: 'Gerusa',
    foto: '/foto/gerusa.webp',
    numero: '5547984033499'
  },
  {
    nome: 'Amauri',
    foto: '/foto/amauri.webp',
    numero: '5547992692973'
  },
  {
    nome: 'Laiane',
    foto: '/foto/laiane.webp',
    numero: '5547991008517'
  }
];

export function obterConsultores() {
  const dados = localStorage.getItem(KEY);
  if (!dados) {
    salvarConsultores(DEFAULT_CONSULTORES);
    return DEFAULT_CONSULTORES;
  }
  try {
    return JSON.parse(dados);
  } catch (e) {
    console.error('Erro ao analisar os consultores no localStorage:', e);
    return DEFAULT_CONSULTORES;
  }
}

export function salvarConsultores(lista) {
  localStorage.setItem(KEY, JSON.stringify(lista));
}

export function adicionarConsultor(consultor) {
  const lista = obterConsultores();
  // Evitar duplicados por número
  const index = lista.findIndex(c => c.numero === consultor.numero);
  if (index !== -1) {
    lista[index] = consultor;
  } else {
    lista.push(consultor);
  }
  salvarConsultores(lista);
  return lista;
}

export function removerConsultor(numero) {
  const lista = obterConsultores();
  const novaLista = lista.filter(c => c.numero !== numero);
  salvarConsultores(novaLista);
  return novaLista;
}
