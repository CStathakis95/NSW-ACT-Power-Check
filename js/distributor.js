function findDistributor(address) {

    address = address.toLowerCase();


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


    const ausgridAreas = [
        "sydney",
        "newcastle",
        "central coast",
        "hornsby",
        "manly",
        "parramatta"
    ];


    for (const area of endeavourAreas) {
        if (address.includes(area)) {
            return "Endeavour Energy";
        }
    }


    for (const area of ausgridAreas) {
        if (address.includes(area)) {
            return "Ausgrid";
        }
    }


    return "Essential Energy";

}
