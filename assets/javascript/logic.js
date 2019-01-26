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
    $(".form-submit").on("submit", function (event) {
        event.preventDefault();
        console.log("here");
        employeeName = $("#employeeName").val().trim();
        employeeRole = $("#employeeRole").val().trim();
        employeeRate = $("#employeeRate").val().trim();
        employeeStartDate = $("#employeeStartDate").val().trim();
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
        console.log("there");
        let theEmployeeName = snapshot.val().employeeName;
        let theEmployeeRole = snapshot.val().employeeRole;
        let theEmployeeStartDate = snapshot.val().employeeStartDate;
        let theEmployeeRate = snapshot.val().employeeRate;
        
        var monthsWorked = moment().diff(moment(theEmployeeStartDate, "MM/DD/YYYY"),"months");
        var totalBilled = monthsWorked * theEmployeeRate;
        console.log(monthsWorked);
        console.log(totalBilled);
        console.log("Name: " + theEmployeeName + ", Role: " + theEmployeeRole + ", Start Date: " + theEmployeeStartDate + ", Rate: " + theEmployeeRate);
    }, function (errorObject) {
        console.log("entries-error: " + errorObject.code);
        

    });
});


    //function for moment.js to calculate employeeMonthsWorked
