<template>
  <Button label="+" @click="toggleVisible" class="m-2 w-8"/>
  <Dialog v-model:visible="visible" header="Adicionar Shape" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Adicione Shapes, Pontos, Informações.</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="nome" class="font-semibold w-6rem">Nome</label>
      <InputText id="nome" v-model="shape.name" class="flex-auto w-full" autocomplete="off" />
    </div>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="tipo" class="font-semibold w-6rem">Tipo</label>
      <Dropdown v-model="shape.dataType" :options="dataTypes" optionLabel="type" placeholder="Tipo de arquivo" class="w-full" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="arquivo" class="font-semibold w-6rem">Arquivo</label>
      <FileUpload id="arquivo" mode="basic" name="arquivo" accept=".kml,.kmz,.shp" :maxFileSize="1000000" @select="onUpload" class="w-full md:w-14rem" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" class="p-button-secondary" @click="toggleVisible"></Button>
      <Button type="button" label="Save" class="p-button-success" @click="submitForm"></Button>
    </div>
  </Dialog>
</template>

  
<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import { submitShape } from '../services/apiService'; // Ajuste o caminho conforme necessário
import { verifyName, verifyArq } from '../utils/validationForm'; // Ajuste o caminho conforme necessário
import { useMapasStore } from '../stores/mapasStore';

export default {
  components: { Dialog, Button, InputText, Dropdown, FileUpload },
  data() {
    return {
      visible: false,
      shape: { name: '', dataType: '', file: null },
      dataTypes: [
        { type: 'Shape', value: 'shp' },
        { type: 'KML', value: 'kml' },
        { type: 'Links', value: 'link' }
      ]
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    submitForm() {
      if (!verifyName(this.shape.name) || !verifyArq(this.shape.file)) {
        alert('Campo Nome e seleção de arquivos são obrigatórios')
        console.log('Erro ao enviar formulário');
        return;
      }

      const formData = new FormData();
      formData.append('nome', this.shape.name);
      formData.append('tipo', this.shape.dataType.value);
      formData.append('arquivo', this.shape.file);

      submitShape(formData)
        .then(response => {
          console.log('Resposta do servidor:', response.data);
          this.resetForm();
          this.toggleVisible();
          useMapasStore().loadMapas();
        })
        .catch(error => {
          console.error('Erro na solicitação:', error);
        });

        
    },
    onUpload(event) {
      if (event.files && event.files.length > 0) {
        this.shape.file = event.files[0];
      } else {
        console.log('Nenhum arquivo foi carregado.');
      }
    },
    resetForm() {
      this.shape = { name: '', dataType: '', file: null };
    },
  }
};
</script>

  
  <style scoped>

  </style>
  
  