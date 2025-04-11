<script setup>
import Card from '../components/ui/Card.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const voltar = () => {
  router.push('/');
};

let consultores = [
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
        nome: 'Carlos Eduardo',
        foto: '/foto/carlos.webp',
        numero: '5547992413762'
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

//Ordenar consultores em ordem alfabetica
consultores.sort((a, b) => a.nome.localeCompare(b.nome))

// Gerar mensagem dinamicamente
consultores = consultores.map(c => ({
    ...c,
    mensagem: `Olá, ${c.nome}! Gostaria de um atendimento.`
}))

// Função para gerar link do WhatsApp com a mensagem
const gerarLinkWhatsapp = (numero, mensagem) => {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
};
</script>

<template>
    <section>
        <div v-for="consultor in consultores" :key="consultor.numero">
            <Card :text="consultor.nome" :photo="consultor.foto"
                :link="gerarLinkWhatsapp(consultor.numero, consultor.mensagem)" />
        </div>
        <div class="botao-voltar-wrapper">
            <button @click="voltar" class="voltar">← Voltar</button>
        </div>
    </section>
</template>

<style scoped>
.botao-voltar-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.voltar {
  background-color: white;
  color: #5A50B3;
  border: 1px solid #78009D;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.voltar:hover {
  background-color: #5A50B3;
  color: white;
}
</style>