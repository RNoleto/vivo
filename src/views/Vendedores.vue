<script setup>
import Card from '../components/ui/Card.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const voltar = () => {
  router.push('/');
};

const vendedores = [
    {
        nome: 'Gustavo Henrique',
        numero: '559691724047',
        mensagem: 'Olá, Gustavo! Gostaria de falar sobre a loja de Itajaí.'
    },
    {
        nome: 'Juliana Silva',
        numero: '5596988889999',
        mensagem: 'Olá, Juliana! Gostaria de falar sobre a loja de Itajaí.'
    },
    {
        nome: 'Carlos Souza',
        numero: '5596977776666',
        mensagem: 'Oi Carlos! Gostaria de falar sobre a loja de Itajaí.'
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
            <Card :text="vendedor.nome" icon="/icons/seller.svg"
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