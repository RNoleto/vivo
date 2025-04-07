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
    <a href="https://rnoleto.vercel.app" target="_blank" rel="noopener noreferrer">
      Desenvolvido por Ramon Noleto
    </a>
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
