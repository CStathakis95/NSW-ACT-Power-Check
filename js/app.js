async function checkOutages() {

```
const addressInput = document.getElementById("address");
const results = document.getElementById("results");

const address = addressInput.value.trim();

if (address === "") {
    alert("Please enter an address.");
    return;
}

results.innerHTML = `
    <h2>Checking:</h2>
    <p>${address}</p>
    <p>🔎 Looking up address...</p>
`;

try {

    const outage = await getOutage(address);

    console.log("Outage response:", outage);

    results.innerHTML = `

        <h2>Checking:</h2>

        <p>${outage.address || address}</p>

        <div class="company">

            <h3>Electricity Distributor</h3>

            <p class="ok">
                ⚡ ${
                    outage.distributor?.name ||
                    "Not yet determined"
                }
            </p>

            <h3>Power Status</h3>

            <p>
                ${
                    outage.power?.status ||
                    "Status unavailable"
                }
            </p>

            ${
                outage.location
                    ? `
                        <h3>Location Found</h3>

                        <p>
                            ${
                                outage.location.suburb ||
                                ""
                            }
                            ${
                                outage.location.postcode ||
                                ""
                            }
                        </p>
                      `
                    : ""
            }

        </div>

        <p>
            Last checked:
            ${new Date().toLocaleTimeString()}
        </p>

    `;

} catch (error) {

    console.error(
        "Outage check failed:",
        error
    );

    results.innerHTML = `

        <h2>Checking:</h2>

        <p>${address}</p>

        <div class="company">

            <h3>Power Status</h3>

            <p>
                ❌ Unable to check the address.
            </p>

            <p>
                ${error.message}
            </p>

        </div>

        <p>
            Last checked:
            ${new Date().toLocaleTimeString()}
        </p>

    `;

}
```

}
