document.addEventListener("DOMContentLoaded", function() {
    var nut = document.getElementById("nut1");
    var card = document.getElementsByClassName("card");
    nut.onclick= function() {
        card[0].classList.toggle("sangphai");
    }
}, false)