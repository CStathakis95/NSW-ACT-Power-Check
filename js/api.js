async function getOutage(address) {

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

    let data;

    try {
        data = await response.json();
    } catch (error) {
        throw new Error(
            `Cloudflare returned HTTP ${response.status}`
        );
    }

    console.log(
        "Worker response:",
        data
    );

    if (!response.ok) {

        throw new Error(
            data.error ||
            `Cloudflare returned HTTP ${response.status}`
        );
    }

    return data;
}
