const firebaseConfig = {
    apiKey: "AIzaSyBVoIP81JWXonhwnvVrSdIEkaprBuLxvjQ",
    authDomain: "podsforsquads.firebaseapp.com",
    databaseURL: "https://podsforsquads-default-rtdb.firebaseio.com",
    projectId: "podsforsquads",
    storageBucket: "podsforsquads.appspot.com",
    messagingSenderId: "369944495856",
    appId: "1:369944495856:web:d2027932e60be6f17da435"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("podsforsquads");

document.getElementById("podsforsquads").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  saveMessages(name, emailid, msgContent);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("podsforsquads").reset();
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};