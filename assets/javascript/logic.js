$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCVLD6OlsrBQYAZP6QhN7TrmWsUgyHApHU",
        authDomain: "employeedata-6ce71.firebaseapp.com",
        databaseURL: "https://employeedata-6ce71.firebaseio.com",
        projectId: "employeedata-6ce71",
        storageBucket: "employeedata-6ce71.appspot.com",
        messagingSenderId: "737073428957"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    var employeeName;
    var employeeRole;
    var employeeStartDate;
    var employeeRate;


    //calculate on fly: employeeMonthsWorked, employeeTotalBilled


    //addEmployee function
    //TODO: update input field IDs
    $("#btn-add").on("click", function (event) {
        event.preventDefault();
        employeeName = $("#employee-name").val().trim();
        employeeRole = $("#employee-role").val().trim();
        employeeRate = $("#employee-rate").val().trim();
        employeeStartDate = $("#employee-start-date").val().trim();
        console.log(employeeName, employeeRole, employeeRate, employeeStartDate);
        database.ref().push({
            employeeName: employeeName,
            employeeRole: employeeRole,
            employeeRate: employeeRate,
            employeeStartDate: employeeStartDate
        });
    });

    //listen for added child function
    database.ref().on("child_added", function (snapshot) {
        //TODO: put in to correct divs, not console.log
        let theEmployeeName = snapshot.val().employeeName;
        let theEmployeeRole = snapshot.val().employeeRole;
        let theEmployeeStartDate = snapshot.val().employeeStartDate;
        let theEmployeeRate = snapshot.val().employeeRate;
        console.log("Name: " + theEmployeeName + ", Role: " + theEmployeeRole + ", Start Date: " + theEmployeeStartDate + ", Rate: " + theEmployeeRate);
    }, function (errorObject) {
        console.log("entries-error: " + errorObject.code);
    });

    console.log(moment().diff(moment(1530000, "X"), "months"));
    //function for moment.js to calculate employeeMonthsWorked

});