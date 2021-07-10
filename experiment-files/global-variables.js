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
    EMPTY: 500,
    LEARN: 2000,
    PROMPT: 1000,
}

// initialize variables to record browser interactions
let PAUSE = false; // is the experiment paused?
let N_BLUR = 0;

// codes the number of empty inputs in the LOP condition
// --> experiment ends on > MAX_EMPTY empty inputs
let N_EMPTY = 0;
let MAX_EMPTY = 5;

// number of stimuli in the different phases
const N_STIMULI_LEARN = 100;
const N_STIMULI_TEST = 200;  // usually 2 * N_STIMULI_LEARN
const N_BLOCKS_LEARN = 4;  // should divide N_STIMULI_LEARN
const N_BLOCKS_TEST = 4;  // should divide N_STIMULI_TEST
const N_STIM_BLOCK_LEARN = N_STIMULI_LEARN / N_BLOCKS_LEARN;
const N_STIM_BLOCK_TEST = N_STIMULI_TEST / N_BLOCKS_TEST;

// init variables for the stored data
let TRIAL_IDX = 0;
let EXP_PART;
let TRIAL_PART;


let LABELS = ["extrem <strong>un</strong>vertraut",
    "sehr <strong>un</strong>vertraut",
    "relativ <strong>un</strong>vertraut",
    "eher <strong>un</strong>vertraut",
    "weder vertraut noch unvertraut",
    "eher vertraut",
    "relativ vertraut",
    "sehr vertraut",
    "extrem vertraut"];

// init variables containing how the experiment ended -> used to redirect from JATOS
// "left-window": experiment ended because the participant left the window too often
// "empty-inputs": experiment ended because the participant produced too many empty inputs (LOP)
let END_TYPE = "";

// dev mode (very alpha^^)
// -> by pressing "q" (strength manipulation learning phase, test phase) or by typing "q"
// into the text box (LOP manipulation learning phase) remaining trials of a
// block can be skipped
let SKIP = false;
let DEV_MODE;

let focusableElements;

console.log("global-variables.js imported successfully.");