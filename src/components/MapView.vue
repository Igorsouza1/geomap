<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'MapView',
  mounted() {
    this.initializeMap();
    this.addZoomControl();
    this.addLayerControl();
  },
  methods: {
    initializeMap() {
      // Inicializa o mapa
      this.map = L.map(this.$refs.mapContainer, {
        zoomControl: false,
        center: [0, 0],
        zoom: 2
      });

      // Adiciona a camada OpenStreetMap por padrão
      this.baseLayers.OpenStreetMap.addTo(this.map);
    },
    addZoomControl() {
      // Adiciona o controle de zoom no lado direito do mapa
      L.control.zoom({ position: 'topright' }).addTo(this.map);
    },
    addLayerControl() {
      // Adiciona o controle de camadas ao mapa
      L.control.layers(this.baseLayers).addTo(this.map);
    }
  },
  data() {
    return {
      map: null,
      baseLayers: {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }),
        "Topográfico": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          maxZoom: 17,
        }),
        "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        })
      }
    };
  }
}
</script>

<template>
    <div id="map-container" ref="mapContainer" style="height: 100vh;"></div>
</template>

<style scoped>
.leaflet-container {
    z-index: 1;
    height: 400px;
    width: 100%;
  }
</style>
