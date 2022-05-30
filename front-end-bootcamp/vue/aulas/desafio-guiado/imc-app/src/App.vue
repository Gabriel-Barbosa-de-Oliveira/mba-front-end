<template>
  <div>
    <h1 class="label-title">Cálculo do IMC</h1>
    <h2 class="label-subtitle">Digite seu peso e altura para calcular o IMC</h2>

    <div class="div-imc">
      <span class="p-float-label">
        <Input-Text id="input-weight" type="text" v-model="weight" v-bind:disabled="imc" />
        <label for="input-weight">Peso</label>
      </span>
    </div>
    <div class="div-imc">
      <span class="p-float-label">
        <Input-Text id="input-height" type="text" v-model="height"  v-bind:disabled="imc"/>
        <label for="input-height">Altura</label>
      </span>
    </div>
    <div class="div-imc"  v-if="imc == null && classification == null">
      <Action-Button label="Calcular" @click="calculate" />
      <Action-Button label="Limpar" @click="clear" />
    </div>

    <div class="div-imc" v-if="imc != null && classification != null">
      <p class="label-result">Seu imc é : {{ imc }}</p>
      <p class="label-classification">A classificação do seu imc é : {{ classification }}</p>
      <Action-Button label="Calcular Novamente" @click="clear" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: null,
      weight: null,
      imc: null,
      classification: null,
    };
  },
  methods: {
    calculate: function () {
      this.imc = (this.weight / Math.pow(this.height, 2)).toFixed(2);
      if (this.imc < 18.5) {
        this.classification = "Magreza";
      } else if (this.imc >= 18.5 && this.imc < 25) {
        this.classification = "Normal";
      } else if (this.imc >= 25 && this.imc < 30) {
        this.classification = "Sobrepeso";
      } else if (this.imc >= 30 && this.imc < 40) {
        this.classification = "Obesidade";
      } else {
        this.classification = "Obesidade Grave";
      }
    },
    clear() {
      this.height = null;
      this.imc = null;
      this.weight = null;
      this.classification = null;
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.div-imc {
  margin-top: 2rem;
}

.label-title {
  font-size: 2rem;
}

.label-subtitle {
  font-size: 1.1rem;
}

.label-result {
  font-size: 2rem;
}

.label-classification {
  font-size: 1.5rem;
}
</style>
