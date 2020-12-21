var uniqueYearsArray, prizesByYear;

// First function to be called from HTML file
// Reads JSON file prizesByYear.json
// XML HTTP Request reference - https://www.w3schools.com/xml/tryit.asp?filename=tryxml_httprequest
function readPrizesByYearFromJSON() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            prizesByYear = JSON.parse(xmlhttp.responseText);
            assignValuesToStartYear();
        }
    };
    xmlhttp.open("GET", "../json/prizesByYear.json", true);
    xmlhttp.send();
}

// Checks if element is already present in array provided
function checkIfValueIsPresent(array, value) {
    return array.indexOf(value) > -1;
}

// Creates and assigns values to start year select field
function assignValuesToStartYear() {
    resetTable();
    uniqueYearsArray = [];
    startYear = "<option value=''>Please select start year</option>";
    document.getElementById('endYear').innerHTML = ""
    document.getElementById('categoryOfWinners').innerHTML = ""
    for (var i = 0; i < prizesByYear.prizes.length; i++) {
        var year = prizesByYear.prizes[i].year;
        if (!checkIfValueIsPresent(uniqueYearsArray, year)) {
            startYear += "<option value=" + year + ">" + year + "</option>";
            uniqueYearsArray.push(year);
        }
    }
    document.getElementById('startYear').innerHTML = startYear
}

// Creates and assigns values to end year select field
function assignValuesToEndYear() {
    resetTable();
    document.getElementById('categoryOfWinners').innerHTML = ""
    var startYearVal = document.getElementById('startYear').value;
    if (startYearVal == '') {
        document.getElementById('endYear').innerHTML = ""
    } else {
        endYear = "<option value=''>Please select end year</option>";
        for (var i = 0; i < uniqueYearsArray.length; i++) {
            if (parseInt(startYearVal) <= parseInt(uniqueYearsArray[i])) {
                endYear += "<option value=" + uniqueYearsArray[i] + ">" + uniqueYearsArray[i] + "</option>";
            }
        }
        document.getElementById('endYear').innerHTML = endYear
    }
}

// Creates and assigns values to category of winners select field
function assignCategoryOfWinners() {
    resetTable();
    var startYearVal = document.getElementById('startYear').value;
    var endYearVal = document.getElementById('endYear').value;
    if (startYearVal == '' || endYearVal == '') {
        document.getElementById('categoryOfWinners').innerHTML = ""
    } else {
        categoryOfWinners = "<option value=''>Please select category of winners</option>";
        var intStartYearVal = parseInt(startYearVal);
        var intEndYearVal = parseInt(endYearVal);
        var categoryOfWinnersArray = [];
        for (var i = 0; i < prizesByYear.prizes.length; i++) {
            var year = prizesByYear.prizes[i].year;
            var category = prizesByYear.prizes[i].category;
            var intYearVal = parseInt(year)
            if (intStartYearVal <= intYearVal && intEndYearVal >= intYearVal) {
                if (!checkIfValueIsPresent(categoryOfWinnersArray, category)) {
                    categoryOfWinners += "<option value=" + category + ">" + category + "</option>";
                    categoryOfWinnersArray.push(category);
                }
            }
        }
        document.getElementById('categoryOfWinners').innerHTML = categoryOfWinners;
    }
}

// Resets the table containing winners list
function resetTable() {
    document.getElementById("sectionTable").style.display = "none";
    document.getElementById("allWinners").checked = true;
}