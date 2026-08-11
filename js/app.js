async function checkOutages() {

const address =
    document.getElementById("address").value.trim();

const results =
    document.getElementById("results");


if (address === "") {

    alert("Please enter an address.");

    return;

}


results.innerHTML = `
    <h2>Checking:</h2>
    <p>${address}</p>
    <p>🔎 Contacting outage service...</p>
`;


try {

    const outage =
        await getOutage(address);


    console.log(
        "Cloudflare response:",
        outage
    );


    if (!outage) {

        throw new Error(
            "No response received from outage service."
        );

    }


    // ----------------------------------------------
    // Display result
    // ----------------------------------------------

    const distributor =
        typeof outage.distributor === "object"
            ? outage.distributor.name
            : outage.distributor;


    const powerStatus =
        outage.power?.status ||
        outage.status ||
        "Status unavailable";


    results.innerHTML = `

        <h2>Checking:</h2>

        <p>
            ${outage.address || address}
        </p>


        <div class="company">

            <h3>
                Electricity Distributor
            </h3>

            <p class="ok">
                ⚡ ${
                    distributor ||
                    "Not yet determined"
                }
            </p>


            <h3>
                Power Status
            </h3>

            <p>
                ${powerStatus}
            </p>


            ${
                outage.location
                ? `

                    <h3>
                        Location
                    </h3>

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
        "Search error:",
        error
    );


    results.innerHTML = `

        <h2>Checking:</h2>

        <p>${address}</p>


        <div class="company">

            <h3>
                Power Status
            </h3>

            <p>
                ❌ Unable to contact the outage service.
            </p>

            <p>
                ${error.message}
            </p>

        </div>

    `;

}
```

}
