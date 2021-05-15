/*
Contains all JATOS-related operations and variables.
 */

console.warn("If the experiment is tested locally, the following command throws" +
    " a ReferenceError that can be ignored.")
/**
 * Sends the data stored by the jspsych module to JATOS
 * Called after every block of the experiment
 */
function send_data_to_JATOS() {
    data_tmp = jsPsych.data.get().json();
    jatos.submitResultData(data_tmp);
}

// add trial to the timeline to store data
let data_to_JATOS = {
    type: 'call-function',
    func: send_data_to_JATOS()
}

console.log("jatos-stuff.js imported successfully.");