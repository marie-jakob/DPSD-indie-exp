/*
This file contains the block structure used in the experiment.
*/

// block_num starting from 1
function gen_learning_block(block_num, LOP) {
    // slice timeline variables according to the block
    let multi_tmp = LOP ? 1 : 2;
    let start_idx_tmp = N_STIM_BLOCK_LEARN  * block_num - N_STIM_BLOCK_LEARN;
    let end_idx_tmp = N_STIM_BLOCK_LEARN  * block_num;
    // determine which trial to display
    let timeline_tmp = LOP ? [word_learning_LOP] : [word_learning_strength, empty_slide];
    return {
        timeline: timeline_tmp,
        timeline_variables: TIMELINE_VARS.filter(x => x["learned"]).slice(start_idx_tmp, end_idx_tmp),
        on_load: function() { EXP_PART = "learning_1"},
        data: { block_num: block_num },
        randomize_order: true
    }
}

// TODO: maybe move this to the respective index file...
block_learning_strength_1 = gen_learning_block(1, false);
block_learning_strength_2 = gen_learning_block(2, false);
block_learning_strength_3 = gen_learning_block(3, false);
block_learning_strength_4 = gen_learning_block(4, false);

block_learning_LOP_1 = gen_learning_block(1, true);
block_learning_LOP_2 = gen_learning_block(2, true);
block_learning_LOP_3 = gen_learning_block(3, true);
block_learning_LOP_4 = gen_learning_block(4, true);

console.log("block learning: ", block_learning_LOP_1);

function gen_test_block(block_num) {
    let start_idx_tmp = N_STIM_BLOCK_TEST  * block_num - N_STIM_BLOCK_TEST;
    let end_idx_tmp = N_STIM_BLOCK_TEST  * block_num;
    let block_test = {
        timeline: [
            empty_slide,
            word_test,
            familiarity_slider
        ],
        timeline_variables: TIMELINE_VARS.filter(x => x["test"]),
        on_load: function() { EXP_PART = "test_1" },
    }
}

block_test_1 = gen_test_block(1);
block_test_1 = gen_test_block(2);
block_test_1 = gen_test_block(3);
block_test_1 = gen_test_block(4);


console.log("blocks.js imported successfully.");