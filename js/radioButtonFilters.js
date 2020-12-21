// Called on onchange of any radio button. Filters the existing results by gender
function showGenderSpecificWinners(winnerGender) {
    if (winnerGender == "all") {
        filterAndShowResults();
    } else {
        var isWinnerFound = false;
        var tableValues =
            "<table class=\"tableStyle\"><tr><th>Year of Award</th><th>Winners and Motivation for Award</th></tr>";
        for (var i = 0; i < searchResults.length; i++) {
            var filterTableValues = ''
            var isResultFound = false;
            var year = searchResults[i].year;
            filterTableValues += "<tr>";
            filterTableValues += "<td style=\"width: 40%; text-align: center;\">" + year + " (" + searchResults[i]
                .category + ")</td>"
            filterTableValues += "<td style=\"width: 60%;\"><ul>"
            for (var j = 0; j < searchResults[i].laureates.length; j++) {
                for (var k = 0; k < winnersByID.laureates.length; k++) {
                    if (winnersByID.laureates[k].id == searchResults[i].laureates[j].id && winnersByID
                        .laureates[k].gender == winnerGender) {
                        var firstName = searchResults[i].laureates[j].firstname;
                        var lastName = searchResults[i].laureates[j].surname;
                        var fullName = firstName + " " + lastName;
                        var id = searchResults[i].laureates[j].id;
                        var link = "<a href=\"#!\" onclick=\"showMoreInfo(" + id + ")\" class=\"moreInfoStyle\">" + fullName + "</a>"
                        filterTableValues += "<li>Name: " + link + "<br>";
                        if (!!searchResults[i].laureates[j].motivation) {
                            filterTableValues += "Motivation: " + searchResults[i].laureates[j].motivation +
                                "</li>";
                        } else {
                            filterTableValues += "Motivation: - </li>";
                        }
                        isResultFound = true;
                        isWinnerFound = true;
                    }
                }
            }
            filterTableValues += "</ul></td>";
            filterTableValues += "</tr>";
            if (isResultFound) {
                tableValues += filterTableValues;
            }
        }
        if (!isWinnerFound) {
            tableValues += "<tr><td colspan=2 style=\"text-align: center; padding: 20px\">No winners found</td></tr>"
        }
        tableValues += "</table>";
        document.getElementById("tableContents").innerHTML = tableValues;
        document.getElementById("sectionTable").style.display = "block";
    }
}