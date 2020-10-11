const Papa = require('papaparse');
const DEFAULT_BASE_URL = 'https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/';
const parseCsv = data => {
    const rdata = data.map( row => {
        return Object.keys(row).map(key => parseFloat(row[key]))
    })
    return rdata
}
export const loadCsv = (filename, base = DEFAULT_BASE_URL) => {
    return new Promise( resolve => {
        const url = `${base}${filename}`

        console.log(`  * descargando de: ${url}`)
        Papa.parse(url, {download: true, header: true,
            complete: results => {
                resolve(parseCsv(results['data']));
            }
        })
    })
}
export const shuffle = (data, target) =>{
    let counter = data.length;
    let temp = 0;
    let index = 0;
    while (counter > 0) {
      index = (Math.random() * counter) | 0;
      counter--;
      // data:
      temp = data[counter];
      data[counter] = data[index];
      data[index] = temp;
      // target:
      temp = target[counter];
      target[counter] = target[index];
      target[index] = temp;
    }
  }