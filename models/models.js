var path = require('path');


// SQLite DATABASE_URL = sqlite://:@:/


// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
/*var url = process.env.CLEARDB_DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);*/

//CLEARDB_DATABASE_URL = mysql://user:pass@host/database?reconnect=true
var url = process.env.CLEARDB_DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\/(.*)\?(.*)/);
var DB_name = (url[5] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);

var storage = process.env.CLEARDB_DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres

var sequelize = new Sequelize(DB_name, user, pwd,
	{
		dialect: protocol,
		protocol: protocol,
		port: port,
		host: host,
		storage: storage, // solo SQLite (.env)
		omitNull: true    // solo Postgres
	}
);

// Importar la definicion de la tabla Quiz en quiz.js
//var quiz_path = path.join(__dirname, 'quiz');
//var Quiz = sequelize.import(quiz_path);
var Quiz = require(path.join(__dirname, 'quiz'))(sequelize, Sequelize.DataTypes)

//Imiportar definicion de la tabla Commnet
//var comment_path = path.join(__dirname, 'comment');
//var Comment = sequelize.import(comment_path);
var Comment = require(path.join(__dirname, 'comment'))(sequelize, Sequelize.DataTypes)

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // exportar definicion de tabla Quiz
exports.Comment = Comment; //exportamos definicion de tabla Comment

// sequelize.sync() crea e inicializa tabla de preguntas de DB
sequelize.sync().then(function () {
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function (count) {
		if (count == 0) { // la tabla se inicia solo si esta vacia
			Quiz.create({
				pregunta: 'Sala 1',
				respuesta: 'Descripción 1',
				tema: 'Chartreuse'
			});
			Quiz.create({
				pregunta: 'Sala 2',
				respuesta: 'Descripción 2',
				tema: 'DarkViolet'
			})
				.then(function () { console.log('Base de flatos inicial izada') });
		};
	});
});
