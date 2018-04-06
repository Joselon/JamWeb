var users= {admin: {id:1, username:"Joselon79", password:"Patata1"},
	    pepe: {id:2, username:"Yao", password:"5678"},
kogoyo: {id:3, username:"Kogoyo", password:"1234"},
Moderdonia: {id:4, username:"Moderdonia", password:"LVMx2017"}
	   };

// Comprueba si el usuario esta registrado en users
// Si autentificación falla o hay errores se ejecuta callback(error)
exports.autenticar=function(login,password,callback){
	if(users[login]){
	   if(password===users[login].password){
		callback(null,users[login]);
	   }
	   else {callback(new Error('Password erróneo.'));}
	} else {callback(new Error('No existe el usuario.'));}
};


