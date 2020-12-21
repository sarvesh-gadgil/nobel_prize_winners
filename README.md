# Nobel Prize Winners Website

This website was created using HTML, JavaScript and CSS. It executed various filter operations for searching nobel prize winners using the provided JSON file.

Some of the functionalities are as follows:

A) readAndAssignValues.js
This file consists of 6 functions as follows: 

-readPrizesByYearFromJSON():
This is called from HTML file. It acts as a starting point of the js code and is called only once. This reads JSON file prizesByYear.json and saves in an array which is utilised for further manipulation.

-assignValuesToStartYear():
This function is internally called from readPrizesByYearFromJSON() to assign values to start year select field.

-assignValuesToEndYear():
This is called on onchange of start year select field. Only years greater than or equal to start year results are filtered and displayed. All the filtered values are assigned to end year select field.

-assignCategoryOfWinners():
This is called on onchange of end year select field. All the filtered categories between start year and end year are assigned to category of winners select field.

-resetTable():
This function resets the table containing winners list. Also resets the radio button value to all winners.

-checkIfValueIsPresent():
Checks if element is already present in array provided. Used to filter unique values in assignValuesToStartYear(), assignValuesToEndYear() and assignCategoryOfWinners().



B) filterAndShowResults.js
This file contains operations which are executed after submit button is clicked.

-filterAndShowResults():
This function is called when submit button is clicked. It filters and shows data according to start year, end year and category(if selected) in tabular format.

-readWinnersByIDFromJSON():
This function is called internally from filterAndShowResults(). XML HTTP request is only done once and saved in array winnersByID. Next time if array is null then only request is done.



C) radioButtonFilters.js
This file contains operations which are executed on onchange of radio buttons (male, female and all winners). It consists of one function showGenderSpecificWinners(winnerGender) which accepts gender as argument and filters results accordingly.


D) showMoreInfo.js
This file contains function showMoreInfo(id) which is called when user hovers over a name and clicks on it. This function accepts a id as argument, then finds that id in winnersByID array and displays information on a modal.


References:

-Shadow Pane reference - https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_box-shadow

-Forms reference - https://www.w3schools.com/css/tryit.asp?filename=trycss_forms

-CSS Buttons Reference - https://www.w3schools.com/css/css3_buttons.asp

-CSS Table Reference - https://www.w3schools.com/css/css_table.asp

-Modal reference - https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2

-XML HTTP Request reference - https://www.w3schools.com/xml/tryit.asp?filename=tryxml_httprequest