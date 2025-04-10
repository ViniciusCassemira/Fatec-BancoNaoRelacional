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

db.proprietario.insertMany([
  {
    cidade_id: ObjectId("67f68a1455e9a6bf360d2aec"),
    sexo: { id: 1, descricao: "Masculino" },
    nome: "Joazim",
    cpf: "12345678910",
    logradouro: "Rua dos Multados",
    numero: "2",
    complemento: "Casa",
    bairro: "Centro",
    cep: "14240000"
  },
  {
    cidade_id: ObjectId("67f68a1455e9a6bf360d2aed"),
    sexo: { id: 1, descricao: "Masculino" },
    nome: "Juquinha",
    cpf: "12354896214",
    logradouro: "Rua José Bonifácio",
    numero: "89",
    complemento: "Comercio",
    bairro: "Jd. das Trevas",
    cep: "13240000"
  },
  {
    cidade_id: ObjectId("67f68a1455e9a6bf360d2aee"),
    sexo: { id: 2, descricao: "Feminino" },
    nome: "Mariazinha",
    cpf: "78923578214",
    logradouro: "Av José Santos",
    numero: "66",
    complemento: "Casa",
    bairro: "Centro",
    cep: "14240000"
  },
  {
    cidade_id: ObjectId("67f68a1455e9a6bf360d2aef"),
    sexo: { id: 1, descricao: "Masculino" },
    nome: "Zezinho",
    cpf: "96532578921",
    logradouro: "Rua Antonio dos Santos",
    numero: "100",
    complemento: "Casa",
    bairro: "Quebrada",
    cep: "12240000"
  }
]);

db.veiculo.insertMany([
  {
    modelo_id: ObjectId("67f688f955e9a6bf360d2ae6"),
    proprietario_id: ObjectId("67f7c64f0b4a3a69e96bc8ca"),
    cor_id: ObjectId("67f69094444e003a6c71b7cc"),
    placa: "YDX5892",
    cadastro: "Licenciado"
  },
  {
    modelo_id: ObjectId("67f688f955e9a6bf360d2ae7"),
    proprietario_id: ObjectId("67f7c64f0b4a3a69e96bc8cb"),
    cor_id: ObjectId("67f69094444e003a6c71b7cd"),
    placa: "KYN0169",
    cadastro: "Licenciado"
  },
  {
    modelo_id: ObjectId("67f688f955e9a6bf360d2aea"),
    proprietario_id: ObjectId("67f7c64f0b4a3a69e96bc8cc"),
    cor_id: ObjectId("67f69094444e003a6c71b7cf"),
    placa: "OKY0101",
    cadastro: "Licenciado"
  },
  {
    modelo_id: ObjectId("67f688f955e9a6bf360d2ae5"),
    proprietario_id: ObjectId("67f7c64f0b4a3a69e96bc8cd"),
    cor_id: ObjectId("67f69094444e003a6c71b7ce"),
    placa: "YAG0101",
    cadastro: "Licenciado"
  }
]);

db.multa.insertMany([
    {
      id_agente: ObjectId("67f68c1455e9a6bf360d2af0"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9b"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aed"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba1"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2019-02-28T00:22:00"),
      hora: "00:22",
      local_multa: "Rua"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8ca"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9b"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aec"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba1"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2018-05-30T13:25:00"),
      hora: "13:25",
      local_multa: "Avenida"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8ca"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9c"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aed"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba2"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2019-05-30T14:33:00"),
      hora: "14:33",
      local_multa: "Praça do Centro"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8cb"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9d"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aec"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba3"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2017-03-14T15:30:00"),
      hora: "15:30",
      local_multa: "Praça José Gomes"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8cd"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9e"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aee"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba3"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2017-12-23T17:18:00"),
      hora: "17:18",
      local_multa: "Rua"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8ca"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9d"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aef"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba3"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2016-08-19T09:26:00"),
      hora: "09:26",
      local_multa: "Estacionamento"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8cb"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9b"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aed"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba2"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2018-11-15T10:34:00"),
      hora: "10:34",
      local_multa: "Praça da Matriz"
    },
    {
      id_agente: ObjectId("67f7c64f0b4a3a69e96bc8cd"), 
      id_veiculo: ObjectId("60d5f48e4b9a9a3f94536b9b"), 
      id_cidade: ObjectId("67f68a1455e9a6bf360d2aec"),  
      id_infracao: ObjectId("60d5f48e4b9a9a3f94536ba3"),
      lancamento: "Agente Rodoviário",
      data_multa: ISODate("2019-01-28T15:23:00"),
      hora: "15:23",
      local_multa: "Praça de pedágio"
    }
  ]);
  