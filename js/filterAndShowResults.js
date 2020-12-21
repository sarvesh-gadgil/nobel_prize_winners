var searchResults;
var winnersByID = null;

// Called when submit button is clicked. Reads JSON file winnersByID.json
// XML HTTP Request reference - https://www.w3schools.com/xml/tryit.asp?filename=tryxml_httprequest
function readWinnersByIDFromJSON() {
    if (winnersByID == null) {
        winnersByID = [];
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                winnersByID = JSON.parse(xmlhttp.responseText);
            }
        };
        xmlhttp.open("GET", "../json/winnersByID.json", true);
        xmlhttp.send();
    }
}

// Called when submit button is clicked. Creates and displays the list of winners in a tabular format
function filterAndShowResults() {
    readWinnersByIDFromJSON();
    searchResults = [];
    var startYearVal = document.getElementById('startYear').value;
    var endYearVal = document.getElementById('endYear').value;
    if (startYearVal == '') {
        alert('Please select start year')
    } else if (endYearVal == '') {
        alert('Please select end year')
    } else {
        var categoryOfWinnersVal = document.getElementById('categoryOfWinners').value;
        var tableValues =
            "<table class=\"tableStyle\"><tr><th>Year of Award</th><th>Winners and Motivation for Award</th></tr>";
        if (categoryOfWinnersVal != '') {
            for (var i = 0; i < prizesByYear.prizes.length; i++) {
                var year = prizesByYear.prizes[i].year;
                var intYearVal = parseInt(year);
                var intStartYearVal = parseInt(startYearVal);
                var intEndYearVal = parseInt(endYearVal);

                if (intStartYearVal <= intYearVal && intEndYearVal >= intYearVal && categoryOfWinnersVal ==
                    prizesByYear.prizes[i].category) {
                    searchResults.push(prizesByYear.prizes[i]);
                    tableValues += "<tr>";
                    tableValues += "<td style=\"width: 40%; text-align: center;\">" + year + " (" + prizesByYear
                        .prizes[i].category + ")</td>"
                    tableValues += "<td style=\"width: 60%;\"><ul>"
                    for (var j = 0; j < prizesByYear.prizes[i].laureates.length; j++) {
                        var firstName = prizesByYear.prizes[i].laureates[j].firstname;
                        var lastName = prizesByYear.prizes[i].laureates[j].surname;
                        var fullName = firstName + " " + lastName;
                        var id = prizesByYear.prizes[i].laureates[j].id;
                        var link = "<a href=\"#!\" onclick=\"showMoreInfo(" + id + ")\" class=\"moreInfoStyle\">" + fullName + "</a>"
                        tableValues += "<li>Name: " + link + "<br>";
                        if (!!prizesByYear.prizes[i].laureates[j].motivation) {
                            tableValues += "Motivation: " + prizesByYear.prizes[i].laureates[j].motivation +
                                "</li>";
                        } else {
                            tableValues += "Motivation: - </li>";
                        }
                    }
                    tableValues += "</ul></td>";
                    tableValues += "</tr>"
                }
            }
        } else {
            for (var i = 0; i < prizesByYear.prizes.length; i++) {
                var year = prizesByYear.prizes[i].year;
                var intYearVal = parseInt(year);
                var intStartYearVal = parseInt(startYearVal);
                var intEndYearVal = parseInt(endYearVal);

                if (intStartYearVal <= intYearVal && intEndYearVal >= intYearVal) {
                    searchResults.push(prizesByYear.prizes[i])
                    tableValues += "<tr>";
                    tableValues += "<td style=\"width: 40%; text-align: center;\">" + year + " (" + prizesByYear
                        .prizes[i].category + ")</td>"
                    tableValues += "<td style=\"width: 60%;\"><ul>"
                    for (var j = 0; j < prizesByYear.prizes[i].laureates.length; j++) {
                        var firstName = prizesByYear.prizes[i].laureates[j].firstname;
                        var lastName = prizesByYear.prizes[i].laureates[j].surname;
                        var fullName = firstName + " " + lastName;
                        var id = prizesByYear.prizes[i].laureates[j].id;
                        var link = "<a href=\"#!\" onclick=\"showMoreInfo(" + id + ")\" class=\"moreInfoStyle\">" + fullName + "</a>"
                        tableValues += "<li>Name: " + link + "<br>";
                        if (!!prizesByYear.prizes[i].laureates[j].motivation) {
                            tableValues += "Motivation: " + prizesByYear.prizes[i].laureates[j].motivation +
                                "</li>";
                        } else {
                            tableValues += "Motivation: - </li>";
                        }
                    }
                    tableValues += "</ul></td>";
                    tableValues += "</tr>"
                }
            }
        }

        tableValues += "</table>";
        document.getElementById("allWinners").checked = true;
        document.getElementById("tableContents").innerHTML = tableValues;
        document.getElementById("sectionTable").style.display = "block";
        document.getElementById("results").innerText = "Showing results from " + startYearVal + " - " + endYearVal;
    }
}