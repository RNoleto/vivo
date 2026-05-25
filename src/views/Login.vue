<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const erroMsg = ref('');
const carregando = ref(false);
const shakeCard = ref(false);

const realizarLogin = () => {
  if (carregando.value) return;
  
  carregando.value = true;
  erroMsg.value = '';
  
  // Simular pequeno delay para dar feedback visual de carregamento
  setTimeout(() => {
    if (username.value === 'santana' && password.value === '02144060240') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      erroMsg.value = 'Usuário ou senha incorretos!';
      shakeCard.value = true;
      setTimeout(() => {
        shakeCard.value = false;
      }, 500);
    }
    carregando.value = false;
  }, 600);
};

const voltar = () => {
  router.push('/');
};
</script>

<template>
  <section class="login-container">
    <div class="login-card" :class="{ 'shake': shakeCard }">
      <div class="lock-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="lock-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      </div>
      
      <h2>Área Restrita</h2>
      <p class="subtitle">Faça login para gerenciar consultores</p>

      <form @submit.prevent="realizarLogin" class="form-login">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
            placeholder="Digite o usuário"
            autocomplete="username"
            :disabled="carregando"
          />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="Digite a senha"
            autocomplete="current-password"
            :disabled="carregando"
          />
        </div>

        <div v-if="erroMsg" class="error-message">
          {{ erroMsg }}
        </div>

        <button type="submit" class="btn-entrar" :disabled="carregando">
          <span v-if="carregando" class="spinner"></span>
          <span v-else>Entrar</span>
        </button>
      </form>

      <button @click="voltar" class="btn-voltar">← Voltar para o início</button>
    </div>
  </section>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  margin: auto 0;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
  color: white;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.35);
}

.lock-icon-wrapper {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.2) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.lock-icon {
  width: 28px;
  height: 28px;
  color: #78009D;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.subtitle {
  margin: 0 0 2rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.form-login {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
}

.input-group input {
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-group input:focus {
  border-color: white;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.error-message {
  background: rgba(255, 82, 82, 0.25);
  border: 1px solid rgba(255, 82, 82, 0.5);
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #ffcccc;
  animation: fadeIn 0.3s ease;
}

.btn-entrar {
  background: white;
  color: #78009D;
  border: none;
  padding: 0.9rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.btn-entrar:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  background: #f3e5f5;
}

.btn-entrar:active:not(:disabled) {
  transform: translateY(0);
}

.btn-entrar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-voltar {
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  border: none;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.btn-voltar:hover {
  color: white;
  text-decoration: underline;
}

/* Spinner de Carregamento */
.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(120, 0, 157, 0.3);
  border-top-color: #78009D;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Shake Animation */
.shake {
  animation: shakeKeyframe 0.5s ease-in-out;
}

@keyframes shakeKeyframe {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
</style>
