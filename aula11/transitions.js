use mongo-aula-11;

db.createCollection("clientes");
db.createCollection("pedidos");

db.clientes.insertOne({
    "nome": "João",
});

const session = db.getMongo().startSession();
const clientes = session.getDatabase("mongo-aula-11").clientes;
const pedidos = session.getDatabase("mongo-aula-11").pedidos;

session.startTransaction();

try {
  clientes.updateOne(
    { nome: "João" },
    { $set: { status: "inativo" } },
    { session }
  );

  pedidos.insertOne({
    cliente: "João",
    produto: "Teclado",
    valor: 200
  }, { session });

  session.commitTransaction();
  print("Transação concluída com sucesso!");
} catch (error) {
  session.abortTransaction();
  print("Erro! Transação cancelada.");
} finally {
  session.endSession();
}
