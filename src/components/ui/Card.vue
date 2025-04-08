<script setup>
defineProps({
  text: String,
  icon: String,
  photo: String,
  link: String,
  internal: Boolean,
});
</script>

<template>
  <component
    :is="internal ? 'RouterLink' : 'a'"
    :to="internal ? link : undefined"
    :href="!internal ? link : undefined"
    :target="!internal ? '_blank' : undefined"
    :rel="!internal ? 'noopener noreferrer' : undefined"
    class="card"
  >
  <div class="icon-wrapper">
    <img
        v-if="photo"
        :src="photo"
        alt="Foto"
        class="photo"
      />
      <img
        v-else
        :src="icon"
        alt="Ícone"
        class="icon"
      />
  </div>
    <p>{{ text }}</p>
  </component>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  text-align: left;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  border: 1px solid #78009D;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.01);
}

.icon-wrapper{
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #5A50B3 0%, #874DA2 50%, #B24890 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.icon-wrapper .icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

/* ✅ Estilo para foto circular */
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
