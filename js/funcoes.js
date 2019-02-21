
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


  var config = {
    apiKey: "AIzaSyCHYcb95pkiVQw5hi0XPIYwMtBu40F9R2Y",
    authDomain: "gerirpessoas-xp17.firebaseapp.com",
    databaseURL: "https://gerirpessoas-xp17.firebaseio.com",
    projectId: "gerirpessoas-xp17",
    storageBucket: "gerirpessoas-xp17.appspot.com",
    messagingSenderId: "390208837263"
  };
firebase.initializeApp(config); 
function writeNewLead(vNome, vEmail, vTipo, vData, vIp) {
  // A post entry.
  var postData = {
    nome: vNome,
    email: vEmail,
    tipo: vTipo,
    data: vData,
    ip: vIp
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('leads').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/leads/' + newPostKey] = postData;
  
  return firebase.database().ref().update(updates);
}
