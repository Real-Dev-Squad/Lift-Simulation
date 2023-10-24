// console.log("hello")
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the form element
  const elevatorForm = document.getElementById("elevatorForm");

  elevatorForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Access the input values as integers
    const floors = parseInt(document.getElementById("floors").value, 10);
    const elevators = parseInt(document.getElementById("elevators").value, 10);

    // You now have the values as integers and can use them in your JavaScript code
    console.log("Number of Floors: " + floors);
    console.log("Number of Elevators Needed: " + elevators);

    // You can perform further actions or send this data to the server as needed

    // Construct the URL with query parameters
    const url = `elevators.html?floors=${floors}&elevators=${elevators}`;

    // Redirect to the other page
    window.location.href = url;
  });
});
