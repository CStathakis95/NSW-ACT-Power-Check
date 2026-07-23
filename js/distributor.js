function findDistributor(address) {

    console.log("Address received:", address);

    address = address.toLowerCase();

    console.log("Lowercase:", address);

    const endeavourAreas = [
        "penrith",
        "blackett",
        "st marys",
        "mount druitt",
        "doonside",
        "whalan",
        "plumpton",
        "rooty hill",
        "parramatta",
        "seven hills",
        "werrington",
        "kingswood",
        "cranebrook",
        "emu plains",
        "springwood",
        "wollongong"
    ];

    for (const area of endeavourAreas) {
        if (address.includes(area)) {
            console.log("Matched:", area);
            return "Endeavour Energy";
        }
    }

    console.log("No Endeavour match");

    return "Essential Energy";
}
