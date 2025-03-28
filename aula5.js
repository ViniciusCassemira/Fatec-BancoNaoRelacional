use aula5

// Criar um índice em um único campo
db.usuarios.createIndex({ email: 1 })
//1 -> crescente
//-1 -> descrecente

//Buscar pelo campo email serão muito maos rápidas:
db.usuarios.find({ email: "joao@email.com" })

//Criar um índice composto para nome e idade
db.usuarios.createIndex({ nome: 1, idade: -1 })

// Essa consulta usará o índice:
db.usuarios.find({ nome: "Carlos" }).sort({ idade: -1 })

// Criar um índice para um array
db.pedidos.createIndex({ itens: 1 })

// Criar um índice para busca textual
db.produtos.createIndex({ descricao: "text" })
db.produtos.find({ $text: { $search: "notebook" } })

// Índices geoespaciais
db.locais.createIndex({ localizacao: "2dsphere" })

//QUanto espaço um índice ocupa
db.usuarios.totalIndexSize()
//saída: 5242880
//índices ocupam 5MB(5242880 bytes)

db.usuarios.stats().indexSizes

//saída esperada:
// "id_": 4096000,
// "email_1": 1146880,
// "nome_1_idade_1": 2293760

//Saber se um índice está sendo usado -> .explain("executationStats")

db.usuarios.find({ email: "joao@email.com" }).explain("executationStats")
//O mongo escolhe qual índide usal 

db.usuaraios.find({ email: "joao@email.com" }).hint({ email: 1 }).explain("executationStats")
//Falamos qual índice queremos utilizar


//Exercícios

// Crie uma coleção de 100 mil documentos e registre o tempo de consulta sem índices e depois com índices:

for(let i = 0; i < 100000; i++) {
    db.usuarios.insertOne({
        nome: `Usuarios${i}`,
        email: `Usuarios${i}`,
        idade: Math.floor(Math.random() * 80) + 18
    })
}

// Exemplo de uso do hint()

//O mongoDB escolhe o melhor índice para executar uma consulta. Em alguns casos, ele pode fazer uma escolha subótima, e o hint() permite forçar o uso de um índice que sabemos ser melhor
// Casos de uso: Testar qual índice performa melhor / evitar que o mongo use o índice "menos bom "

//Criando os índices
db.pedidos.createIndex({ email: 1 })
db.pedidos.createIndex({ client: 1, status: 1 })

//Consulta
db.pedidos.find({ email: "joao@email.com" }).explain("executionStats")

//Forçando o uso do índice cliente_1_status_1, podemos usar o hint():
-db.pedidos.find({ email: "joao@email.com" }).hint({ cliente: 1, status: 1 }).explain("executationStats")

//Removendo índices

//Se um índice não estiver sendo usado, podemos removê-lo para economizar espaço
db.usuarios.dropIndex("email_1")

//Para listar índices existentes de uma coleção:
db.usuarios.getIndexes()

//Explain()
// O comando .explain("executationStats") permite analisar como uma consulta está sendo executada, mostrando se um índice foi usado e qual foi o custo da operação. Essencial para otimizar consultas e entender a performance

//Exercício
//Crie uma coleção de 100mil documentos e registre o tempo de consuta sem índices e depois com índices:

for(let i = 0; i < 100000; i++){
    db.usuarios.insertOne({
        nome: `Usuarios${i}`,
        email: `usuario${i}@email.com`,
        idade: Math.floor(Math.random() * 80) + 18
    })
}

// *** Consulta sem índices ***
db.usuarios.find({ email: "usuario100000@email.com" }).explain("executionStats")
// "executionTimeMillis" : 43ms

// *** Consulta com índices ***

//Criando índice
db.usuarios.createIndex({ email: 1 })


//consultando com índice
db.usuarios.find({ email: "usuario100000@email.com" }).hint({ email: 1 }).explain("executionStats")
// "executionTimeMillis" : 2ms