var users= {admin: {id:1, username:"Joselon79", password:"Patata1"},
	    pepe: {id:2, username:"Yao", password:"5678"},
	    Ambrus: {id:3, username:"El Chúngaro",password:"Horváth"},
	Dunch:{id:4,username:"Kurare",password:"contrasenya"},
	juarmix: {id:5, username:"JuarMix", password:"123abc.17._@"},
	depositos: {id:6, username:"Depósito", password:"online17"},
	sanidad: {id:7, username:"Usuario Sanidad Oesía", password:"sanidad17"},
 orangepruebas: {id:8, username:"Usuario Orange Pruebas", password:"orange123"}
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


