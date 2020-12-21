// Called when user hovers over a name and clicks on it. Displays information on a modal
// Modal reference - https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2
function showMoreInfo(id) {
    var userInfo = null;
    for (var k = 0; k < winnersByID.laureates.length; k++) {
        if (winnersByID.laureates[k].id == id) {
            userInfo = winnersByID.laureates[k];
            break;
        }
    }
    document.getElementById("moreInfoName").innerText = userInfo.firstname + " " + userInfo.surname;
    var tableValues = "<table class=\"tableStyle\"><tr><th class=\"moreInfoTableStyle\">Name</th><th class=\"moreInfoTableStyle\">Details</th></tr>";
    var birthDate = '-';
    if (userInfo.born != "0000-00-00") {
        birthDate = userInfo.born;
    }
    tableValues += "<tr><td class=\"moreInfoTableStyle\">Year of Birth: </td><td class=\"moreInfoTableStyle\">" + birthDate + "</td></tr>";
    if (userInfo.died != "0000-00-00") {
        tableValues += "<tr><td class=\"moreInfoTableStyle\">Year of Death: </td><td class=\"moreInfoTableStyle\">" + userInfo.died + "</td></tr>";
    }
    if (!!userInfo.bornCity) {
        tableValues += "<tr><td class=\"moreInfoTableStyle\">City of Birth: </td><td class=\"moreInfoTableStyle\">" + userInfo.bornCity + "</td></tr>";
    }
    if (userInfo.prizes.length > 0) {
        tableValues += "<tr><td class=\"moreInfoTableStyle\">Awards Received: </td><td class=\"moreInfoTableStyle\"><ol>";
        for (var i = 0; i < userInfo.prizes.length; i++) {
            tableValues += "<li>Category: " + userInfo.prizes[i].category + "<br>"
            tableValues += "Motivation: " + userInfo.prizes[i].motivation + "<br>"
            var isAffiliationFound = false;
            if (userInfo.prizes[i].affiliations.length > 0) {
                var affiliationValue = "Affiliations:<br><ul>"
                for (j = 0; j < userInfo.prizes[i].affiliations.length; j++) {
                    var name = userInfo.prizes[i].affiliations[j].name;
                    var city = userInfo.prizes[i].affiliations[j].city;
                    var country = userInfo.prizes[i].affiliations[j].country;
                    var combine = []
                    if (!!name) {
                        combine.push(name);
                        isAffiliationFound = true;
                    }
                    if (!!city) {
                        combine.push(city);
                        isAffiliationFound = true;
                    }
                    if (!!country) {
                        combine.push(country);
                        isAffiliationFound = true;
                    }
                    affiliationValue += "<li>" + combine.join(", ") + "</li><br>";
                }
                if (isAffiliationFound) {
                    tableValues += affiliationValue + "</ul>";
                } else {
                    tableValues += "Affiliations: -";
                }
            }
        }
        tableValues += "</li></ol></td></tr></table>";
        document.getElementById("moreInfoTable").innerHTML = tableValues;
    }

    var modal = document.getElementById("moreInfoModal");
    modal.style.display = "block";
}

// Closes a modal
function closeModal() {
    var modal = document.getElementById("moreInfoModal");
    modal.style.display = "none";
}