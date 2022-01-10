document.addEventListener("DOMContentLoaded", function() {
    var nutbam = document.getElementsByTagName("button");
    var trangthai = "lan1";
    var khoichuyendong = document.getElementById("kcd");


    nutbam[0].onclick = function() {
        if(trangthai == "lan1") {
            console.log("click lần 1");
            trangthai = "lan2";
            khoichuyendong.classList.remove("chieuso2");
            khoichuyendong.classList.add("chieuso1");
        } else if (trangthai == "lan2") {
            console.log("click lần 2");
            trangthai = "lan1";
            khoichuyendong.classList.remove("chieuso1");
            khoichuyendong.classList.add("chieuso2");
        }  
    }
}, false)