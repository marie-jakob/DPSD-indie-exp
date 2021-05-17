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
        if (last_event["event"] === "blur") {
            N_BLUR++;
            console.log("N_blur: ", N_BLUR);
        }
        if (N_BLUR > 3) {
            console.log("exiting the experiment");
            jsPsych.data.addProperties({status: "Aborted-left-window"});
            END_TYPE = "left-window";
            jsPsych.endExperiment();
            //jsPsych.endExperiment('<p><strong>End</strong></p>' +
            //    'Leider haben Sie das Browser Fenster/ den Tab mehr als drei Mal verlassen.' +
            //    'Daher endet das Experiment an dieser Stelle. Sie können dieses Fenster nun schließen.');
        }
    }
}


// Gets keyboard-focusable elements within a specified element
// Source: https://zellwk.com/blog/keyboard-focusable-elements/
function getKeyboardFocusableElements (element = document) {
    console.log("Hello, it's me.");
    return [...element.querySelectorAll(
        'a, button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.hasAttribute('disabled'));
};


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
 * @param LOP (bool) -> LOP manipulation (if false, strength manipulation)
 * @returns array of objects with the attributes above
 */
function gen_timeline_variables(word_list, LOP) {
    word_list = word_list.slice(0, N_STIMULI_TEST);
    for (let i = 0; i < N_STIMULI_TEST; i++) {
        // use the test attribute to filter the stimuli for the test phase
        word_list[i]["test"] = true;
        if (i < N_STIMULI_LEARN) {
            word_list[i]["learned"] = true;
            // add experimental condition, depending on the manipulation
            if (LOP) word_list[i]["LOP"] = i < N_STIMULI_LEARN && i % 2 == 0? "deep" : "shallow";
            else word_list[i]["strength"] = i < N_STIMULI_LEARN && i % 2 == 0? "strong" : "weak";
        } else {
            word_list[i]["learned"] = false;
        }
        // add the strong words two more times to the stimulus list (only applies
        // for the strength
        if (!LOP && word_list[i]["strength"] == "strong") {
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


/**
 * Saves relevant data from the timeline variables to the jspsych data.
 * Called from the on_finish parameter of every "relevant" trial
 * (i.e., after the presentation of a word, not after an empty slide etc.)
 * @param data jsPsych.data, as given by the on_finish function
 */
function write_data(data) {
    data.trial_num = TRIAL_IDX;
    data.exp_part = EXP_PART;
    data.trial_part = TRIAL_PART;
    // no "correct" responses in a narrow sense
    data.correct = "";
    let attributes = Object.keys(TIMELINE_VARS.filter(x => x["learned"])[0]);
    let last_trial = jsPsych.data.getLastTrialData();
    // use all trials with types in specified in use_types
    let last_trial_type = JSON.parse(last_trial.json())[0]["trial_type"];
    if (last_trial_type != "instructions") {
        for (attribute of attributes) {
            data[attribute] = jsPsych.timelineVariable(attribute);
        }
    }
}


/**
 * Checks if the user pressed KEYS.SKIP -> sets SKIP accordingly and skips
 * the remaining trials of the blocks, if this is the case
 * @param LOP (bool) if the function is called from an LOP trial
 * @param learn (bool) if the function is called from the learning phase
 * @returns {boolean} if the trial continues
 */
function check_skip(LOP, learn) {
    // only enable skipping if dev-mode is on!
    if (! DEV_MODE) return true;
    let data_tmp = jsPsych.data.get().values();

    // index to get the last trial data from -> the last element for learn
    // trials, the one before for test trials (from the R-K task, not the slider)
    let data_idx_tmp = learn ? data_tmp.length - 1 : data_tmp.length - 2;
    if (data_idx_tmp > 0) {
        // get the last response (depending on phase + manipulation) and check
        // if remaining trials should be skipped
        let trial_data_tmp = data_tmp[data_idx_tmp]["response"];
        let resp_tmp = LOP && learn ? trial_data_tmp["Q0"] : trial_data_tmp;
        if (resp_tmp === KEYS.SKIP) SKIP = true;
    } else { SKIP = false; }  // reset the variable in the new block
    return ! SKIP;
}


/**
 * Generates a single block for the learning phase of the experiment. Uses
 * TIMELINE_VARS (filtered) and slices according to the block_num and total number
 * of learning stimuli
 * @param block_num block number (starting at 1)
 * @param LOP (bool) if the block is for the LOP condition or the strength condition (false)
 * @returns a learning block of the experiment, according to the LOP Or strength condition
 */
function gen_learning_block(block_num, LOP) {
    // slice timeline variables according to the block
    // let multi_tmp = LOP ? 1 : 2;
    let start_idx_tmp = (N_STIM_BLOCK_LEARN * block_num - N_STIM_BLOCK_LEARN);
    let end_idx_tmp = N_STIM_BLOCK_LEARN * block_num;

    let timeline_tmp = {
        timeline: [],
        conditional_function(data) {
            return check_skip(LOP = LOP, learn = true);
        }
    }
    if (LOP) timeline_tmp["timeline"] = [empty_slide, response_prompt, word_learning_LOP, resp_learning_LOP];
    else timeline_tmp["timeline"] = [empty_slide, word_learning_strength];
    return {
        timeline: [timeline_tmp],
        timeline_variables: TIMELINE_VARS.filter(x => x["learned"]).slice(start_idx_tmp, end_idx_tmp),
        on_load: function() { EXP_PART = "learning"},
        data: { block_num: block_num },
        randomize_order: true,
        on_timeline_start: function () {
            PAUSE = false;
            SKIP = false;
        }
    }
}


/**
 * Generates a single block for the test phase of the experiment. Uses
 * TIMELINE_VARS (filtered) and slices according to the block_num and total number
 * of test stimuli
 * @param block_num block number (starting at 1)
 * @returns a test block of the experiment
 */
function gen_test_block(block_num) {
    let start_idx_tmp = N_STIM_BLOCK_TEST  * block_num - N_STIM_BLOCK_TEST;
    let end_idx_tmp = N_STIM_BLOCK_TEST  * block_num;

    let timeline_tmp = {
        timeline: [
            empty_slide,
            word_test,
            familiarity_slider
        ],
        conditional_function(data) {
            return check_skip(LOP = LOP, learn = false);
        }
    }
    return {
        timeline: [timeline_tmp],
        timeline_variables: TIMELINE_VARS.filter(x => x["test"]).slice(start_idx_tmp, end_idx_tmp),
        on_load: function() { EXP_PART = "test" },
        data: { block_num: block_num},
        randomize_order: true,
        on_timeline_start: function () {
            PAUSE = false;
            SKIP = false;
        }
    }
}

console.log("functions.js imported successfully.");