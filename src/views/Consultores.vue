<script setup>
import Card from '../components/ui/Card.vue';
import { useRouter } from 'vue-router';
import { obterConsultores } from '../utils/storage.js';

const router = useRouter();

const voltar = () => {
  router.push('/');
};

// Obter consultores do localStorage
const consultoresCarregados = obterConsultores();

// Ordenar consultores em ordem alfabetica
consultoresCarregados.sort((a, b) => a.nome.localeCompare(b.nome));

// Gerar mensagem dinamicamente e preparar array
const consultores = consultoresCarregados.map(c => ({
    ...c,
    mensagem: `Olá, ${c.nome}! Gostaria de um atendimento.`
}));

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
