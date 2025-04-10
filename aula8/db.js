use mongo-aula08;

db.createCollection("infracao");
db.infracao.insertMany([
    {
        descricao: "Transitar em velocidade superior à máxima permitida em até 20%",
        valor: 85.15,
        pontos: 5
    },
    {
        descricao: "Avançar o sinal vermelho do semáforo ou a parada obrigatória",
        valor: 293.47,
        pontos: 7
    },
    {
        descricao: "Falta do cinto de segurança",
        valor: 195.32,
        pontos: 5
    }
]);

db.createCollection("estado");
db.estado.insertMany([
    {
        sigla: "SP",
        nome: "São Paulo"
    },
    {
        sigla: "MG",
        nome: "Minas Gerais"
    },
    {
        sigla: "PR",
        nome: "Paraná"
    }
]);

db.createCollection("agente");
db.agente.insertMany([
    {
        matricula: "123",
        nome: "Jão",
        contratacao: "CLT"
    },
    {
        matricula: "456",
        nome: "Zé",
        contratacao: "CLT"
    },
    {
        matricula: "789",
        nome: "Toin",
        contratacao: "CLT"
    }
]);

db.createCollection("modelo");
db.modelo.insertMany([
    {
        nome: "Polo",
        marca: {
            nome: "Volkswagen"
        }
    },
    {
        nome: "Fusca",
        marca: {
            nome: "Volkswagen"
        }
    },
    {
        nome: "Chevette",
        marca: {
            nome: "Chevrolet"
        }
    },
    {
        nome: "Palio",
        marca: {
            nome: "Fiat"
        }
    },
    {
        nome: "Ká",
        marca: {
            nome: "Ford"
        }
    },
    {
        nome: "Gol",
        marca: {
            nome: "Volkswagen"
        }
    },
    {
        nome: "Opala",
        marca: {
            nome: "Chevrolet"
        }
    }
]);

db.createCollection("cidade");
db.cidade.insertMany([
    {
        nome: "Mococa",
        id_estado: ObjectId("67f67b8f55e9a6bf360d2adf")
    },
    {
        nome: "Cajuru",
        id_estado: ObjectId("67f67b8f55e9a6bf360d2adf")
    },
    {
        nome: "Guaxupé",
        id_estado: ObjectId("67f67b8f55e9a6bf360d2ae0")
    },
    {
        nome: "Curitiba",
        id_estado: ObjectId("67f67b8f55e9a6bf360d2ae1")
    }
]);

db.createCollection("proprietario");
db.proprietario.insertOne({
    id_cidade: ObjectId("67f68a1455e9a6bf360d2aed"),
    sexo: {
        id: 1,
        descricao: "Masculino"
    },
    nome: "Prof. Tiago",
    cpf: "12345678910",
    endereco: {
        logradouro: "Rua dos Professores",
        numero: "666",
        complemento: "Casa",
        bairro: "Centro",
        cep: "14240000"
    }
});

db.createCollection("cor");
db.cor.insertMany([
    {
        id: 1,
        nome: "Vermelho"
    },
    {
        id: 2,
        nome: "Branco"
    },
    {
        id: 3,
        nome: "Azul"
    },
    {
        id: 4,
        nome: "Verde"
    },
    {
        id: 5,
        nome: "Preto"
    }
]);


db.createCollection("veiculo");
db.veiculo.insertMany([
    {
        modelo_id: ObjectId("67f688f955e9a6bf360d2ae5"),
        proprietario_id: ObjectId("67f68c1455e9a6bf360d2af0"),
        cor_id: ObjectId("67f69094444e003a6c71b7cc"),
        placa: "EVA4960",
        cadastro: "do Prof"
    },
    {
        modelo_id: ObjectId("67f688f955e9a6bf360d2ae6"),
        proprietario_id: ObjectId("67f68c1455e9a6bf360d2af0"),
        cor_id: ObjectId("67f69094444e003a6c71b7cc"),
        placa: "BLD7764",
        cadastro: "do Prof"
    },
    {
        modelo_id: ObjectId("67f688f955e9a6bf360d2aea"),
        proprietario_id: ObjectId("67f68c1455e9a6bf360d2af0"),
        cor_id: ObjectId("67f69094444e003a6c71b7cd"),
        placa: "CFU0412",
        cadastro: "do Prof"
    },
    {
        modelo_id: ObjectId("67f688f955e9a6bf360d2aeb"),
        proprietario_id: ObjectId("67f68c1455e9a6bf360d2af0"),
        cor_id: ObjectId("67f69094444e003a6c71b7cf"),
        placa: "ZZZ0666",
        cadastro: "Troco pelo Gol"
    }
]);

db.createCollection("multa");
db.multa.insertMany([
    {
      agente_id: ObjectId("67f67d4755e9a6bf360d2ae4"),
      veiculo_id: ObjectId("67f6919f444e003a6c71b7d0"),
      cidade_id: ObjectId("67f68a1455e9a6bf360d2aee"),
      infracao_id: ObjectId("67f67b2455e9a6bf360d2add"),
      lancamento: "Condutor sem vergonha",
      data_multa: ISODate("2018-12-30T00:00:00Z"),
      hora: "00:22",
      local_multa: "Praça do Centro"
    },
    {
      agente_id: ObjectId("67f67d4755e9a6bf360d2ae2"),
      veiculo_id: ObjectId("67f6919f444e003a6c71b7d0"),
      cidade_id: ObjectId("67f68a1455e9a6bf360d2aed"),
      infracao_id: ObjectId("67f67b2455e9a6bf360d2ade"),
      lancamento: "Com camisa do vasco",
      data_multa: ISODate("2018-12-31T00:00:00Z"),
      hora: "08:15",
      local_multa: "Avenida do rio"
    },
    {
      agente_id: ObjectId("67f67d4755e9a6bf360d2ae3"),
      veiculo_id: ObjectId("67f6919f444e003a6c71b7d0"),
      cidade_id: ObjectId("67f68a1455e9a6bf360d2aec"),
      infracao_id: ObjectId("67f67b2455e9a6bf360d2ade"),
      lancamento: "Tocando música que machuca o coração",
      data_multa: ISODate("2018-12-31T00:00:00Z"),
      hora: "11:30",
      local_multa: "Vale da Sofrência"
    }
  ])
  
