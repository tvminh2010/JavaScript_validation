document.addEventListener("DOMContentLoaded", function() {
    var tamgiac = document.getElementsByClassName("tamgiac");
    console.log(tamgiac[0]);
    var danhsach = document.getElementsByClassName("danhsach");

    tamgiac[0].onclick = function() {
        console.log("Vừa click vào tam giac");
        //this.style.color = "white";
        this.classList.toggle("tamgiactrang");
        danhsach[0].classList.toggle("danhsachhienthilai");
    }

}, false)