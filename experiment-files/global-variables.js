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
    REMEMBER: "a",
    KNOW: "b",
    NEW: "n",
    SKIP: "q"
};

// stimulus durations in ms
const DURATIONS = {
    LEARN: 2000,
    TEST: 1000,
    EMPTY: 500
}

// initialize variables to record browser interactions
let PAUSE = false; // is the experiment paused?
let N_BLUR = 0;

// number of stimuli in the different phases
const N_STIMULI_LEARN = 100;
const N_STIMULI_TEST = 200;  // usually 2 * N_STIMULI_LEARN
const N_BLOCKS_LEARN = 4;  // should divide N_STIMULI_LEARN
const N_BLOCKS_TEST = 4;  // should divide N_STIMULI_TEST
const N_STIM_BLOCK_LEARN = N_STIMULI_LEARN / N_BLOCKS_LEARN;
const N_STIM_BLOCK_TEST = N_STIMULI_TEST / N_BLOCKS_TEST;
let TRIAL_IDX = 0;
let EXP_PART;

// dev mode (very alpha^^)
// -> by pressing "q" (strength manipulation learning phase, test phase) or by typing "q"
// into the text box (LOP manipulation learning phase) remaining trials of a
// block can be skipped
let SKIP = false;
let DEV_MODE;


console.log("setup.js imported successfully.");