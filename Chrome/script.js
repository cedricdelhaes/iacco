//Quand la popup est chargé création des clicks boutons
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('ask-analyse');
    //Au clic de du bouton de demande d'analyse
    btn.addEventListener('click', function() {
      //Recherche de l'id de la page web courant dans la fenêtre courante
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          //Envoi d'un message de demande de tire au content_script et maj de la popup
          chrome.tabs.sendMessage(tabs[0].id, {action: 'getTitle'}, function(response){updateTitle(response.title)});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'findLn'}, function(response){update('ln', response)});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'findToS'}, function(response){update('tos', response)});
        });
    });
});

//Mettre à jour le titre avec la réponse de content_script
function updateTitle(message){
  document.getElementById('owner').textContent = message;
}

//Mettre à jour l'ihm selon la reponse
function update(id,message){
  if(message.find == undefined){
    document.getElementById(id).textContent = 'Pas de fonction de recherche associé à la demande';
  }else if(message.find == 'No regexp'){
    document.getElementById(id).textContent = "Pas d'expression régulière associé à la demande";
  }else if (message.find){
    document.getElementById(id).innerHTML = 'Trouvé mais non analysé : <a href='+message.value+' target="_blank">lien</a>';
  }else{
    document.getElementById(id).textContent = 'Non trouvé';
  }
}
