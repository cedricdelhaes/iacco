//Ecoute les messages (envoyé par le script du plugin)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
    if(request.action == "getTitle") sendTitle(sendResponse);
    else if(request.action == "findLn") searchLink("ln", sendResponse);
    else if(request.action == "findToS") searchLink("tos", sendResponse);
    else sendResponse({find : undefined});
  }
);

//Renvoi le titre de la page
function sendTitle(sendResponse){
  sendResponse({title : document.getElementsByTagName("title")[0].innerText});
};

function searchLink(search ,sendResponse){
  var link = document.getElementsByTagName("a");

  //Change l'expression régulière de recherche selon la demande
  switch (search) {
    case "ln":
      var reg = /Mentions? légales?/i;
      break;
    case "tos" :
      var reg = /(?:Conditions? Générales? d?e?s? Ventes?)|CGV/i;
      break;
    default:
      sendResponse({find : "No regexp"})
  }

  //Analyse chaque noeud <a>
  for(let i of link){
    //console.log('IACCO : ' + i.innerText );
    if(reg.test(i.innerText)){
      sendResponse({find : true});
    }
  }
  sendResponse({find : false})
}
