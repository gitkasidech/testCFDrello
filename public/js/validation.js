$("#saveall").click(function() {
    //var x = document.forms["formdashboard"]["namedashboard"].value;
    var x = document.getElementById("nameDashboard").value;
    if (x == "") {
        // alert("Name must be filled out");
        document.getElementById("demo").innerHTML = "Please Enter Name Dashboard!";
        return false;
    }

})