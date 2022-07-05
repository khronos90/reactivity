const { watch, reactive } = require("./reactivity");

let price = 1;
let quantity = 2;
let total = 0;

const priceReactive = reactive(price);
const quantityReactive = reactive(quantity);

watch(() => {
  total = priceReactive.value * quantityReactive.value;
});

console.log(total);
priceReactive.value = 4;
console.log(total);
quantityReactive.value = 12;
console.log(total);
