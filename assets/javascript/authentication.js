/**
 * Created by hansel.tritama on 10/9/17.
 */
const config = {
    apiKey: "AIzaSyAiGigEkp1Z1KfJfC7BYDofge3mEg7yx3Y",
    authDomain: "pitch-ball.firebaseapp.com",
    databaseURL: "https://pitch-ball.firebaseio.com",
    projectId: "pitch-ball",
    storageBucket: "pitch-ball.appspot.com",
    messagingSenderId: "1005232542413"
};
firebase.initializeApp(config);

var google_provider = new firebase.auth.GoogleAuthProvider();
var facebook_provider = new firebase.auth.FacebookAuthProvider();

google_provider.addScope('profile');
google_provider.addScope('email');

$(".btn-google").on("click", function () {
    firebase.auth().signInWithPopup(google_provider).then(function(result) {
        console.log(result);
        window.user = result.user;
    }).catch(function (error) {
        console.log(error);
    });
});

$(".btn-facebook").on("click", function () {
    firebase.auth().signInWithPopup(facebook_provider).then(function(result) {
        console.log(result);
        window.user = result.user;
    }).catch(function (error) {
        console.log(error);
    });
});