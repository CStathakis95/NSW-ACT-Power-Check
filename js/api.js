async function getOutage(address) {

```
try {

    const response = await fetch(
        `${CONFIG.API_URL}/check`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                address: address
            })
        }
    );


    // ----------------------------------------------
    // Check HTTP response
    // ----------------------------------------------

    if (!response.ok) {

        throw new Error(
            `Outage service returned HTTP ${response.status}`
        );

    }


    // ----------------------------------------------
    // Read JSON response
    // ----------------------------------------------

    const data =
        await response.json();


    console.log(
        "Cloudflare Worker response:",
        data
    );


    return data;


} catch (error) {

    console.error(
        "Unable to contact outage service:",
        error
    );


    return {

        success: false,

        address: address,

        distributor: {
            name: "Unavailable",
            status: "Service error"
        },

        power: {
            status:
                "Unable to contact outage service."
        },

        error:
            error.message

    };

}
```

}
