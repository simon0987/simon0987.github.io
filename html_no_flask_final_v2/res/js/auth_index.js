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

firebase.auth().onAuthStateChanged(function(user) {
    randNum = Math.floor(Math.random() * (70 - 60 + 1)) + 60;
    $('#li1').replaceWith("<li id='li1' style='font-size: 120%;'>健身中心現在人數:    " + randNum + "人" + "</li>")
    if (user) {
        console.log(user)
        $("#signup").replaceWith("<a style='font-size: 10px;text-decoration: underline;color:blue;margin-right:10px'>" + user.email + "</a>")
        $("#signin").replaceWith("<a id='signout' class='btn btn-sm btn-outline-secondary' href='./index.html'>Sign out</a>")
        $('#signout').on('click', function() {
            var answer = confirm("Are you sure you want to sign out?")
            if (answer) {
                firebase.auth().signOut().then(function() {
                    console.log("sign out successfully!")
                }).catch(function(error) {
                    console.log(error)
                });
            }
        })
    } else {
        console.log('dog')
    }
})