//David Schnibben

var images = ["assets/productPictures/fiestaBlueSkirt.jpg", "assets/productPictures/rapunselFront.jpg", "assets/productPictures/snowFront.jpg", "assets/productPictures/sleepingFront.jpg", "assets/productPictures/cinderella-front.jpg"];

var count = 0;

function displayImage() {
    $("#images").html("<img src=" + images[count] + " width='200px'>");
    count++;
    if (count === images.length) {
        count = 0;
    }
}

setInterval(displayImage, 6000);

displayImage();

