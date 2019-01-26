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
$("button").on("click", function (event) {
    employeeName = $().val().trim();
    employeeRole = $().val().trim();
    employeeRate = $().val().trim();
    employeeStartDate = $().val().trim();
    var employeeData = {
        employeeName: employeeName,
        employeeRole: employeeRole,
        employeeRate: employeeRate,
        employeeStartDate: employeeStartDate
    }
    database.ref().push({ employeeData });
});

//listen for added child function
database.ref().on("child_added", function (snapshot) {
    // snapshot.forEach((child) => {
    let theEmployeeName = child.employeeName;
    let theEmployeeRole = child.employeeRole;
    let theEmployeeStartDate = child.employeeStartDate;
    let theEmployeeRate = child.employeeRate;
    // });
    console.log("Name: " + theEmployeeName + ", Role: " + theEmployeeRole + ", Start Date: " + theEmployeeStartDate + ", Rate: " + theEmployeeRate);
}, function (errorObject) {
    console.log("entries-error: " + errorObject.code);
});


//function for moment.js to calculate employeeMonthsWorked