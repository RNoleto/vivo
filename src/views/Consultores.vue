<script setup>
import Card from '../components/ui/Card.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const voltar = () => {
  router.push('/');
};

const vendedores = [
    {
        nome: 'Pamella',
        foto: '/foto/pamella.webp',
        numero: '5547991434460',
        mensagem: 'Olá, Pamella! Gostaria de um atendimento.'
    },
    {
        nome: 'Crisley',
        foto: '/foto/crisley.webp',
        numero: '5547992742740',
        mensagem: 'Olá, Crisley! Gostaria de um atendimento.'
    },
    {
        nome: 'Carlos Eduardo',
        foto: '/foto/carlos.webp',
        numero: '5547992413762',
        mensagem: 'Olá, Carlos! Gostaria de um atendimento.'
    },
    {
        nome: 'Camilly',
        foto: '/foto/camilly.webp',
        numero: '5547991866235',
        mensagem: 'Olá, Camilly! Gostaria de um atendimento.'
    },
    {
        nome: 'Ingrid',
        foto: '/foto/ingrid.webp',
        numero: '5547992876919',
        mensagem: 'Olá, Ingrid! Gostaria de um atendimento.'
    },
    {
        nome: 'Gerusa',
        foto: '/foto/gerusa.webp',
        numero: '5547984033499',
        mensagem: 'Olá, Gerusa! Gostaria de um atendimento.'
    }
];

// Função para gerar link do WhatsApp com a mensagem
const gerarLinkWhatsapp = (numero, mensagem) => {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
};
</script>

<template>
    <section>
        <div v-for="vendedor in vendedores" :key="vendedor.numero">
            <Card :text="vendedor.nome" :photo="vendedor.foto"
                :link="gerarLinkWhatsapp(vendedor.numero, vendedor.mensagem)" />
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