
/**
 * @returns {string}
 */
function buildQueryURL() {

    var queryURL = "http://production.shippingapis.com/ShippingAPITest.dll?API=Verify&XML=";


    var queryParams = "<AddressValidateRequest USERID=\"032DCMSL0082\"><Address ID=\"0\"><Address1></Address1>";

    var address2 = $("#address")
        .val()
        .trim();

    var city = $("#city")
        .val()
        .trim();

    var state = $("#state").find("option:selected").text();

    var zip5 = $("#zip")
        .val()
        .trim();

    queryParams = queryParams + "<Address2>" + address2 + "</Address2>";
    queryParams = queryParams + "<City>" + city + "</City>";
    queryParams = queryParams + "<State>" + state + "</State>";
    queryParams = queryParams + "<Zip5>" + zip5 + "</Zip5>";
    queryParams = queryParams + "<Zip4></Zip4></Address></AddressValidateRequest>";


  // console.log("---------------\nURL: " + queryURL + "\n---------------");
  // console.log(queryURL + queryParams);
  return queryURL + queryParams;


    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + queryParams);
    return queryURL + queryParams;

}

/**
 * @param {object} USPSData
 */
function updatePage(USPSData) {

  // console.log(USPSData);
  // console.log("------------------------------------");

  // Create the form where we will place the information
  var x = $(USPSData).find("Error").first().text();
  
  if (x != ""){ //INVALID ADDRESS CASE

    var description2 = $(USPSData).find("Description").text();

    // getElementById("myTextarea").value

    // console.log("Invalid address. textResults = " + description2);

    //var numArticles = $("#article-count").val();

    console.log(USPSData);
    console.log("------------------------------------");

    //   for (var i = 0; i < numArticles; i++) {
    //     var article = NYTData.response.docs[i];

    //     var articleCount = i + 1;

    //     var $articleList = $("<ul>");
    //     $articleList.addClass("list-group");

    //     $("#article-section").append($articleList);

    //     var headline = article.headline;
    //     var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    //     if (headline && headline.main) {
    //       console.log(headline.main);
    //       $articleListItem.append(
    //         "<span class='label label-primary'>" +
    //           articleCount +
    //           "</span>" +
    //           "<strong> " +
    //           headline.main +
    //           "</strong>"
    //       );
    //     }

    //     var byline = article.byline;

    //     if (byline && byline.original) {
    //       console.log(byline.original);
    //       $articleListItem.append("<h5>" + byline.original + "</h5>");
    //     }


    $("#textResults").removeClass("d-none");
    $("#textResults").text(description2);

  } else { // VALID CASE 

    //     var section = article.section_name;
    //     console.log(article.section_name);
    //     if (section) {
    //       $articleListItem.append("<h5>Section: " + section + "</h5>");
    //     }


    // console.log("it is valid address");
    // console.log("textResults = " +$("#textResults").value);
 
    var address = $(USPSData).find("Address2").text();
    var city    = $(USPSData).find("City").text();
    var state   = $(USPSData).find("State").text();
    var zip5    = $(USPSData).find("Zip5").text();

    var textAddress = address + "\n" + city + ", " + state + " " + zip5;  
    $("#paypal-button").removeClass("disabled");
    $("#textResults").removeClass("d-none");
    $("#textResults").text(textAddress);
    
  }

    //     var pubDate = article.pub_date;
    //     console.log(article.pub_date);
    //     if (pubDate) {
    //       $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    //     }


    //     $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    //     console.log(article.web_url);


    //     $articleList.append($articleListItem);
    //   }

}

function clear() {
    $("#article-section").empty();
}

$("#validateForm").on("click", function(event) {

    event.preventDefault();

    clear();

 german2.0
  var queryURL = buildQueryURL();
   $.ajax({
     url: queryURL,
     dataType: "xml",
     method: "GET"
   }).then(updatePage);

    var queryURL = buildQueryURL();


    $.ajax({
        url: queryURL,
        dataType: "xml",
        method: "GET"
    }).then(updatePage);

});

$("#clearAll").on("click", clear);
/* -------------------------------------
      Pay Pal Section 
  -------------------------------------- */

  paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
        sandbox: 'AaR9zkIpcElBxxKso4qONsu74_ZC8FOXRx_o9J0sxhes8SQVzkVBbGm4kUkw0CcOUzXE6MK2dZgaeg5A',
        production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'en_US',
    style: {
        size: 'small',
        color: 'gold',
        shape: 'pill',
    },

    // Enable Pay Now checkout flow (optional)
    commit: true,

// Set up a payment
payment: function(data, actions) {
  return actions.payment.create({
    transactions: [{
      amount: {
        total: '10.00',
        currency: 'USD'
      },
      description: 'Code: F001. Fiesta Blue Skirt',
      
      item_list: {
        items: [
        {
          name: 'F001',
          description: 'Fiesta Blue Skirt',
          quantity: '1',
          price: '10.00',
          currency: 'USD'
        }],
        shipping_address: {
          // recipient_name:  $("#firstName").val().trim(),
          recipient_name:  $('#firstName').val().trim(),
          line1: '4th Floor',
          line2: 'Unit #34',
          city: 'San Jose',
          country_code: 'US',
          postal_code: '95131',
          state: 'CA'
        }
      }
    }],
    note_to_payer: 'Contact us for any questions on your order.'
  });
},
// shipping_address: {
//   recipient_name: 'Brian Robinson',
//   line1: '4th Floor',
//   line2: 'Unit #34',
//   city: 'San Jose',
//   country_code: 'US',
//   postal_code: '95131',
//   phone: '011862212345678',
//   state: 'CA'
//   }



    // Execute the payment
    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            // Show a confirmation message to the buyer
            //window.alert('Thank you for your purchase!');
            window.location="thankYou.html";
        });
        
    }
}, '#paypal-button');   


//David's Code starts Here:

console.log("connected");
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

database.ref("Cart").on("child_added", function(childSnapshot) {

    var reference = childSnapshot.val().addedItem;
    console.log(reference);

    database.ref("Products/" + reference).on("child_added", function(childSnapshot) {
        $("#purchase-information").append("<tr><td class='image'>" + childSnapshot.val().image + "</td><td class='item'>" + childSnapshot.val().model_id + "</td><td class='description'>" + childSnapshot.val().description + "</td></tr>");

    });
});

