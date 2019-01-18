(function () {
    "use strict";

    let localTotal = 0;
    let lastOperator = "+";
    let showingResult = true;
    let operation_functions = {
        "+": function(x) {localTotal += parseFloat(x);},
        "/": function(x) {localTotal /= parseFloat(x);},
        "*": function(x) {localTotal *= parseFloat(x);},
        "-": function(x) {localTotal -= parseFloat(x);}
    };
    var total = document.getElementById("total");

    function onNumberPress(num) {
        if (showingResult) {
            total.innerHTML = num;   
            showingResult = false;
        }
        else {
            if (total.innerHTML == "0") {
                total.innerHTML = num;
            }
            else {
            total.innerHTML = total.innerHTML.concat(num);
            }
        }
    }

    function handleDecimal() {
        if (showingResult) {
            total.innerHTML = "0.";
            showingResult = false;
        }
        else {
            if (total.innerHTML.includes(".")) {
                return;
            }
            else {
                total.innerHTML = total.innerHTML.concat(".");
            }
        }
    }

    function handleClear() {
        if (showingResult) {
            localTotal = 0;
        }
        total.innerHTML = 0;
    }

    
    function operation(operator) {
        getNewTotal();
        lastOperator = operator;
    }

    function getNewTotal() {
        let htmlTotal = parseFloat(total.innerHTML);
        if (showingResult) {
            localTotal = htmlTotal;
        }
        else {
            operation_functions[lastOperator](htmlTotal);
        }
        total.innerHTML = localTotal;
        showingResult = true;
    }

    function init() {
        gatherNumButtons();
        gatherOpButtons();
        gatherOtherButtons();
    }

    function gatherOtherButtons() {
        document.getElementById("decimal").addEventListener("click", handleDecimal);
        document.getElementById("clear").addEventListener("click", handleClear);
    }

    function gatherOpButtons() {
        document.getElementById("func_+=").addEventListener("click", function() {operation("+");});
        document.getElementById("func_/").addEventListener("click", function() {operation("/");});
        document.getElementById("func_*").addEventListener("click", function() {operation("*");});
        document.getElementById("func_-").addEventListener("click", function() {operation("-");});
    }

    function gatherNumButtons() {
        let number_btns = new Array();
        for (let i = 0; i <= 9; i++) {
            let btn_id = "num_".concat(i);
            let btn = document.getElementById("num_".concat(i));
            btn.addEventListener("click", function() {onNumberPress(i);});
            number_btns.push(btn);
        }
        return number_btns;
    }

    window.addEventListener("load", init, false);
})();

