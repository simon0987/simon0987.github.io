// 驗證firebase用的 這部分不用動
// var firebaseConfig = {
//     apiKey: "AIzaSyBZhnI2gpyT2H55z70QcAf6ffNYacPil38",
//     authDomain: "weblab-d72de.firebaseapp.com",
//     databaseURL: "https://weblab-d72de.firebaseio.com",
//     projectId: "weblab-d72de",
//     storageBucket: "weblab-d72de.appspot.com",
//     messagingSenderId: "587284098249",
//     appId: "1:587284098249:web:d52fad367efb270c"
// };

// firebase.initializeApp(firebaseConfig);
firebase.database.enableLogging(true);

// var db = firebase.firestore();
// var chestRef = db.collection("reservation").doc("chestRef");

// chestRef.update({
//     verfiycode: firebase.firestore.FieldValue.arrayUnion(100),
// });
$("input[type='submit']").on('click', function(e) {
    e.preventDefault();

    var email = $("input[name='email']").val()
    var password = $("input[name='password']").val()

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else if (errorCode == 'auth/email-already-in-use') {
            alert('This email is already registered.')
        } else if (errorCode == 'auth/invalid-email') {
            alert('The email you typed is invalid.')
        } else {
            alert(error.message)
        }
        // if (password.length < 6) {
        //     alert("password too short!!")
        //     return
        // } else {
        //     alert("You already have an account!! Please change to another email or choose to login.")
        // }
        // ...
    });
    // firebase.auth().createUserWithEmailAndPassword($("input[name='email']").val(),
    //     $("input[name='password']").val()).then(function(firebaseUser) {
    //     console.log("User " + firebaseUser.uid + " created successfully!");
    //     return firebaseUser;
});
// });

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)
        window.location.href = '../index.html'
        $("#signup").replaceWith("<a style='font-size: 10px;text-decoration: underline;color:blue;margin-right:10px'>" + user.email + "</a>")
        $("#signin").replaceWith("<a id='signout' class='btn btn-sm btn-outline-secondary' href='../index.html'>Sign out</a>")
    } else {
        console.log('No one signed in!')
    }
})