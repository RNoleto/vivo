<!-- src/App.vue -->
<template>
  <main>
    <div class="logo-wrapper">
      <img src="/icons/vivo.svg" alt="Logo Vivo" />
    </div>
    <h1 class="title">Loja Vivo Itajaí</h1>
    <router-view />
  </main>
</template>

<style scoped>
.title {
  color: white;
  margin-bottom: 2rem;
}
.logo-wrapper {
  width: 80px;
  height: 80px;
  background-color: #78009D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.logo-wrapper img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>


