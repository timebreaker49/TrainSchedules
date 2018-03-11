window.firebase = function () {

  var config = {
    apiKey: "AIzaSyDcGz63S8fOJ4eYub7fRkEdRgbSt2Qev7U",
    authDomain: "trainschedule-2de8a.firebaseapp.com",
    databaseURL: "https://trainschedule-2de8a.firebaseio.com",
    projectId: "trainschedule-2de8a",
    storageBucket: "",
    messagingSenderId: "863490426984"
  };
  
  firebase.initializeApp(config);
  return firebase;

}()