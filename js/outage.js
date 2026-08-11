// ======================================================
// OUTAGE ROUTER
// ======================================================

async function checkOutage(distributor, address) {

console.log(
    "Checking outage for:",
    distributor,
    address
);


// --------------------------------------------------
// Ausgrid
// --------------------------------------------------

if (distributor === "Ausgrid") {

    return await checkAusgrid(address);

}


// --------------------------------------------------
// Endeavour Energy
// --------------------------------------------------

if (
    distributor === "Endeavour Energy"
) {

    return await checkEndeavour(address);

}


// --------------------------------------------------
// Essential Energy
// --------------------------------------------------

if (
    distributor === "Essential Energy"
) {

    return await checkEssential(address);

}


// --------------------------------------------------
// Unknown distributor
// --------------------------------------------------

return {

    status:
        "Distributor not determined",

    details:
        "The electricity distributor has not yet been identified."

};

}

// ======================================================
// AUSGRID
// ======================================================

async function checkAusgrid(address) {

return {

    status:
        "Ausgrid outage lookup not connected",

    details:
        "Ausgrid live outage data will be connected here."

};

}

// ======================================================
// ENDEAVOUR ENERGY
// ======================================================

async function checkEndeavour(address) {

return {

    status:
        "Endeavour Energy outage lookup not connected",

    details:
        "Endeavour Energy live outage data will be connected here."

};

}

// ======================================================
// ESSENTIAL ENERGY
// ======================================================

async function checkEssential(address) {

return {

    status:
        "Essential Energy outage lookup not connected",

    details:
        "Essential Energy live outage data will be connected here."

};

}
