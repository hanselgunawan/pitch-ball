(function() {

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyAiGigEkp1Z1KfJfC7BYDofge3mEg7yx3Y",
        authDomain: "pitch-ball.firebaseapp.com",
        databaseURL: "https://pitch-ball.firebaseio.com",
        projectId: "pitch-ball",
        storageBucket: "pitch-ball.appspot.com",
        messagingSenderId: "1005232542413"
    };
    firebase.initializeApp(config);

    // Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const txtLogin = document.getElementById('btnLogin');
    const txtSignUp = document.getElementById('btnSignUp');
    const txtLogOut = document.getElementById('btnLogOut');

    // Add Login
    btnLogin.addEventListener('click', e => {
        // get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });


    // Add Signup
    btnSignUp.addEventListener('click', e => {

        // get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);

    });

    // Log Out
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // Realtime Listener

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogOut.classList.remove('hide');

        } else {

            console.log('not logged in');
            btnLogOut.classList.add('hide')


        }
    });


}());

