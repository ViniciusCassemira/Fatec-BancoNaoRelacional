// 1- Liste todos os filmes
 
//a) com avaliação entre 8.5 e 9.0 (inclusive)
db.filmes.find({ avaliacao: { $gte: 8.5, $lte: 9.0 } }) 
// $gte é um operador de maior ou igual, e o $lte é o de menor ou igual
 
// b) lançados após 2000 
db.filmes.find({ ano: { $gt: 2000 } })
// $gt é um operador de maior que
 
// c) cujo gênero seja “Ficção” e “Ação” 
db.filmes.find({ genero: { $all: ["Ficção", "Ação"] } })
// $all é um operador que verifica se todos os elementos estão presentes no array
 
// d) e que não tenham sido premiados 
db.filmes.find({ premiado: false })
 
//2- Liste os usuários: 
// a) com idade entre 25 e 40 
db.usuarios.find({ idade: { $gte: 25, $lte: 40 } })
// $gte é um operador de maior ou igual, e o $lte é o de menor ou igual
 
// b) que não são VIPs 
db.usuarios.find({ vip: false })
 
// c) que possuem pelo menos uma compra registrada 
db.usuarios.find({ compras: { $ne: [] } })
// $ne (not equal) é um operador que verifica se o valor não é igual ao especificado. 
// então, para saber se eles possuem ao menos uma compra, 
// verificamos se o campo compras não é igual à um array vazio
 
// d) Liste os usuários que possuem pelo menos uma compra maior que 100 e 
// menor que 200. 
db.usuarios.find({ compras: { $elemMatch: { $gt: 100, $lt: 200 } } }) 
// // $elemMatch é um operador que verifica se o elemento do array possui as condições especificadas,
// //  no caso, compra maior que 100 e menor que 200.
 
// 3- Atualize todos os filmes dirigidos por “Christopher Nolan” para: 
// a) Acrescentar o campo classico: true se o filme for anterior a 2015 
db.filmes.updateMany(
  { diretor: "Christopher Nolan", ano: { $lt: 2015 } },
  { $set: { classico: true } }
)
// o operador $set é usado para adicionar ou atualizar um campo em um documento.
 
// b) Adicionar 0.2 à avaliação 
db.filmes.updateMany(
  { diretor: "Christopher Nolan" },
  { $inc: { avaliacao: 0.2 } }
)
// o operador $inc é usado para incrementar o valor de um campo numérico em um documento.

//4 - Para os usuários com o campo vip: false: adicione uma compra fictícia de valor 50 
//    somente se o array de compras estiver vazio
db.usuarios.updateMany(
    {
      $and: [ //Os dois campos precisam ser válidos para que a gente atualize o campo de comprar, por isso o uso do $_and
        { vip: false },
        { compras: { $size: 0 } } //verificamos se o campo compras está vazio com $_size, ou seja, sem itens
      ]
    },
    { 
      $set: { compras: [50] } // Adicionamos ao campo compras o valor 50 com $_set
    }
)

//5 - Crie uma agregação que retorne, para cada diretor: 
//    a) Quantidade de filmes 
//    b) Média de avaliação 
//    c) Duração total de todos os filmes 
//    d) Ordene do diretor com mais filmes para o com menos.
db.filmes.aggregate([
    {
        $group:{
            _id: "$diretor", //Agrupamos com o nome de cada diretor que fez o filme
            quantidade_filme: { $sum: 1 }, //somamos a quantidade de filmes com $_sum
            media_avaliacao: { $avg: "$avaliacao" }, //Calculamos a média com $_avg
            duracao_filmes: { $sum: "$duracao" } //Somamos a duração do filme com $_sum
        },
    },
    {
        $sort: {"quantidade_filme": -1} //Ordenando em ordem descrecente pela quantidade de filmes
    }
])

//6 - Com a coleção usuários, faça:
//    a) Calcule para cada usuário o total gasto e a média de compra
//    b) Classifique os usuários como "Alto", "Médio" ou "Baixo" gasto, baseado no
//    total:
//      • Alto: ≥ 200
//      • Médio: 100 a 199
//      • Baixo: < 100
db.usuarios.aggregate([
    {
        $project:{
            _id: 0,
            nome: 1,
            total_gasto: { $sum: "$compras" }, //Somamos o total gasto com $_sum
            media: { $avg: "$compras" }, //Calculando a média com $_avg
            classificacao: {
                $switch: { //A partir do switch, conseguimos distinguir o que é false ou true, assim determinando o valor do campo 'classificacao'.
                    branches: [
                        {case: { $gte: [{ $sum: "$compras" }, 200] } , then: "Alto"}, //$_gte -> maior ou igual 
                        {case: { $and: [ //$_and vai conferir se atende os dois requisitos, ser maior ou igual e menos que x valor
                            { $gte: [{ $sum: "$compras" }, 100] },
                            { $lt: [{ $sum: "$compras" },200] } //$_lt -> menor
                          ]}, then: "Médio"},
                        {case: { $lt: [{ $sum: "$compras" },100] } , then: "Baixo"}, //$_lt -> menor
                    ]
                }
            }
        }
    },
])

//7 - Agrupe os filmes por década e mostre:
//    a) Quantidade de filmes por década
//    b) Média de avaliação
//    c) Gêneros distintos combinados (sem repetição)
db.filmes.aggregate([
    {
      $addFields: { //Adicionando mais campos
        decada: { 
          $concat: [
            { $substr: ["$ano", 0, 3] }, //Concatenando 0 ao final dos valores para capturarmos a década inteira: 210 -> 2010
            "0"
          ]
        }}
    },
    {
      $group: {
        _id: "$decada",
        qnt_filme: { $sum: 1 }, //Concatendo(somando) a quantidade de filmes com $_sum
        media_avaliacao: { $avg: "$avaliacao" }, //Média das avaliações por década com $_avg
        todos_generos: { $push: "$genero" } //Adiciona os gêneros dentro do array gênero com $_push
      }
    },
    {
      $project: { //Projetando o que será exibido como resultado da consulta
        decada: "$_id",
        qnt_filme: 1,
        media_avaliacao: 1,
        generos_distintos: {
          $setUnion: "$todos_generos" //Recebe todos a junção dos arrays e armazena-os, ignorando os que se repetem
        }
      }
    },
    {
      $project: { //Esconde o _id na hora de exibir, porém mostra os outros campos com 1
        _id: 0,
        decada: 1,
        qnt_filme: 1,
        media_avaliacao: 1,
        generos_distintos: 1 //Exibimos o array dos generos distintos, criado no passo anterior
      }
    },
    {
      $sort: { decada: 1 } //Ordena com $_sort de forma crescente
    }
  ])  