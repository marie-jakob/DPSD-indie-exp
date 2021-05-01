/*
This file contains the trials used in the experiment.
*/


let word_learning_strength = {
    type: 'html-keyboard-response',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; " +
            "margin-left: auto; margin-right: auto; text-align: right;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>";
    },
    choices: [KEYS.SKIP],
    trial_duration: DURATIONS.LEARN,
    on_finish: function(data) {
        write_data(data);
        data.trial_num = TRIAL_IDX;
        TRIAL_IDX++;
        if (TRIAL_IDX == N_STIMULI_LEARN * 2) TRIAL_IDX = 0;
    },
};

let empty_slide = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.EMPTY,
}


let word_learning_LOP = {
    type: 'survey-text',
    // !!! the standard preamble function is overwritten in the customized plugin
    // -> you have to specify the exact html string that is displayed as preamble
    preamble: function() {
        let LOP_tmp = jsPsych.timelineVariable("LOP");
        if (LOP_tmp == "deep") {
            return "<p style='font-size: 18px'>" + "Bitte geben Sie ein verwandtes Wort an." + "<br></p>";
        } else {
            return "<p style='font-size: 18px'>" + "Bitte geben Sie Anzahl Vokale des Wortes an." + "<br></p>";

        }

    },
    questions: [
        {prompt: function() {
            // same here -> just add the whole html string and not just the text
            let word = jsPsych.timelineVariable("word");
            return "<p style='font-size: 28px'>" + word + "</p>";
            }, rows: 1, columns: 20},
    ],
    button_label: "Weiter",
    required: true
};


let word_test = {
    type: 'categorize-html',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; text-align: center;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>";
    },
    choices: [KEYS.REMEMBER, KEYS.KNOW, KEYS.NEW, KEYS.SKIP],
    prompt: "<div class='Row'>" +
        "<div class='Column'>R: Remember</div>" +
        "<div class='Column'>K: Know</div>" +
        "<div class='Column'>N: New</div>" +
        "</div>",
    // we don't actually want to display feedback but we want the promt feature
    // from the categorize-html plugin, hence this weird stuff
    feedback_duration: 0.0000000001,
    show_stim_with_feedback: false,
    correct_text: "",
    incorrect_text: "",
    key_answer: false,
    on_finish: function(data) {
        write_data(data);
    }
};

let familiarity_slider = {
    type: 'html-slider-response',
    stimulus: function() {
        let word = jsPsych.timelineVariable("word");
        return "<p style='position: relative; text-align: center;" +
            "font-size: 28px; line-height: 1.5'>" +
            word + "</p>" +
            "<br>";
    },
    labels: ["extremely unfamiliar", "moderately unfamiliar",
        "moderately familiar", "extremely familiar"],
    min: 0,
    max: 1000,
    // set slider width dynamically, depending on the size of the browser window
    slider_start: 500,
    slider_width: function() {
        return window.innerWidth * 0.9;
    },
    prompt: "<br>" +
        "Please rate the familiarity of the word presented above." +
        "<br> <br>",
    on_finish: function(data) {
        write_data(data);
        TRIAL_IDX++;
    }
}


function gen_calc_task() {
    let html_str = '<p style="font-size: 28px">';
    let correct_result = 0;
    let random_op = " + ";
    // create a random series of addition and subtraction of 6 random integers
    for (let i = 0; i < 6; i++) {
        let random_num = Math.floor(Math.random() * 30 + 1);
        // also store the correct result to check if the participant answered correctly
        if (random_op == " + ") correct_result += random_num;
        else correct_result -= random_num;
        random_op = Math.random() < 0.7 ? " + " : " - ";
        html_str += String(random_num);
        if (i < 5) html_str += random_op;
    }
    console.log(correct_result);
    html_str += ' = ? </p>';
    // generate a jspsych trial with the task
    trial = {
        type: 'survey-text',
        questions: [
            {prompt: html_str,
                rows: 1,
                columns: 20,
            name: "calc"},
        ],
        button_label: "Weiter",
        required: true
    }
    // return a node with the trial and conditional repetition
    return {
        timeline: [trial],
        // repeat the trial if the participant answered incorrectly
        loop_function: function(data) {
            console.log(data.values()[0].response["calc"]);
            console.log(correct_result);
            let resp = data.values()[0].response["calc"];
            let response_correct = resp === String(correct_result);
            console.log(response_correct);
            if (DEV_MODE && resp === KEYS.SKIP) return false;
            else return ! response_correct;
        }
    }
}


let calc_block = {
    timeline: [
        gen_calc_task(),
        gen_calc_task(),
        gen_calc_task()
    ]
}


console.log("trials.js imported successfully.");