<template>
  <div>
    <h1 class="label-title">Reais para dólar</h1>

    <div class="div-result">
      <span class="p-float-label">
        <Input-Text id="input-reais" type="text" v-model="reais" v-bind:disabled="result" />
        <label for="input-reais">Quantidade em reais</label>
      </span>
    </div>
    <div class="div-result">
      <span class="p-float-label">
        <Input-Text id="input-dolar" type="text" v-model="dolar"  v-bind:disabled="result"/>
        <label for="input-dolar">Cotação do dólar</label>
      </span>
    </div>
    <div class="div-result"  v-if="result == null">
      <Action-Button label="Calcular" @click="calculate" />
      <Action-Button label="Limpar" @click="clear" />
    </div>

    <div class="div-result" v-if="result != null">
      <p class="label-result">Com {{ reais }} reais é possível comprar {{result}} dólares a {{dolar}} cada</p>
      <Action-Button label="Calcular Novamente" @click="clear" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dolar: null,
      reais: null,
      result: null,
    };
  },
  methods: {
    calculate: function () {
      this.result = (this.reais / this.dolar).toFixed(2);
    },
    clear() {
      this.dolar = null;
      this.result = null;
      this.reais = null;
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

.div-result {
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
