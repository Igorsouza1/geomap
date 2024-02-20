<template>
  <div class="sidebar">
    <div class="title">Shapes</div>
    <div class="content">
      <li>
        content
      </li>
    </div>
    <AddShapeModal />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import AddShapeModal from './AddShapeModal.vue'

defineComponent({
  name: 'Sidebar'
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.sidebar {
  display: flex; /* Adiciona flexbox */
  flex-direction: column; /* Organiza os filhos em coluna */
  justify-content: space-between; /* Separa o conteúdo e o AddShapeModal */
  text-align: center;
  align-items: center;
  z-index: 10;
  width: 120px;
  height: 100vh;
  background-color: #333;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
}

.title {
  padding: 20px;
  font-size: 1.2em;
  text-align: center;
}

.content {
  padding: 10px 20px;
}

.sidebar a {
  color: #fff;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}
</style>