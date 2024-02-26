// src/stores/mapasStore.js
import { defineStore } from 'pinia';
import { fetchMapas } from '../services/apiService.js'; 

export const useMapasStore = defineStore('mapas', {
  state: () => ({
    mapas: [],
  }),
  actions: {
    async loadMapas() {
      try {
        const response = await fetchMapas();
        this.mapas = response.data;
      } catch (error) {
        console.error("Erro ao buscar mapas:", error);
      }
    }
  }
});
