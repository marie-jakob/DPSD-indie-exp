/*
This file contains all functions used in the experiment.

Author:     Marie Jakob <marie.a.jakob@gmail.com>
*/


/* #########################################################################
           General Stuff
    ######################################################################### */

/**
 * Randomly shuffles an array in-place using Knuth's algorithm
 * (an optimized version of the Fisher-Yates shuffle, see
 * https://en.wikipedia.org/wiki/Fisher–Yates_shuffle and
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array} arr The array to shuffle
 * Returns:
 *      Nothing, randomizes in-place
 * */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let idx = Math.floor(Math.random() * (i + 1));
        let current = arr[i];
        arr[i] = arr[idx];
        arr[idx] = current;
    }
}


/**
 * Controls browser interactions and quits when the participant exits the
 * window more than two times outside a break or instruction slide
 * Called from on_interaction_data_update in index.html
 */
function control_browser_interactions() {
    let get_interactions = jsPsych.data.getInteractionData();
    let interaction_data = JSON.parse(get_interactions.json());
    let last_event = interaction_data[interaction_data.length - 1];
    if (! PAUSE) {
        if (last_event["event"] === "blur") n_blur++;
        if (N_BLUR > 2) {
            consent = false;
            console.log("exiting the experiment");
            jsPsych.endExperiment('<p><strong>End</strong></p>' +
                'Unfortunately, you have left the tab/ browser windows more than two times. ' +
                'As told you in the beginning of the experiment, we therefore have to end this experiment prematurely and we cannot grant you any credit.');
        }
    }
}


/**
 * Enables download of the experimental data in piloting mode
 * from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};


/**
 * Checks what browser the client is using and throws an error message when
 * it's IE or and old version of Edge
 * Author: Florian Gouret
 */
function check_browser() {
    console.log("Checking Browser");
    window.addEventListener("load", function() {
        if (navigator.userAgent.indexOf("MSIE") != -1 ) {
            alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt." +
                "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
                "This version of Internet explorer does not support this experiment. Please update it or use another browser.")
            window.location = "https://www.microsoft.com/en-us/edge";
        }
        else if (navigator.userAgent.indexOf("Edge") != -1 ) {
            alert("Diese Version von Internet Explorer wird von diesem Experiment nicht unterstützt."+
                "Bitte updaten Sie Ihren Browser oder verwenden Sie einen anderen. <br>"+
                "This version of Edge does not support this experiment. Please update it or use another browser.")
            window.location = "https://www.microsoft.com/en-us/edge";
        }
    });
}



/* #########################################################################
           Specialised Functions for the Experiment
    ######################################################################### */

/**
 * Takes a list of stimuli (words) and generates a list of experimental trials
 * (timeline variables) with attributes:
 *      "word": the word presented
 *      "learned" (bool): if the word is presented in the learning phase
 *      "test" (bool): if the word is presented in the test phase
 *      "strength": strength condition - so far, "weak" words are presented once,
 *          "strong" words are presented three times
 *      "correct_resp": contains the respective correct response for the trial
 * @param word_list list of objects with "word" attribute
 * @returns list of objects with the attributes above
 */
function gen_timeline_variables(word_list) {
    word_list = word_list.slice(0, N_STIMULI_TEST);
    for (let i = 0; i < N_STIMULI_TEST; i++) {
        // use the test attribute to filter the stimuli for the test phase
        word_list[i]["test"] = true;
        if (i < N_STIMULI_LEARN) {
            word_list[i]["learned"] = true;
            word_list[i]["strength"] = i < N_STIMULI_LEARN && i % 2 == 0? "strong" : "weak";
        } else {
            word_list[i]["learned"] = false;
        }
        // add 2 repetitions of the word if it's in the strong condition
        if (word_list[i]["strength"] == "strong") {
            word_list[i]["test"] = true;
            for (j = 0; j < 2; j++) {
                word_list.push({
                    "word": word_list[i]["word"],
                    // set test parameter to false to avoid repetitions in the test
                    "test": false,
                    "learned": true,
                    "strength": "strong",
                });
            }
        }
    }
    shuffle(word_list);
    return word_list;
}


function write_data(data) {
    return;
}


console.log("functions.js imported successfully.");