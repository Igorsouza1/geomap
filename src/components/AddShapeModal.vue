<template>
  <div class="flex justify-content-center w-full">
    <Button label="+" @click="toggleVisible" class="m-2 w-8" />
  </div>
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
      <FileUpload id="arquivo" mode="basic" :multiple="true" name="arquivo" accept=".kml,.kmz,.shp,.cpg,.dbf,.prj,.qix,.xml" :maxFileSize="100000000000000" @select="onUpload" class="w-full md:w-14rem" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" class="p-button-secondary" @click="toggleVisible"></Button>
      <Button type="button" label="Save" class="p-button-success" @click="submitForm"></Button>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import { submitShape } from '../services/apiService'; 
import { verifyName, verifyArq } from '../utils/validationForm';
import { useMapasStore } from '../stores/mapasStore';

const visible = ref(false);
const shape = reactive({ name: '', dataType: '', file: null });
const dataTypes = [
  { type: 'Shape', value: 'shp' },
  { type: 'KML', value: 'kml' },
  { type: 'Links', value: 'link' }
];

const toggleVisible = () => {
  visible.value = !visible.value;
};

const submitForm = () => {
  if (!verifyName(shape.name) || !verifyArq(shape.file)) {
    console.log(shape.file)
    alert('Campo Nome e seleção de arquivos são obrigatórios');
    console.log('Erro ao enviar formulário');
    return;
  }

  const formData = new FormData();
  formData.append('nome', shape.name);
  formData.append('tipo', shape.dataType.value);
  for (let i = 0; i < shape.file.length; i++) {
    formData.append('arquivo', shape.file[i]);
  }

  submitShape(formData)
    .then(response => {
      console.log('Resposta do servidor:', response.data);
      resetForm();
      toggleVisible();

      //  Adiciona o novo mapa no store
      useMapasStore().loadMapas();
    })
    .catch(error => {
      console.error('Erro na solicitação:', error);
    });
};

const onUpload = (event) => {
  if (event.files && event.files.length > 0) {
    shape.file = event.files;
  } else {
    console.log('Nenhum arquivo foi carregado.');
  }
};

const resetForm = () => {
  Object.assign(shape, { name: '', dataType: '', file: null });
};
</script>

<style scoped>
</style>
