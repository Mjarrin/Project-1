
var config = {
    apiKey: "AIzaSyDarVTsZc6k-a491eF6C8PgcSIwXqf0xNY",
    authDomain: "signup-signin-58064.firebaseapp.com",
    databaseURL: "https://signup-signin-58064.firebaseio.com",
    projectId: "signup-signin-58064",
    storageBucket: "signup-signin-58064.appspot.com",
    messagingSenderId: "175269563861"
};
firebase.initializeApp(config);

var database = firebase.database();



const txtEmail = $('#emailtext');
const txtPassword = $('#passwordtext');
const signUpBtn = $('#signup');
const signInBTn = $('#signin');
const logOutBtn = $('#logout');

//add sign In event
signInBTn.on("click", function () {

    const email = txtEmail.val();
    const pass = txtPassword.val();
    // sign in 
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function() {
        console.log('you logged in'); 
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
    });

});
//sign up event
signUpBtn.on("click", function (event){
    event.preventDefault();
    const email = txtEmail.val();
    const pass = txtPassword.val();
    // sign up a user
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function() {
        console.log('you signed up');  


        signUpBtn.toggle();

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ...
        }); 
});

logOutBtn.on('click', function(event){
    event.preventDefault();
    firebase.auth().signOut();
    console.log('you logged out');
});

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    $('#login-tracker').show();
    logOutBtn.show();

    // ...
} else {
    // User is signed out.
    // ...
    $('#login-tracker').hide();
    logOutBtn.hide();

}
});




var queryURL = "https://api.predicthq.com/v1/events?limit=1";

var categories = ["conferences", "expos", "concerts", "festivals"];

var search = "";

var label = "";


$("#submmit-event").on("click", function () {
    // get random category to display

    label = $('#event-input').val().trim();

    queryURL += "&" + $.param({
        'labels': label,
     

    });

    console.log("query URL" + queryURL);


    $.ajax({
        url: queryURL,
        method: 'GET',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer 4SepDTuqqTQQgPSM68gLJpoJJoEpSB",
            Accept: "application/json"

        }
    }).done(function (response) {
        console.log(response);

        

    }).fail(function (err) {
        // throw err;
    });


});

// using search button to display results 
    $("#supriseMe").on("click", function () {

    // get random category to display

    var ranNum = Math.floor(Math.random() * (categories.length - 1))

    search = categories[ranNum];

    // queryURL += "&" + $.param({
    //     'category': search,


    // });


    //headers works as my authentification
    //send ajax
    $.ajax({
        url: queryURL,
        method: 'GET',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer 4SepDTuqqTQQgPSM68gLJpoJJoEpSB",
            Accept: "application/json"

        }
    }).done(function (response) {
        console.log(response);

        // var answer = response.results;


        var responseDiv = $('<div>');
        responseDiv.html(JSON.stringify(response.results[0]));

        $('#answerContainer').append(responseDiv);



        // articles.forEach(function(article) {
        // var articleDiv = document.createElement('div');
        // articleDiv.innerHTML = JSON.stringify(article);
        // $("#show").append(articleDiv);
        //})

    }).fail(function (err) {
        // throw err;
    });


 });

    function isPageShownCurrently(page) {
        return false;
    }

    // [class*] all classes that have or end with]

    function renderPage(page) {
        if (!$(`.${page}-page`).is(':visible')) {
            $('[class*="-page"]').hide(400, function () {
                $(`.${page}-page`).show(400);
            });
        }
    }


    // hide all pages except ...
    

    

var surprise = $('#surprise-page');



    isPageShownCurrently('surprise');