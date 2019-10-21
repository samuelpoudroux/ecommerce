const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");



Paiement.post("/charge", async (req, res) => {
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
  
      res.json({status});
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  });
  

  module.exports= Paiement