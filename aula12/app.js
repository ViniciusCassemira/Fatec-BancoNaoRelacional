// backup e restore

// Comando básico
mongodump --out /caminho/do/backup
//dessa forma, eu quero o backup de todos os bancos, pois eu não passei a flag --db

// Com parâmetros:
mongodump --db nomeDoBanco --collection nomeDaColecao --out /caminho/do/backup

// Com autenticação
mongodump --uri="mongodb://usuario:senha@host:porta/nomeDoBanco" --out /caminho/do/backup

// Parâmetros para o mongoDump

// Parâmetro                   Descrição                    Exemplo
//  --db                
//  --collection      
//  --
//  --
//  --
//  --uri
//  --host
//  --username, --password --authenticationDatabase
//  --ssl                     
//  --out
//  --archive
//  --gzip
//  --oplog
//  --numParallelCollections
//  --readPreference
//  --quiet
//  --verbose
//  --help

mongodump
  --uri="mongodb://usuario:senha@localhost:27017/loja"
  --collection vendas
  --query '{"ano": 2025}'
  --out ./backup/loja
  --gzip
  --archive=vendas2024.archive


//Restore

// Restaurar um banco inteiro:
mongorestore /caminho/do/backup

// Restaurar coleçao específica
mongorestore --db nomeBanco --collection nomeColecao /caminho/do/backup/nomeDoBanco/nomeDaColecao.bson

// Apagar dados antes de fazer o restore
mongorestore --drop /caminho/do/backup

//  --dir ou --nsInclude
//  --archive
//  --gzip
//  --drop
//  --maitainInsertinOrder
//  --preserveUUID
//  --stopOnError

//  --numInsertionWorkersPerCollection
//  --writeConcern
//  --batchSize
//  --dryRun
//  --verbose
//  --quiet
//  --help
//  --



// Exercícios

// 1)Faça um backup completo do banco de dados do Detran, salvando os dados no diretório ./backup_detran
mongodump --db detran --gzip --archive=C:\Users\vinic\Desktop\aula12\backup_detran\exercicio01.archive

// 2)Faça o backup da coleção proprietarios do banco Detran, salvando em ./backup_proprietarios
mongodump --db detran --collection proprietario --gzip --archive=C:\Users\vinic\Desktop\aula12\backup_proprietarios\exercicio2.archive

// 3)Restaure um backup completo do banco Detran a partir da pasta ./backup_detran
mongorestore --gzip --archive=C:\Users\vinic\Desktop\aula12\backup_detran\exercicio01.archive --nsFrom="detran.*" --nsTo="detran_restore.*"

// 4)Exporte somente os documentos da coleção multas do banco Detran onde o campo ano seja 2025, salvando em ./backup_multas2025
mongodump --db=detran --collection=multa --query="{\"ano\": 2025}" --gzip --archive="C:\Users\vinic\Desktop\aula12\backup_multas2025\exercicio04.archive"

// 5)Restaure a coleção multas no banco detran, removendo os dados atuais antes de restaurar os novos, usando um diretório de backup chamado ./backup_multas2025.
mongorestore --gzip --archive="C:\Users\vinic\Desktop\aula12\backup_multas2025\exercicio04.archive" --nsInclude=detran_restore.multa --drop

// 6)Faça o backup do banco Hospital e salve como um arquivo .archive chamado hospital.archive
mondodump --db hospital --gzip --archive C:\Users\vinic\Desktop\aula12\exercicio6.archive

// 7)Restaure o banco Hospital usando o arquivo hospital.archive
mongorestore --gzip --archive=C:\Users\vinic\Desktop\aula12\exercicio06.archive --nsFrom="hospital.*" --nsTo="hospital_restore.*"

// 8)Faça o backup completo do banco Petshop usando os parâmetros archive e -gzip, salvando como petshop.gz
mongodump --db petshop --gzip --archive=C:\Users\vinic\Desktop\aula12\exercicio08.gz

// 9)Suponha que o diretório ./backup_petshop contenha um backup completo do banco Petshop. Restaure apenas a coleção animal.
mongorestore --gzip --archive=C:\Users\vinic\Desktop\aula12\exercicio08.gz --nsInclude="petshop.animal" --nsFrom="petshop.animal" --nsTo="petshop_restore.animal"

// 10)Escreva um comando mongodump que crie backups diários do banco Detran usando a data atual no nome da pasta de saída, no formato YYYY-MM-DD.
// Feito em .bat