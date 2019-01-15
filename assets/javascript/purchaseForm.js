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

    

  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + queryParams);
  return queryURL + queryParams;
}

/**
 * @param {object} USPSData
 */
function updatePage(USPSData) {

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


//     var section = article.section_name;
//     console.log(article.section_name);
//     if (section) {
//       $articleListItem.append("<h5>Section: " + section + "</h5>");
//     }


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

  var queryURL = buildQueryURL();


   $.ajax({
     url: queryURL,
     dataType: "xml",
     method: "GET"
   }).then(updatePage);
});

$("#clearAll").on("click", clear);
