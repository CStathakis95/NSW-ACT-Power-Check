function checkOutages() {

    const address = document.getElementById("address").value;

    if (address.trim() === "") {
        alert("Please enter an address.");
        return;
    }

    const distributor = findDistributor(address);

    const outage = await checkOutage(distributor, address);

    document.getElementById("results").innerHTML = `

        <h2>Checking:</h2>
        <p>${address}</p>

 <div class="company">

    <h3>Electricity Distributor</h3>

    <p class="ok">
    ⚡ ${distributor}
    </p>

</div>


        <p>
        Last checked:
        ${new Date().toLocaleTimeString()}
        </p>

    `;
}
