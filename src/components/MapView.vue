<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapasStore } from '../stores/mapasStore';


const mapasStore = useMapasStore()
const mapContainer = ref(null);
const map = ref(null);
const baseLayers = {
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }),
  "Topográfico": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
  }),
  "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  })
};

const initializeMap = () => {
  // Inicializa o mapa
  map.value = L.map(mapContainer.value, {
    zoomControl: false,
    center: [0, 0],
    zoom: 2
  });

  // Adiciona a camada OpenStreetMap por padrão
  baseLayers.OpenStreetMap.addTo(map.value);
};

const addZoomControl = () => {
  // Adiciona o controle de zoom no lado direito do mapa
  L.control.zoom({ position: 'topright' }).addTo(map.value);
};

const addLayerControl = () => {
  // Adiciona o controle de camadas ao mapa
  L.control.layers(baseLayers).addTo(map.value);
};



watch(() => mapasStore.selectedMapas, (newVal) => {
  if (map.value) { 
    map.value.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        map.value.removeLayer(layer);
      }
    });

    newVal.forEach((id) => {
      const shape = mapasStore.mapas.find(mapa => mapa.id === id);
      if (shape) {
        L.geoJSON(JSON.parse(shape.dados_json)).addTo(map.value); 
      }
    });
  }
}, { deep: true });


onMounted(() => {
  initializeMap();
  addZoomControl();
  addLayerControl();
});
</script>

<template>
    <div id="map-container" ref="mapContainer" style="height: 100vh;"></div>
</template>

<style scoped>

.leaflet-container {
    z-index: 1;
    width: 100%;
  }
</style>
