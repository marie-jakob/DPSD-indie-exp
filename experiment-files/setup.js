/*
This file 
    - declares and initialized constants, basic variables
    - prepares the datastructure containing the images presented in the experiment
    - runs the participant set-up
 */

// response keys
const KEYS = {
    CONTINUE: "space", 
    BACK: "z",
    REMEMBER: "r",
    KNOW: "k",
    NEW: "n"
};

// stimulus durations in ms
const DURATIONS = {
    LEARN: 500,
    TEST: 1000,
    EMPTY: 500
}

// initialize variables to record browser interactions
let PAUSE = false; // is the experiment paused?
let N_BLUR = 0;

// number of stimuli in the different phases
const N_STIMULI_LEARN = 4
const N_STIMULI_TEST = 8  // usually 2 * N_STIMULI_LEARN
let TRIAL_IDX = 0;
let EXP_PART;

const ID = jsPsych.randomization.randomID(15);
console.log("ID: ", ID);

// contains timeline variables for the learning and the test phase
// -> filter for the learning phase: "learned"
// -> filter for the test phase: "test"
let TIMELINE_VARS = gen_timeline_variables(STIMULI);
console.log(TIMELINE_VARS);


console.log("setup.js imported successfully.");