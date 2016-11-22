//Quand la popup est chargé création des clicks boutons
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('ask-analyse');
    //Au clic de du bouton de demande d'analyse
    btn.addEventListener('click', function() {
      //Recherche de l'id de la page web courant dans la fenêtre courante
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          //Envoi d'un message de demande de tire au content_script et maj de la popup
          chrome.tabs.sendMessage(tabs[0].id, {action: 'getTitle'}, function(response){updateTitle(response.title)});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'findLn'}, function(response){updateLn(response.ln)});
          chrome.tabs.sendMessage(tabs[0].id, {action: 'findToS'}, function(response){updateToS(response.tos)});
        });
    });
});

//Mettre à jour le titre avec la réponse de content_script
function updateTitle(message){
  document.getElementById('owner').textContent = message;
}

//Mettre à jour les Mentions légales (Ln Legale Notice)
function updateLn(message){
  if(message){
    document.getElementById('ln').textContent = "Trouvé mais non analysé";
    //document.getElementById('traffic_ln').src = "traffic_lights_yellow.png"
  }else{
    document.getElementById('ln').textContent = "Non trouvé";
    //document.getElementById('traffic_ln').src = "traffic_lights_red.png"
  }
}

//Mettre à jour les conditions de ventes générales (ToS Termes of Sales)
function updateToS(message){
  if(message){
    document.getElementById('tos').textContent = "Trouvé mais non analysé";
    //document.getElementById('traffic_tos').src = "traffic_lights_yellow.png"
  }else{
    document.getElementById('tos').textContent = "Non trouvé";
    //document.getElementById('traffic_tos').src = "traffic_lights_red.png"
  }
}
