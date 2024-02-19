exports.action = function(data, callback){

	let client = setClient(data);
	info("NombrePremier from:", data.client, "To:", client);
	isPremier (data, client);
	callback();
 
}

function isPremier (data, client) {

const numberIsPremier = data.action.rawSentence.replace(/le |chiffre |nombe |est |un |nombre |premier /ig, "").replace("premier", "").trim();
//const numberIsPremier = data.action.rawSentence.replace(/est(-ce )?(que )?(le )?(chiffre|nombre) (premier|nombre premier)/ig, "").trim();

if(!numberIsPremier) {
	Avatar.speak(`Je ne comprend pas ce que tu veux`, data.client, function(){
		Avatar.Speech.end(data.client);
	});
return;
}

function nbrPremier(nbr) {
	for (var i = 2; i < nbr; i++) {
	  if (nbr % i === 0) {
		return false;
	  }
	}
	return nbr > 1;
  }
  
if(nbrPremier(numberIsPremier) == false) {
    Avatar.speak(`le nombre ${numberIsPremier} n'est pas un nombre premier`, data.client, function(){
	    Avatar.Speech.end(data.client);
});
}
else {
    Avatar.speak(`le nombre ${numberIsPremier} est un nombre premier`, data.client, function(){
	    Avatar.Speech.end(data.client);
});
}
return;

}


function setClient (data) {
	let client = data.client;
	if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}