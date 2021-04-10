/*
Dummy instructions.
 */

let welcome = {
    type: 'instructions',
    pages: [
        'Welcome! Click next to begin.',
        'This is an additional instruction page to see if the navigation works. '
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}


let instruction_learn_1 = {
    type: 'instructions',
    pages: [
        'Next: Learning Phase 1'
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}

let instruction_test_1 = {
    type: 'instructions',
    pages: [
        'Next: Test Phase 1'
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}

let instruction_learn_2 = {
    type: 'instructions',
    pages: [
        'Next: Learning Phase 2.'
    ],
    show_clickable_nav: true,

    on_start: function() {
        randomize_phase_2();
        EXP_PART = "instr";
    }
}

let instruction_test_2 = {
    type: 'instructions',
    pages: [
        'Next: Test Phase 2.'
    ],
    show_clickable_nav: true,
    on_load: function() { EXP_PART = "instr"; }
}