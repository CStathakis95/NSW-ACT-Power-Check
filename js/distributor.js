/*
 * Distributor identification
 *
 * This module will eventually determine whether an address
 * is supplied by:
 *
 * - Ausgrid
 * - Endeavour Energy
 * - Essential Energy
 *
 * We are deliberately NOT using suburb-name guessing here.
 */

function findDistributor(address) {

    console.log(
        "Distributor lookup requested for:",
        address
    );

    return {
        name: "Not yet determined",
        status: "Distributor boundary lookup not connected"
    };
}
