<template>
  <div class="sidebar">
    <div class="init-content">
      <div class="title">Shapes</div>
      <div class="content">
        <ul>
          <!-- Note a mudança aqui para acessar mapas de mapasStore.mapas -->
          <li class="list-itens" v-for="mapa in mapasStore.mapas" :key="mapa.id">
            <input class="input-shapes" type="checkbox" :id="`checkbox-${mapa.id}`" :value="mapa.id" v-model="selectedMapas">
            <label :for="`checkbox-${mapa.id}`">{{ mapa.nome }}</label>
          </li>
        </ul>
      </div>
    </div>
    <AddShapeModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMapasStore } from '../stores/mapasStore.js' // Ajuste o caminho conforme necessário
import AddShapeModal from './AddShapeModal.vue'

const mapasStore = useMapasStore()

onMounted(() => {
  mapasStore.loadMapas()
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
  width: 15%;
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


.sidebar a {
  color: #fff;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.list-itens{
  padding: 5px 10px;
  text-align: left;
  font-weight: 300;
  font-size: 0.9rem;
}

.sidebar ul {
  list-style: none; /* Remove estilos padrão da lista */
  padding: 0;
}

.input-shapes{
  margin-right: 5px;
}



</style>