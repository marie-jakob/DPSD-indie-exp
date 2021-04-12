/*
Dummy instructions.
 */

let welcome = {
    type: 'instructions',
    pages: [
        'Welcome! Click next to begin.',
        'This is an additional instruction page to see if the navigation works.'
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}


let instruction_learn = {
    type: 'instructions',
    pages: [
        'Next: Learning Phase. <br> <br> ' +
        'Half of the words are presented once ("weak" words), ' +
        'half are presented three times ("strong" words) <br>'
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}

let instruction_test = {
    type: 'instructions',
    pages: [
        'Next: Test Phase (R-K-N task), containing an additional familiarity' +
            'rating on a pseudo-continuous scale. <br>'
    ],
    show_clickable_nav: true,
    on_start: function() { EXP_PART = "instr"; }
}

console.log("instructions.js imported successfully.")