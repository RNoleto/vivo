<template>
  <main>
    <div class="logo-wrapper">
      <img src="/icons/vivo.svg" alt="Logo Vivo" />
    </div>
    <h1 class="title">Loja Vivo Itajaí</h1>

    <!-- Renderiza a rota atual -->
    <router-view />
  </main>

  <footer class="footer">
    <div class="footer-divider-line"></div>
    <div class="footer-container">
      <div class="footer-info">
        <span>&copy; 2026 Loja Vivo Itajaí. Todos os direitos reservados.</span>
      </div>
      <div class="footer-links">
        <a href="https://rnoleto.vercel.app" target="_blank" rel="noopener noreferrer" class="footer-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="footer-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Desenvolvido por RNoleto
        </a>
        <span class="divider-dot">&bull;</span>
        <router-link to="/dashboard" class="footer-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="footer-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Painel Admin
        </router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style>
/* Apenas estilos específicos do App se precisar */
.logo-wrapper {
  width: 80px;
  height: 80px;
  background-color: #78009D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto 0rem; /* Se quiser menos espaço vertical, reduza */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.logo-wrapper img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
