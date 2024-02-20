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
import axios from '../utils/axios';


export default {
  components: { Dialog, Button, InputText, Dropdown, FileUpload },
  data() {
    return {
      visible: false,
      shape: { name: '', dataType: '', file: null },
      arqType: [{ type: 'KML' }, { type: 'KMZ' }, { type: 'SHP' }],
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
    verifyFormInput() {
      return this.verifyName() && this.verifyArq(); // Use 'this' para acessar métodos dentro do objeto
    },

    getCSRFToken () {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    },
    submitForm() {
      
      if (!this.verifyFormInput()) {
        console.log('Erro ao enviar formulário');
        return;
      }
      axios.defaults.headers.common['X-CSRFToken'] = this.getCSRFToken();
      // Prepara os dados do formulário para envio
      const formData = new FormData();
      formData.append('nome', this.shape.name);
      formData.append('tipo', this.shape.dataType.value); // Certifique-se de que isso reflete o que você espera receber no back-end
      formData.append('arquivo', this.shape.file);

      // Realiza a solicitação de POST para o servidor
      axios.post('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        this.shape.name = '';
        this.shape.dataType = '';
        this.shape.file = null;
        this.toggleVisible(); // Fecha a modal após a submissão
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        // Lida com o erro aqui, como mostrar uma mensagem para o usuário
      });
    },
    onUpload(event) {
      if (event.files && event.files.length > 0) {
        this.shape.file = event.files[0];
        console.log('Arquivo carregado:', this.shape.file);
      } else {
        console.log('Nenhum arquivo foi carregado.');
      }
    },
    verifyName() {
      if (this.shape.name.trim() === '') { // 'this.shape' para acessar 'name'
        alert('O campo Nome é obrigatório.');
        return false;
      }
      return true;
    },
    verifyArq() {
      const fileExtension = this.shape.file?.name.split('.').pop(); // 'this.shape' para acessar 'file'
      if (!['kml', 'kmz', 'shp'].includes(fileExtension)) {
        alert('Formato de arquivo inválido. Por favor, selecione um arquivo .kml, .kmz ou .shp.');
        return false;
      }
      return true;
    }
  }
};
</script>
  
  <style scoped>

  </style>
  
  