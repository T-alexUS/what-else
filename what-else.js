    //Влияние input на range
    function changeRangeValue(val) {
    val = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
    if (val >= -20 && val <=100) {
        document.getElementById("r1_2").value = val;
    }
    else if (val < -20){
        val = -20;
        document.getElementById("one_2").value = val;
        document.getElementById("r1_2").value = val;
    }

    else if (val > 100) {
        val = 100;
        document.getElementById("one_2").value = val;
        document.getElementById("r1_2").value = val;
    }
}

//Влияние range на input
function changeInputValue(val) {
    val = val > 100 ? val = 100 : val;
    document.getElementById("one_2").value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
}

