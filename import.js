const db = require("./firestore");
const data = require('./data.json');

const quotesRef = db.collection('quotes');

data.forEach((quote) => {
  quotesRef.doc(quote.quote).set(quote).then(() => console.log(quote))
})