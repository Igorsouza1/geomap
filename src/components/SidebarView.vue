<template>
  <div class="sidebar">
    <div class="init-content">
      <div class="title">Shapes</div>
      <div class="content">
        <ul class="list-container">
          <li class="list-itens" v-for="mapa in mapasStore.mapas" :key="mapa.id">
            <Checkbox class="input-shapes" :value="mapa.id" v-model="selectedMapas"  :id="`checkbox-${mapa.id}`"></Checkbox>
            <label :for="`checkbox-${mapa.id}`">{{ mapa.nome }}</label>
          </li>
        </ul>
      </div>
    </div>
    <AddShapeModal />
  </div>
</template>

<script setup>
import { onMounted, ref  } from 'vue'
import { useMapasStore } from '../stores/mapasStore.js' 
import AddShapeModal from './AddShapeModal.vue'
import Checkbox from 'primevue/checkbox';

const mapasStore = useMapasStore()
const selectedMapas = ref([]);




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
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
  text-align: center;
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

.content{
  width: 100%;
}

.list-container{
  width: 100%;
  margin-left: 5px;
}

.list-itens{
  padding: 5px 10px;
  text-align: left;
  font-weight: 300;
  font-size: 0.9rem;
  display: flex;
  align-items: center;

}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.input-shapes{
  margin-right: 5px;
}





</style>