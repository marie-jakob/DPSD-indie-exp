/*
This file contains the trials used in the experiment.
*/


let word_learning = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable("word"),
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.LEARN,
};

let empty_slide = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.EMPTY,
}

let word_test = {
    type: 'categorize-html',
    stimulus: jsPsych.timelineVariable("word"),
    choices: [KEYS.REMEMBER, KEYS.KNOW, KEYS.NEW],
    prompt: function() {
        return "<p style='position: absolute; " +
            "margin-left: auto; margin-right: auto; align=center;" +
            "top: 70%; left: 25%; align=center;" +
            "font-size: 28px; line-height: 1.5'>" +
            "Remember: R" +
            "<p style='position: absolute;" +
            "margin-left: auto; margin-right: auto; align=center;" +
            "top: 70%; left: 50%; " +
            "font-size: 28px; line-height: 1.5'>" +
            "Know: K" +
            "<p style='position: absolute;" +
            "margin-left: auto; margin-right: auto;"  +
            "top: 70%; right: 75%;" +
            "font-size: 28px; line-height: 1.5'>" +
            "New: N";
    },
    // we don't actually want to display feedback but we want the promt feature
    // from the categorize-html plugin, hence this weird stuff
    feedback_duration: 0.0000000001,
    show_stim_with_feedback: false,
    correct_text: "",
    incorrect_text: "",
    key_answer: false
};


console.log("trials.js imported successfully.");