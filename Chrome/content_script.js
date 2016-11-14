//Ecoute les messages (envoyé par le script du plugin)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
    if(request.action == "getTitle") sendTitle(sendResponse);
    else if(request.action == "findLn") sendLn(sendResponse);
    else if(request.action == "findToS") sendTos(sendResponse);
  }
);

//Renvoi le titre de la page
function sendTitle(sendResponse){
  sendResponse({title : document.getElementsByTagName("title")[0].innerText});
};

//Renvoi vrai si les mentions légales sont trouvées
function sendLn(sendResponse){
  var link = document.getElementsByTagName("a");
  var lnFind = false;
  for(let i of link){
    console.log('IACCO : ' + i.innerText );
    if(i.innerText == "Mentions légales"){
      lnFind = true;
    }
  }
  sendResponse({ln : lnFind});
};

//Renvoi vrai si les CVG sont trouvées
function sendTos(sendResponse){
  var link = document.getElementsByTagName("a");
  var toSFind = false;
  for(let i of link){
    console.log('IACCO : ' + i.innerText );
    if(i.innerText == "Conditions générales de ventes" || i.innerText == "Conditions Générales de Vente"){
      toSFind = true;
    }
  }
  sendResponse({tos : toSFind});
};