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

    $("#textResults").removeClass("d-none");
    $("#textResults").text(description2);

  } else { // VALID CASE 

    // console.log("it is valid address");
    // console.log("textResults = " +$("#textResults").value);

    var address = $(USPSData).find("Address2").text();
    var city    = $(USPSData).find("City").text();
    var state   = $(USPSData).find("State").text();
    var zip5    = $(USPSData).find("Zip5").text();

    var textAddress = address + "\n" + city + ", " + state + " " + zip5;  
    $("#checkOut").removeClass("disabled");
    $("#textResults").removeClass("d-none");
    $("#textResults").text(textAddress);
    
  }
}

function clear() {
  $("#article-section").empty();
}

$("#validateForm").on("click", function(event) {

  event.preventDefault();

  clear();

  var queryURL = buildQueryURL();


   $.ajax({
     url: queryURL,
     dataType: "xml",
     method: "GET"
   }).then(updatePage);
});

$("#clearAll").on("click", clear);
