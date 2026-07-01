<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { obterConsultores, adicionarConsultor, removerConsultor, obterLinks, salvarLinks } from '../utils/storage.js';

const router = useRouter();

// Estados
const consultores = ref([]);
const nome = ref('');
const whatsappInput = ref('');
const fotoBase64 = ref('');
const erroForm = ref('');
const mensagemSucesso = ref('');

// Estados de Links
const links = ref([]);
const mensagemSucessoLinks = ref('');

// Modal de confirmação
const mostrarConfirmacao = ref(false);
const consultorParaDeletar = ref(null);

// Carregar consultores e links
const atualizarLista = () => {
  consultores.value = obterConsultores().sort((a, b) => a.nome.localeCompare(b.nome));
};

onMounted(() => {
  atualizarLista();
  links.value = obterLinks();
});


// Manipulador de upload de foto
const handleFotoUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Limitar tamanho do arquivo a 800KB para evitar estourar o localStorage
  if (file.size > 800 * 1024) {
    erroForm.value = 'A foto é muito grande! Escolha uma imagem de até 800KB.';
    event.target.value = ''; // Limpar input
    return;
  }

  erroForm.value = '';
  const reader = new FileReader();
  reader.onload = (e) => {
    fotoBase64.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Formatar iniciais para avatar alternativo
const obterIniciais = (nomeCompleto) => {
  const partes = nomeCompleto.trim().split(' ');
  if (partes.length === 0 || !partes[0]) return '?';
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

// Submissão do formulário
const cadastrar = () => {
  erroForm.value = '';
  mensagemSucesso.value = '';

  if (!nome.value.trim()) {
    erroForm.value = 'O nome é obrigatório!';
    return;
  }

  // Limpar o número do WhatsApp (deixar apenas dígitos)
  let cleanNumber = whatsappInput.value.replace(/\D/g, '');

  if (cleanNumber.length < 10) {
    erroForm.value = 'Número de WhatsApp inválido! Informe o DDD e o número.';
    return;
  }

  // Se não começar com 55 (DDI do Brasil), adiciona
  if (cleanNumber.length <= 11) {
    cleanNumber = '55' + cleanNumber;
  }

  const novoConsultor = {
    nome: nome.value.trim(),
    numero: cleanNumber,
    foto: fotoBase64.value || null // se não tiver foto, será nulo e renderizará avatar
  };

  adicionarConsultor(novoConsultor);
  atualizarLista();

  // Resetar formulário
  nome.value = '';
  whatsappInput.value = '';
  fotoBase64.value = '';
  
  // Limpar campo de arquivo
  const fileInput = document.getElementById('foto-upload');
  if (fileInput) fileInput.value = '';

  mensagemSucesso.value = 'Consultor cadastrado com sucesso!';
  setTimeout(() => {
    mensagemSucesso.value = '';
  }, 3000);
};

// Solicitar exclusão
const confirmarExclusao = (consultor) => {
  consultorParaDeletar.value = consultor;
  mostrarConfirmacao.value = true;
};

// Confirmar e excluir de fato
const excluirConsultor = () => {
  if (consultorParaDeletar.value) {
    removerConsultor(consultorParaDeletar.value.numero);
    atualizarLista();
    fecharModal();
  }
};

const fecharModal = () => {
  mostrarConfirmacao.value = false;
  consultorParaDeletar.value = null;
};

// Logout
const deslogar = () => {
  sessionStorage.removeItem('isAdminAuthenticated');
  router.push('/login');
};

const irParaHome = () => {
  router.push('/');
};

// Salvar links
const salvarAlteracoesLinks = () => {
  salvarLinks(links.value);
  mensagemSucessoLinks.value = 'Links salvos com sucesso!';
  setTimeout(() => {
    mensagemSucessoLinks.value = '';
  }, 3000);
};
</script>

<template>
  <section class="dashboard-container">
    <!-- Cabeçalho do Dashboard -->
    <header class="db-header">
      <div class="db-title-area">
        <h2>Painel Admin</h2>
        <p>Gerenciamento de Consultores</p>
      </div>
      <div class="db-actions">
        <button @click="irParaHome" class="btn-secundario">Visualizar Site</button>
        <button @click="deslogar" class="btn-danger">Sair</button>
      </div>
    </header>

    <!-- Estatísticas -->
    <div class="db-stats">
      <div class="stat-card">
        <span class="stat-number">{{ consultores.length }}</span>
        <span class="stat-label">Consultores Ativos</span>
      </div>
    </div>

    <!-- Conteúdo em duas seções -->
    <div class="db-grid">
      <!-- Formulário de Cadastro -->
      <div class="card-painel">
        <h3>Cadastrar Novo Consultor</h3>
        
        <form @submit.prevent="cadastrar" class="form-cadastro">
          <div class="input-group">
            <label for="nome-cad">Nome Completo</label>
            <input 
              type="text" 
              id="nome-cad" 
              v-model="nome" 
              placeholder="Ex: Pamella Souza" 
              required
            />
          </div>

          <div class="input-group">
            <label for="whatsapp-cad">WhatsApp (DDD + Número)</label>
            <input 
              type="text" 
              id="whatsapp-cad" 
              v-model="whatsappInput" 
              placeholder="Ex: (47) 99143-4460" 
              required
            />
            <small class="helper-text">Insira com DDD. Ex: 47991434460</small>
          </div>

          <div class="input-group">
            <label>Foto do Consultor</label>
            
            <div class="upload-area">
              <label for="foto-upload" class="custom-file-upload">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="upload-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                Selecionar Imagem
              </label>
              <input 
                type="file" 
                id="foto-upload" 
                accept="image/*" 
                @change="handleFotoUpload" 
                class="hidden-input"
              />
              
              <!-- Preview da foto -->
              <div v-if="fotoBase64" class="preview-wrapper">
                <img :src="fotoBase64" alt="Preview da Foto" class="photo-preview" />
                <button type="button" @click="fotoBase64 = ''" class="btn-remove-photo">×</button>
              </div>
              <div v-else class="preview-empty">
                <div class="avatar-placeholder-preview">
                  {{ nome ? obterIniciais(nome) : '?' }}
                </div>
                <span>Sem foto (gerará avatar)</span>
              </div>
            </div>
          </div>

          <div v-if="erroForm" class="error-message">
            {{ erroForm }}
          </div>

          <div v-if="mensagemSucesso" class="success-message">
            {{ mensagemSucesso }}
          </div>

          <button type="submit" class="btn-cadastrar">Cadastrar Consultor</button>
        </form>
      </div>

      <!-- Lista de Consultores -->
      <div class="card-painel">
        <h3>Consultores Cadastrados ({{ consultores.length }})</h3>
        
        <div v-if="consultores.length === 0" class="empty-list">
          Nenhum consultor cadastrado.
        </div>
        
        <div v-else class="consultores-list-admin">
          <div v-for="c in consultores" :key="c.numero" class="consultor-item-admin">
            <div class="consultor-avatar-wrapper">
              <img v-if="c.foto" :src="c.foto" alt="Foto de c.nome" class="admin-photo" />
              <div v-else class="admin-avatar-initials">
                {{ obterIniciais(c.nome) }}
              </div>
            </div>
            <div class="consultor-info">
              <span class="consultor-nome">{{ c.nome }}</span>
              <span class="consultor-fone">+{{ c.numero }}</span>
            </div>
            <button @click="confirmarExclusao(c)" class="btn-action-delete" title="Excluir Consultor">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="trash-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Edição de Links do Site -->
      <div class="card-painel">
        <h3>Editar Links do Site</h3>
        
        <form @submit.prevent="salvarAlteracoesLinks" class="form-cadastro">
          <div v-for="(item, index) in links" :key="item.id" class="link-edit-group">
            <div class="link-header-row">
              <span class="link-icon-preview-wrapper">
                <img :src="item.icon" :alt="item.text" class="link-icon-preview" />
              </span>
              <span class="link-identifier">
                {{ item.id === 'google' ? 'Avaliação do Google' : item.id === 'iphone' ? 'App Store (iPhone)' : 'Play Store (Android)' }}
              </span>
            </div>
            
            <div class="link-inputs-row">
              <div class="input-subgroup">
                <label :for="'link-text-' + index">Texto do Card</label>
                <input 
                  type="text" 
                  :id="'link-text-' + index" 
                  v-model="item.text" 
                  required
                />
              </div>
              <div class="input-subgroup">
                <label :for="'link-url-' + index">Link de Destino (URL)</label>
                <input 
                  type="text" 
                  :id="'link-url-' + index" 
                  v-model="item.link" 
                  required
                />
              </div>
            </div>
          </div>

          <div v-if="mensagemSucessoLinks" class="success-message">
            {{ mensagemSucessoLinks }}
          </div>

          <button type="submit" class="btn-cadastrar">Salvar Links</button>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação customizado -->
    <div v-if="mostrarConfirmacao" class="modal-overlay">
      <div class="modal-card">
        <h4>Confirmar Exclusão</h4>
        <p>Tem certeza que deseja excluir o(a) consultor(a) <strong>{{ consultorParaDeletar?.nome }}</strong>?</p>
        <p class="modal-warning">Esta ação não pode ser desfeita.</p>
        <div class="modal-buttons">
          <button @click="fecharModal" class="btn-modal-cancel">Cancelar</button>
          <button @click="excluirConsultor" class="btn-modal-confirm">Excluir</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0.5rem;
}

/* Cabeçalho */
.db-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 1.5rem;
  color: white;
  text-align: left;
}

.db-title-area h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.5px;
}

.db-title-area p {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);
}

.db-actions {
  display: flex;
  gap: 0.75rem;
}

/* Botões */
.btn-secundario {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secundario:hover {
  background: rgba(255, 255, 255, 0.25);
}

.btn-danger {
  background: #ff5252;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(255, 82, 82, 0.2);
}

.btn-danger:hover {
  background: #ff3333;
  transform: translateY(-1px);
}

/* Estatísticas */
.db-stats {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  min-width: 150px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 0.4rem;
  letter-spacing: 0.5px;
}

/* Grid Layout */
.db-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-painel {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  color: #5A50B3;
  text-align: left;
}

.card-painel h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 800;
  border-bottom: 2px solid #f3e5f5;
  padding-bottom: 0.75rem;
  color: #78009D;
}

/* Formulário de Cadastro */
.form-cadastro {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #5A50B3;
}

.input-group input[type="text"] {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid #78009D;
  font-size: 0.95rem;
  font-family: inherit;
  color: #333;
  outline: none;
  transition: all 0.3s;
}

.input-group input[type="text"]:focus {
  border-color: #5A50B3;
  box-shadow: 0 0 8px rgba(90, 80, 179, 0.2);
}

.helper-text {
  font-size: 0.78rem;
  color: #888;
  margin-top: 0.1rem;
}

/* Upload de Foto */
.upload-area {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.custom-file-upload {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f3e5f5;
  color: #78009D;
  border: 1px dashed #78009D;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.custom-file-upload:hover {
  background-color: #ebd3f8;
}

.upload-icon {
  width: 18px;
  height: 18px;
}

.hidden-input {
  display: none;
}

.preview-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #78009D;
}

.btn-remove-photo {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff5252;
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.preview-empty {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #888;
  font-size: 0.85rem;
}

.avatar-placeholder-preview {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #5A50B3 0%, #874DA2 50%, #B24890 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.5rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.btn-cadastrar {
  background: linear-gradient(135deg, #5A50B3 0%, #78009D 100%);
  color: white;
  border: none;
  padding: 0.85rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(90, 80, 179, 0.3);
  text-align: center;
  margin-top: 0.5rem;
}

.btn-cadastrar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(90, 80, 179, 0.45);
}

/* Mensagens de Feedback */
.error-message {
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #c62828;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
}

.success-message {
  background: #e8f5e9;
  border: 1px solid #c8e6c9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  animation: fadeIn 0.3s ease;
}

/* Lista de Consultores Administrável */
.empty-list {
  text-align: center;
  color: #888;
  padding: 2rem 0;
  font-style: italic;
}

.consultores-list-admin {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.consultor-item-admin {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid #f3e5f5;
  border-radius: 12px;
  transition: background-color 0.2s;
}

.consultor-item-admin:hover {
  background-color: #faf5fc;
}

.consultor-avatar-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.admin-avatar-initials {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #5A50B3 0%, #874DA2 50%, #B24890 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
}

.consultor-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.consultor-nome {
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}

.consultor-fone {
  font-size: 0.82rem;
  color: #666;
  margin-top: 0.1rem;
}

.btn-action-delete {
  background: transparent;
  color: #ff5252;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-action-delete:hover {
  background: #ffebee;
  color: #ff1744;
}

.trash-icon {
  width: 20px;
  height: 20px;
}

/* Custom Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center;
  color: #333;
  animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-card h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.35rem;
  color: #c62828;
  font-weight: 800;
}

.modal-card p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 0.5rem;
}

.modal-warning {
  font-size: 0.85rem !important;
  color: #888 !important;
  font-style: italic;
  margin-bottom: 1.5rem !important;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-modal-cancel {
  background: #eee;
  color: #333;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-modal-cancel:hover {
  background: #e0e0e0;
}

.btn-modal-confirm {
  background: #ff5252;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-modal-confirm:hover {
  background: #ff1744;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Estilos de Edição de Links */
.link-edit-group {
  border-bottom: 1px solid #f3e5f5;
  padding-bottom: 1.25rem;
  margin-bottom: 0.75rem;
}

.link-edit-group:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0.5rem;
}

.link-header-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.link-icon-preview-wrapper {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #5A50B3 0%, #874DA2 50%, #B24890 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.link-icon-preview {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.link-identifier {
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #78009D;
}

.link-inputs-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 500px) {
  .link-inputs-row {
    grid-template-columns: 1fr 1fr;
  }
}

.input-subgroup {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.input-subgroup label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #5A50B3;
}

.input-subgroup input {
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid #78009D;
  font-size: 0.9rem;
  font-family: inherit;
  color: #333;
  outline: none;
  transition: all 0.3s;
}

.input-subgroup input:focus {
  border-color: #5A50B3;
  box-shadow: 0 0 8px rgba(90, 80, 179, 0.2);
}
</style>
