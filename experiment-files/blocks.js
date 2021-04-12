/*
This file contains the block structure used in the experiment.
*/


let block_learning = {
    timeline: [
        empty_slide,
        word_learning
    ],
    timeline_variables: TIMELINE_VARS.filter(x => x["learned"]),
    on_load: function() { EXP_PART = "learning_1" },
    randomize_order: true
}


let block_test = {
    timeline: [
        empty_slide,
        word_test,
        familiarity_slider
    ],
    timeline_variables: TIMELINE_VARS.filter(x => x["test"]),
    on_load: function() { EXP_PART = "test_1" },
}


console.log("blocks.js imported successfully.");