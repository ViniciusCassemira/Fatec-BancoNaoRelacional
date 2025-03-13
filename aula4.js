use mongo-aula-4

db.createCollection("users")

db.users.insertMany([
    {
        _id: 1,
        username: "joao",
        age: 24,
        active: true,
        premium: false,
        hobbies: ["reading","soccer"],
        hobbies: [{
            title: "Study MongoDB", 
            status: "peding"
        }]
    },
    {
        _id: 2,
        username: "maria",
        age: 30,
        active: false,
        premium: true,
        hobbies: ["cooking","yoga"],
        tasks: [{title: "Complete project", status: "done"}]
    },
    {
        _id: 3,
        username: "carlos",
        age: 35,
        active: true,
        premium: false,
        hobbies: ["gaming","music"],
        tasks: [{title: "Write report", status: "peding"}]
    },
])

//Atualização de documentos

//$set -> Define ou altera um campo
//$unset ->  remove um campo
//$rename -> Renomeia um campo
//$inc -> Incrementa um valor de um campo numérico
//$mul -> Multiplica o valor de um campo
//$min -> Atualiza o campo apenas se o novo valor for menor que o atual
//$max -> Atualiza o campo apenas se o novo valor for maior que o atual

//Operadores de array
//$push -> Adiciona um elemento ao array
//$pop -> Remove o primeiro (-1) ou o último (1) elemento de um array
//$pull -> Remove elementos específicos de um array
//$addToSet -> Adiciona um elemento ao array apenas se ele não existir
//$pullAll -> Remove múltiplos valores específicos de um array
//$each -> Usado com $push para adicionar múltiplicos elementos ao array

//Exemplos

//Atualiza apenas um documento que corresponde ao filtro
db.users.updateOne(
    {username: "joao"},
    {$set: {age: 25}}
);
//O usuário agora possui age: 25

//Atualiza todos os documento que correspondem ao filtro
db.users.updateMany(
    {active: true},
    {$set: {premium: true}}
);
//Todos os usuários ativos agora são premium

//Substitui um documento inteiro por um novo
db.users.replaceOne(
    { username: "maria" },
    { _id:2, username: "maria", age:31, active: true, premium: false, hobbies: [] }
);
//Maria foi completamente substituída e perdeu suas tasks

//Modificação de campos

//$set
db.users.updateOne(
    {username: "joao"},
    {$set: {premium: true}}
);
//João agora é premium

//unset
db.users.updateOne(
    {username: "carlos"},
    {$unset: {premium: ""}}
);
//Remove o campo premium do usuário "carlos"

//rename
db.users.updateOne(
    {username: "maria"},
    {$rename: {"age": "yearsold"}}
);
//O campo age foi renomeado para yearsOld para "maria"

//Operadores matemáticos

// $inc
db.users.updateOne(
    { username: "joao" },
    { $inc: { age: 1 } }
);
//A idade de 'João' aumenta em 1

// $mul
db.users.updateOne(
    { username: "carlos" },
    { $mul: { age: 2 } }
);
//A idade de 'Carlos' dobra

// $min
db.users.updateOne(
    { username: "joao" },
    { $min: { age: 23 } }
);
//Se a idade do "João" for maior que 23, ela é reduzida para 23

// $max
db.users.updateOne(
    { username: "maria" },
    { $max: { age: 35 } }
);
//Se a idade de "Maria" for menor que 35, ela aumenta para 35

//Operadores em array

// $push
db.users.updateOne(
    { username: "joao" },
    { $push: { hobbies: "guitar" } }
);
//"guitar" é adicionado ao array hobbies de "joao"

// $pop
db.users.updateOne(
    { username: "maria" },
    { $pop: { hobbies: -1 } }
);
// Remove o primeiro item do array hobbies de "maria"

// $pull
db.users.updateOne(
    { username: "carlos" },
    { $pull: { hobbies: "gaming" } }
);
// Remove gaming do array hobbies do carlos

// $addToSet
db.users.updateOne(
    { username: "joao" },
    { $addToSet: { hobbies: "chess" } }
);
// Só será adicionado ao array hobbies se ainda não existir

//$each
db.users.updateOne(
    { username: "joao" },
    { $push: { hobbies:{ $each: ["coding","music"] } } }
);
//"coding" e "music" são adicionados a hobbies;

//Exercícios

//1
db.createCollection("heroes")

db.heroes.insertMany([
    {_id: 1, name: "Spider-Man", city: "New York", power: ["Agility", "Web-shooting"], defeatedVillains: 50},
    {_id: 2, name: "Batman", city: "Gothan", power: ["Martinal Arts", "Detective Skills"], defeatedVillains: 200},
    {_id: 3, name: "Wonder Woman", city: "Themyscira", power: ["Super Strength", "Lasso"], defeatedVillains: 120}
]);

db.heroes.updateOne(
    {name: "Spider-Man"},
    {$addToSet: {power: "Sentido Aranha Aprimorado"}}
)

db.heroes.updateOne(
    { name: "Spider-Man" },
    { $inc: { defeatedVillains: 10} }
)

db.heroes.updateOne(
    { name: "Wonder Woman" },
    {$set: {city: "Amazonia"}}
)

db.heroes.updateOne(
    { name: "Batman" },
    { $pull: { power: "Detective Skills" } }
)

//2
db.createCollection("menu")

db.menu.insertMany([
    { _id: 1, dish: "Pizza", ingredients: ["Dough", "Tomato Sauce", "Cheese"], price: 30},
    { _id: 2, dish: "Sushi", ingredients: ["Rice", "Fish", "Seaweed"], price: 40},
    { _id: 3, dish: "Taco", ingredients: ["Tortilla", "Beef", "Cheese"], price: 15}
]);

db.menu.updateMany(
    { $mul: { price: 1.1 } }
);

db.menu.updateOne(
    { dish: "Taco" },
    { $addToSet: { ingredientes: "Guacamole" } }
);

db.menu.updateOne(
    { dish: "Sushi" },
    { $set: { price: 35 } }
);

db.menu.replaceOne(
    { dish: "Taco" },
    { _id: 3, dish: "Taco", ingredients: ["Tortilla", "Chicken", "Cheese"], price: 15}
);