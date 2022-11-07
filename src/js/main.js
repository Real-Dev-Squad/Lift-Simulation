document.querySelector("button#submit").addEventListener("click", (event) => {
    event.preventDefault(); //to stop page from reloading and showing values in the url i.e. preventing default submit behaviour

    const floorsInput = document.querySelector("#floors-input");
    const liftsInput = document.querySelector("#lifts-input");
    const floorsCount = floorsInput.value;
    const liftsCount = liftsInput.value;

    //if liftsCount or floorsCount is invalid, show alert and return
    if(floorsCount <= 0 || floorsCount > 100 || liftsCount <= 0 || liftsCount > 10) {
        alert("Invalid input! Try again.");
        return;
    }

    //if the code execution comes here means we have valid input and hence we can proceed with generating UI
    const inputBox = document.querySelector("#input-box");
    inputBox.style.display = "none";
    
    //showing user entered floors and lifts count
    const floorsCountContainer = document.querySelector("#floors-count");
    const liftsCountContainer = document.querySelector("#lifts-count");
    floorsCountContainer.textContent = `Floors count - ${floorsCount}`;
    liftsCountContainer.textContent = `Lifts count - ${liftsCount}`;
})
