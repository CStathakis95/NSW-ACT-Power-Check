async function getOutage(address) {

```
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


if (!response.ok) {

    throw new Error(
        `Cloudflare returned HTTP ${response.status}`
    );

}


const data =
    await response.json();


console.log(
    "Worker response:",
    data
);


return data;
```

}
