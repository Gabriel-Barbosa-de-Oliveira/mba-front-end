

class ChartBuilder {
  type;
  data;
  options;

  constructor(type, data, options) {
    this.type = type;
    this.data = data;
    this.options = options;
  }


  build() {
    return {
      type,
      data,
      options
    }
  }
}

function getChartConfig(type, data, options) {
  return new ChartBuilder(type, data, options);
}