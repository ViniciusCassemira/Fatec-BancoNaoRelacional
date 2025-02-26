//Operadores no mongodb
use mongo-aula3;
db.createCollection("produtos");

db.produtos.insertMany([
    {
        "_id": 1,
        "nome": "Notebook Dell",
        "categoria": "Eletrônicos",
        "preco": 4500,
        "estoque": 15,
        "avaliacao": 4.7
    },
    {
        "_id": 2,
        "nome": "Smartphone Samsung",
        "categoria": "Eletrônicos",
        "preco": 2500,
        "estoque": 30,
        "avaliacao": 4.5
    },
    {
        "_id": 3,
        "nome": "Cadeira Gamer",
        "categoria": "Móveis",
        "preco": 1200,
        "estoque": 10,
        "avaliacao": 4.8
    }
])

//Operadores de comparação
//- eq, ne, gt, lt, gte, lte
//  SQL     -     MONGO
//  <              $lt
//  >              $gt
//  >=             $gte
//  <=             $lte
//  !=             $ne
//  =              $eq
// SELECT * FROM PRODUTOS WHERE preco = 2500
// - db.produtos.find({ "preco": { "$eq": 2500 } })
// - db.produtos.find({ "preco": { "$ne": 4500 } })
// - db.produtos.find({ "preco": { "$gt": 2000 } })
// - db.produtos.find({ "preco": { "$lt": 3000 } })
// - db.produtos.find({ "preco": { "$gte": 1000, "$lte": 3000 } }).pretty()


//Operadores lógicos
//- and, or, nor, not

//and
db.produtos.find({
    "$and" : [
        {"categoria": "Eletrônicos"},
        {"preco": {"$gt": 3000}}
    ]
})
// Exige que todas as condições especificadas sejam verdadeiras

//or
db.produtos.find({
    "$or": [
        { "categoria": "Eletrônicos" },
        { "preco": {"$gt": 4000}}
    ]
})
//Retorna documentos que satisfaçam pelo menos uma das condições especificadas

//not
db.produtos.find({ "preco":{
    "$not": {"$gt": 3000}
}})
//Nega uma condição específica

//nor
db.produtos.find({
    "$nor": [
        {"categoria": "Eletrônicos"},
        {"preco": { "$gt": 4000}}
    ]
})
//É o oposto de $or, excluindo documentos que satisfaçam qualquer uma das condições listadas

//Operadores de Elemento
//- type e exists

//exists
db.produtos.find({"avaliacao":{ "$exists": true }})
//Filtra documentos com base no tipo de dado armazenado em um campo

//type
db.produtos.find({"preco": {"$type": "double"}}).pretty()
//retorna todos os documentos onde o campo preco seja do tipo double

//Exercícios

//1)Utilize o operador $gte para encontrar todos os produtos com preço maior ou igual a 2000
db.produtos.find({"preco": {"gte": 2000}}).pretty()

//2)Filtre os produtor que pertencem à categoria "Móveis" e possuem avaliação superior a 4.5 usando $and
db.produtos.find({"$and": [
    {"categoria": "Móveis"},
    {"avaliacao": {"$gt": 4.5}}
]}).pretty()

//3)Us $or para retornar todos os produtos que custam menos de 2000 ou têm estoque maior que 20
db.produtos.find({"$or":[
    {"preco": {"$lt": 2000}},
    {"estoque": {"$gt": 20}}
]})

//4)Escreva uma consuta que retorne apenas os produtos que possuem o campo avaliacao
db.produtos.find({"avaliacao":{"$exists": true}}).pretty()

//5)Utilize $nor para excluir da busca os produtos da categoria "Eletrônicos" e aqueles com preço maior que 300
db.produtos.find({
    "$nor": [
        {"categoria": "Eletrônicos"},
        {"preco": { "$gt": 300}}
    ]
})