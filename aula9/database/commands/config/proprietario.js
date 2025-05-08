db.proprietario.find().forEach(function(doc) {
    db.proprietario.updateOne(
      { _id: doc._id },
      {
        $set: {
          endereco: {
            logradouro: doc.logradouro,
            numero: doc.numero,
            complemento: doc.complemento,
            bairro: doc.bairro,
            cep: doc.cep
          }
        },
        $unset: {
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cep: ""
        }
      }
    );
  });