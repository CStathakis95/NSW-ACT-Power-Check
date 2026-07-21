function checkOutages() {

    const address = document.getElementById("address").value;

    if (address.trim() === "") {
        alert("Please enter an address.");
        return;
    }


    document.getElementById("results").innerHTML = `

        <h2>Checking:</h2>
        <p>${address}</p>

        <div class="company">
            <h3>Ausgrid</h3>
            <p class="ok">
            🟢 Waiting for live connection
            </p>
        </div>


        <div class="company">
            <h3>Endeavour Energy</h3>
            <p class="ok">
            🟢 Waiting for live connection
            </p>
        </div>


        <div class="company">
            <h3>Essential Energy</h3>
            <p class="ok">
            🟢 Waiting for live connection
            </p>
        </div>


        <p>
        Last checked:
        ${new Date().toLocaleTimeString()}
        </p>

    `;
}
