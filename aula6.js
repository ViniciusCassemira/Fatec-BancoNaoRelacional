//Juntando coleções e agregação




//juntando duas coleções | Para relacionar 2 coleções, temos 2 maneiras:
//Documentos incorporados(embed) -> Uma coleção dentro da outra
//Referências(references) -> Usando chaves estrangeiras

//$lookup -> ferramenta para relacionar duas coleções, parecido com o join

//user
{
    "_id": ObjectId("743hfs7943")
    "name": "Alice"
}

//orders
{
    "_id": ObjectId("67dfs"),
    "item": "Laptop",
    "price": 1234,
    "user_id": ObjectId("743hfs7943")
}

db.orders.aggregate([
    {
        $lookup: {
            from: "users", //coleção que vamos usar para juntar
            localField: "user_id", //id que vamos usar no campo orders para se ralacionar com user
            foreignField: "_id", //campo de user para se relacionar em orders
            as: "user_info", //aonde essa resposta 
        }
    }
])

db.orders.aggregate([
    {
        $group: {
            _id: "$product_id", // Agrupa pelos IDs de produtos
            total_orders: { $sum: 1 }, // Conta o número de pedidos
            total_quantity: { $sum: "$quantity" } // Soma a quantidade de cada pedido
        }
    }
])

db.collection.aggregate([
    { estágio1 },
    { estágio2 },
    { estágio3 },
    // ...
])

db.vendas.aggregate([
    { $match: { ano: 2023 } }, //filtra documentos
    { $group: {_id:"mes", total: {$sum: "valor"}} }, //agrupa e soma
    { $sort: { total: -1 } }, // Ordena os resultados
])

db.vendas.aggregate([
    { project: { nome: 1, valor: 1, _id: 0 } }
])

db.vendas.aggregate([
    { $sort: {valor: -1} },
    { $limit: 5 }
])

db.pedidos.aggregate([
    { $unwind: "$itens" }
])

db.vendas.aggregate([
    {
        $facet: {
            total_vendas: [{ $count: count }],
            soma_total: [{ $group: { _id: null, total: { $sum: "$valor" } } }]
        }
    }
])

db.vendas.aggregate([
    {
        $bucket: {
            groupBy: "$valor",
            boundaries: [0, 100, 200, 300],
            default: "Mais de 300",
            output: { total_vendas: { $sum: 1 }, soma_valores: { $sum: "$valor" } }
        }
    }
])

db.vendas.aggregate([
    {
        $addFields: {
            total: { $multiply: ["$quantidade", "preco_unitario"] }
        }
    }
])

db.vendas.aggregate([
    { $count: "total_vendas" }
])

db.vendas.aggregate([
    { $match: { ano:2023 } },
    { $group: { _id: "$mes", total_vendas: {$sum: "valor"} } },
    { $sort: {total_vendas: -1 } }
]).explain("executionStatus")

$sum: Soma os valores
$avg: Calcula a média
$min: Encontra o valor mínimo
$max: Encontra o valor máximo
$first: encontra o primeiro valor
$last: Retorna o último valor

db.vendas.aggregate([
    { $group: { _id: "$mes", media_valor: { $avg: "$valor" } } }
])

$cond: Estrutura condicional
$ifNull: Retorna um valor se o campo for nulo ou indefinido
$switch: Implementa uma série de condições

// Operadores de Array
$push: Adiciona elementos a um array   
$addToSet: Adiciona elementos únicos a um array
$filter: Filtra elementos de um array
$map: Aplica uma expressão a cada elemento do array
$reduce: Reduz um array a um único valor

db.pedidos.aggregate([
    {
        $project: {
            itens_filtrados: {
                $filter: {
                    input: "$itens",
                    as: "item",
                    cond: { $gt: ["$$item.quantidade", 2] }
                }
            }
        }
    }
])

//Exercícios

use mongo-aula6
db.createCollection("cliente")
db.createCollection("venda")
db.createCollection("pedido")

db.cliente.insertMany([
    {
    "_id": 157,
    "nome": "Alice",
    "email": "alice@example.com",
    "cliente": "sudeste"
    },
    {
    "_id": 171,
    "nome": "Vinicius",
    "email": "vinicius@example.com",
    "cliente": "sul"
    },
    {
    "_id": 244,
    "nome": "Veronez",
    "email": "veronez@example.com",
    "cliente": "sul"
    }
])

db.venda.insertMany([
    {
    "_id": 1,
    "cliente_id": 157,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "valor": 2910,
    "mes": 1,
    "ano": 2023
    },
    {
    "_id": 2,
    "cliente_id": 171,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "valor": 400,
    "mes": 1,
    "ano": 2023
    },
    {
    "_id": 3,
    "cliente_id": 171,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "valor": 1200,
    "mes": 2,
    "ano": 2023
    },
    {
    "_id": 4,
    "cliente_id": 244,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "valor": 2560,
    "mes": 2,
    "ano": 2023
    },
    {
    "_id": 5,
    "cliente_id": 157,
    "data_venda": ISODate("2023-01-15T08:00:00Z"),
    "valor": 250,
    "mes": 3,
    "ano": 2023
    }
])

db.pedido.insertMany([
    {
    "_id": 1,
    "venda_id": 1,
    "produto": "laptop",
    "quantidade": 2,
    "preco_unitario": 1200
    },
    {
    "_id": 2,
    "venda_id": 1,
    "produto": "mousepad",
    "quantidade": 2,
    "preco_unitario": 80
    },

    {
    "_id": 3,
    "venda_id": 2,
    "produto": "mouse",
    "quantidade": 1,
    "preco_unitario": 400
    },

    {
    "_id": 4,
    "venda_id": 3,
    "produto": "laptop",
    "quantidade": 1,
    "preco_unitario": 1200
    },

    {
    "_id": 5,
    "venda_id": 4,
    "produto": "laptop",
    "quantidade": 1,
    "preco_unitario": 1200
    },
    {
    "_id": 6,
    "venda_id": 4,
    "produto": "mousepad",
    "quantidade": 1,
    "preco_unitario": 80
    },
    {
    "_id": 7,
    "venda_id": 4,
    "produto": "mouse",
    "quantidade": 1,
    "preco_unitario": 400
    },
    {
    "_id": 8,
    "venda_id": 4,
    "produto": "teclado",
    "quantidade": 3,
    "preco_unitario": 210
    },
    {
    "_id": 9,
    "venda_id": 4,
    "produto": "model",
    "quantidade": 1,
    "preco_unitario": 250
    },
    {
    "_id": 10,
    "venda_id": 4,
    "produto": "mesa",
    "quantidade": 1,
    "preco_unitario": 350
    },

    {
    "_id": 11,
    "venda_id": 5,
    "produto": "model",
    "quantidade": 1,
    "preco_unitario": 250
    }
])
 
// 1-Calcule quantas vendas cada cliente realizou
db.venda.aggregate([
    {
        $group: { 
            _id: "$cliente_id", 
            qnt_vendas: {$sum: 1} 
        }
    }
])

// 3-Listar clientes que compraram mais de 5 produtos
db.pedido.aggregate([
    {
        $lookup: {
            from: "venda",
            localField: "venda_id",
            foreignField: "_id",
            as: "venda_info"
        }
    },
    {
        $lookup: {
            from: "cliente",           
            localField: "venda_info.cliente_id",
            foreignField: "_id",
            as: "cliente_info"
        }
    },
    {
        $project: {
            venda_id: 1,
            quantidade: 1,
            cliente_id: { $first: "$venda_info.cliente_id" },
            cliente_name: { $first: "$cliente_info.nome" }
        }
    },
    {
        $group: {
            _id: "$venda_id",
            itens_venda: { $sum: "$quantidade" },
            cliente_id: { $first: "$cliente_id" },
            cliente_name: { $first: "$cliente_name" }
        }
    },
    {
        $match: { 
            itens_venda: { $gt: 5 }
        }
    }
])

// 4-Top 3 Produtos Mais Vendidos
db.pedido.aggregate([
    {
        $group: {
            _id: "$produto",
            qnt: {$sum: "$quantidade"}
        }
    },
    { $sort: { qnt: -1 } },
    { $limit: 3 }
])

// 5-Total de vendas por região
// Não está performático, chama todos os valores de cliente sem necessidade
db.venda.aggregate([
    {
        $lookup: {
            from: "cliente",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente_info"
        }
    },
    {
        $group: {
            _id: "$cliente_info.cliente",
            venda_por_regiao: {$sum: 1}
        }
    }
])