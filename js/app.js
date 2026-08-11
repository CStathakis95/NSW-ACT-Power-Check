async function checkOutages() {

    const address =
        document.getElementById("address").value.trim();

    const results =
        document.getElementById("results");


    if (address === "") {

        alert(
            "Please enter an address."
        );

        return;
    }


    results.innerHTML = `
        <h2>Checking:</h2>

        <p>
            ${address}
        </p>

        <p>
            🔎 Contacting outage service...
        </p>
    `;


    try {

        const outage =
            await getOutage(
                address
            );


        console.log(
            "Cloudflare response:",
            outage
        );


        if (!outage) {

            throw new Error(
                "No response received from outage service."
            );
        }


        // ==================================================
        // DISTRIBUTOR
        // ==================================================

        const distributor =
            typeof outage.distributor === "object"
                ? outage.distributor.name
                : outage.distributor;


        // ==================================================
        // POWER DATA
        // ==================================================

        const power =
            outage.power || {};


        const powerStatus =
            power.status ||
            outage.status ||
            "Status unavailable";


        const hasOutage =
            power.outage === true;


        // ==================================================
        // BUILD EXTRA OUTAGE DETAILS
        // ==================================================

        let outageDetails =
            "";


        if (hasOutage) {

            // ----------------------------------------------
            // OUTAGE STATUS
            // ----------------------------------------------

            if (
                power.powerStatus
            ) {

                outageDetails += `
                    <h3>
                        Outage Status
                    </h3>

                    <p>
                        ${formatPowerStatus(
                            power.powerStatus
                        )}
                    </p>
                `;
            }


            // ----------------------------------------------
            // AFFECTED CUSTOMERS
            // ----------------------------------------------

            if (
                power.affectedCustomers !== null &&
                power.affectedCustomers !== undefined
            ) {

                outageDetails += `
                    <h3>
                        Affected Customers
                    </h3>

                    <p>
                        ${power.affectedCustomers}
                    </p>
                `;
            }


            // ----------------------------------------------
            // AREA
            // ----------------------------------------------

            if (
                power.area
            ) {

                outageDetails += `
                    <h3>
                        Affected Area
                    </h3>

                    <p>
                        ${power.area}
                    </p>
                `;
            }


            // ----------------------------------------------
            // STREETS
            // ----------------------------------------------

            if (
                power.streetsAffected
            ) {

                outageDetails += `
                    <h3>
                        Affected Streets
                    </h3>

                    <p>
                        ${power.streetsAffected}
                    </p>
                `;
            }


            // ----------------------------------------------
            // CAUSE
            // ----------------------------------------------

            if (
                power.cause
            ) {

                outageDetails += `
                    <h3>
                        Cause
                    </h3>

                    <p>
                        ${power.cause}
                    </p>
                `;
            }


            // ----------------------------------------------
            // START TIME
            // ----------------------------------------------

            if (
                power.startTime
            ) {

                outageDetails += `
                    <h3>
                        Outage Started
                    </h3>

                    <p>
                        ${formatDateTime(
                            power.startTime
                        )}
                    </p>
                `;
            }


            // ----------------------------------------------
            // ESTIMATED RESTORATION
            // ----------------------------------------------

            if (
                power.estimatedRestoration
            ) {

                outageDetails += `
                    <h3>
                        Estimated Restoration
                    </h3>

                    <p>
                        ${formatDateTime(
                            power.estimatedRestoration
                        )}
                    </p>
                `;
            }


            // ----------------------------------------------
            // EVENT ID
            // ----------------------------------------------

            if (
                power.eventId
            ) {

                outageDetails += `
                    <h3>
                        Ausgrid Event ID
                    </h3>

                    <p>
                        ${power.eventId}
                    </p>
                `;
            }
        }


        // ==================================================
        // RESULT
        // ==================================================

        results.innerHTML = `
            <h2>
                Checking:
            </h2>

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

                <p class="${
                    hasOutage
                        ? "outage"
                        : power.outage === false
                            ? "ok"
                            : ""
                }">
                    ${powerStatus}
                </p>


                ${outageDetails}


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
            <h2>
                Checking:
            </h2>

            <p>
                ${address}
            </p>


            <div class="company">

                <h3>
                    Power Status
                </h3>

                <p class="outage">
                    ❌ Unable to contact the outage service.
                </p>

                <p>
                    ${error.message}
                </p>

            </div>
        `;
    }
}



// ==========================================================
// FORMAT DATE / TIME
// ==========================================================

function formatDateTime(value) {

    try {

        const date =
            new Date(
                value
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return value;
        }


        return date.toLocaleString(
            "en-AU",
            {
                dateStyle:
                    "medium",

                timeStyle:
                    "short"
            }
        );


    } catch (error) {

        return value;
    }
}



// ==========================================================
// FORMAT AUSGRID STATUS
// ==========================================================

function formatPowerStatus(status) {

    if (!status) {

        return "";
    }


    const statusMap = {

        "InProgress":
            "In Progress",

        "ProceedingAsScheduled":
            "Proceeding As Scheduled",

        "Restored":
            "Restored",

        "Completed":
            "Completed"
    };


    return (
        statusMap[status] ||
        status
            .replace(
                /([a-z])([A-Z])/g,
                "$1 $2"
            )
    );
}
