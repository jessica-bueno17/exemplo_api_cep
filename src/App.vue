<template>
  <v-container>
    <v-form 
      class="d-flex flex-column align-center"
      v-model="validForm"
      @submit.prevent="requestCep"
    >
      <legend class="mb-4">Informe o CEP</legend>
      <v-text-field
        class="form__input"
        v-maska:[options]
        label="CEP"
        v-model="cep"
        type="tel"
        :rules="[rules.requiredCep, rules.lengthCep]"
      />
      <v-btn
        type="submit"
        color="primary"
        class="mt-4"
        :loading="loading"
        :disabled="loading || !validForm"
      >
        Buscar
      </v-btn>
    </v-form>

    <v-container v-show="endereco">
      <v-table >
        <tbody>
          <tr class="tabela__color">
            <td>Logradouro</td>
            <td>{{ logradouro }}</td>
          </tr>
          <tr>
            <td>Bairro</td>
            <td>{{ bairro }}</td>
          </tr>
          <tr class="tabela__color">
            <td>Cidade</td>
            <td>{{ localidade }}</td>
          </tr>
          <tr>
            <td>Estado</td>
            <td>{{ uf }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-container>

  </v-container>

</template>

<script setup>
import { ref, reactive } from "vue";
import cepApi from "./api/cep.js";

const options = reactive({
    mask: ["#####-###"],
    eager: true,
});

let cep = ref("");
let logradouro = ref("");
let bairro = ref("");
let localidade = ref("");
let uf = ref("");
let loading = ref(false);
let validForm = ref(false);
let endereco = ref(false);


const rules = {
    requiredCep: (value) =>
        !!value || "O campo do CEP é obrigatório.",
    lengthCep: (value) =>
        value.length >= 9 || "O campo do CEP está incompleto.",
};

const requestCep = async () => {
  try {
    loading.value = true;
    cep.value = cep.value.replace(/\D/g, '');
    const response = await cepApi.cep(cep.value);

    console.log(response.data);
    
    localidade.value = response.data.localidade;
    bairro.value = response.data.bairro ? response.data.bairro : "Indefinido";
    logradouro.value = response.data.logradouro ? response.data.logradouro : "Indefinido";
    uf.value = response.data.uf;
    endereco.value = true;

    if(response.data.erro){
      endereco.value = false;
      cep.value = "";
      alert("CEP não encontrado!");

    }

  } finally {
    loading.value = false;
    validForm.value = false;
  }
};
  
</script>

<style scoped>
.form__input {
  min-width: 300px;
}

.tabela__color {   
  background-color: #e9e9e9D9;
}


</style>
