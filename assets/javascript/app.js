//David Schnibben

$(document).ready(function() {


    // console.log("connected-----");

    console.log("connected");
    console.log("new");

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDbwHgPqmcP1dWVG82WWrrla9HhkrL1hnY",
        authDomain: "my-little-princess-dresses.firebaseapp.com",
        databaseURL: "https://my-little-princess-dresses.firebaseio.com",
        projectId: "my-little-princess-dresses",
        storageBucket: "my-little-princess-dresses.appspot.com",
        messagingSenderId: "758916304123"
    };


    firebase.initializeApp(config);
    var database = firebase.database();

    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:
    var query = database.ref("Products").orderByKey();
    query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                $("#dress-information").append("<div class = 'col-sm-6'><div class = 'card mx-auto' style = 'width: 18rem;'><img src = '" + childSnapshot.val().image + "' class = 'card-img-top' alt = '...' ><div class = 'card-body'> <h5 class = 'card-title dress' id = 'dress'>Model: " + childSnapshot.val().model_id + "</h5></div><ul class='list-group list-group-flush'><li class='list-group-item description' id='description'> Description: " + childSnapshot.val().description + "</li><li class='list-group-item line' id='line'>Product Line: " + childSnapshot.val().line + "</li><li class='list-group-item quantity' id='quantity'>Quantity: " + childSnapshot.val().quantity + "</li></ul><div class= 'card-body'><button class='btn btn-primary' id='add-to-cart' value='" + childSnapshot.key + "'>Add to Cart</button></div></div></div>");
            });
            
        });


        // $(".add-to-cart").on("click", function(event) {
        $(document).on("click", ".add-to-cart", function(event) {
            event.preventDefault();

            var key = $(".add-to-cart").val();
            //console.log("key: " + key);
        
            database.ref("Cart").set({
              addedItem: key
            });
            // window.open("purchaseForm.html");
            window.location.href = "purchaseForm.html";

    $("#add-to-cart").click(function(event) {

        console.log("clicked");
        var key = $("#add-to-cart").val();

        database.ref("Cart").set({
            addedItem: key

        });
    });
