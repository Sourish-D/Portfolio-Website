//Navigation Bar
function Close(item, sender) {
    if (document.getElementById(item).style.display=="none") {
        document.getElementById(item).style.display="block";
        document.getElementById(item).className="animation";
        document.getElementById("div").className="animation3";
        sender.innerHTML='<i class="fa-solid fa-arrow-up"></i>';
    } else {
        document.getElementById(item).className="animation2";
        document.getElementById("div").className="animation4";
        setTimeout(()=>{document.getElementById(item).style.display="none";},499)
        sender.innerHTML='<i class="fa-solid fa-arrow-down"></i>';
    }
}

//Location Website
const LocationImages = [
    "https://img.onmanorama.com/content/dam/mm/en/travel/getting-about-kerala/pathanamthitta/images/2017/7/25/gavi-4.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Perunthenaruvi_Pathanamthitta_%288%29.jpg",
    "https://www.onmanorama.com/content/dam/mm/en/travel/hourglass/images/2018/10/16/tourism-elephants.jpg.transform/576x300/image.jpg",
    "https://www.myholidayclub.co.in/childimage/1466928232.jpg"
]
let image=0;
const Place = document.getElementById("LocationSlideshow");
function Locations() {
    Place.style.backgroundImage="url("+LocationImages[0]+")";
    image=0;
}
function Slide(add) {
    image+=add;
    if (image==4) {
        image=0;
    } else if (image==-1) {
        image=3;
    } 
    Place.style.backgroundImage="url("+LocationImages[image]+")";
}

//Ranni City Website
function LocationPlacement(object, change) {
    if (document.getElementById(change).style.display=='none') {
        document.getElementById(change).style.display="block";
        object.innerHTML="Explanation of Placement:";
    } else {
        document.getElementById(change).style.display="none";
        object.innerHTML="For Explanation of Placement."
    }
}