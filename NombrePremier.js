exports.action = function(data, callback){

	let client = setClient(data);
	info("NombrePremier from:", data.client, "To:", client);
	isPremier (data, client);
	callback();
 
}

function isPremier (data, client) {

Avatar.askme("Tu veux quel nombre ?", data.client, {
"*": "generic",
"terminer": "done"
}, 0, function (answer, end) {

if (!answer) {
end(client);
return Avatar.speak("Recommence je n'ai rien entendu", data.client, function(){
isPremier (data, client);
});
}

if (answer.indexOf('generic') != -1) {
end(client);
answer = answer.split(':')[1];
answer = answer.replace("le", "");
answer = answer.replace("nombre", "");
answer = answer.replace("premier", "");
answer = answer.replace("de", "");
answer = answer.replace("du", "de", "");

function nbrPremier (nbr) {
for(var i = 2; i < nbr; i++)
if(nbr%i === 0)
return false;
return nbr > 1;
}
console.log(nbrPremier(answer));
if(nbrPremier(answer) == false) {
Avatar.speak("le nombre." + answer + ".n'est pas un nombre premier", data.client, function(){
end(data.client, true);
});
}
else {
Avatar.speak("le nombre." + answer + ".est un nombre premier", data.client, function(){
end(data.client, true);
});
}
return;
}

// Grammaire fixe
switch(answer) {
case "done":
default:
Avatar.speak("Terminé", data.client, function(){
end(data.client, true);
});
}
})
}


function setClient (data) {
	var client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
}