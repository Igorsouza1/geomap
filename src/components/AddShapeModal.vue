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
      <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" class="w-full md:w-14rem" />
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
  
  export default {
  components: { Dialog, Button, InputText, Dropdown, FileUpload },
  data() {
    return {
      visible: false,
      shape: { name: '', dataType: '', file: null },
      dataTypes: [
        { type: 'Shape', value: 'shape' },
        { type: 'Pontos', value: 'ponto' },
        { type: 'Links', value: 'link' }
      ]
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    submitForm() {
      console.log('Formulário submetido:', this.shape);
      this.toggleVisible(); // Fecha a modal após a submissão
    },
    onUpload(event) {
      console.log('Arquivo enviado:', event.files);
      // Lógica de tratamento após o upload
    }
  }
};
</script>
  
  <style scoped>

  </style>
  
  