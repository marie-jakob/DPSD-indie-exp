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
    on_start: function() {
        TRIAL_PART = "word";
    },
    choices: [KEYS.SKIP],
    trial_duration: DURATIONS.LEARN,
    on_finish: function() {
        TRIAL_IDX++;
        TRIAL_PART = "";
        // if (TRIAL_IDX == N_STIMULI_LEARN * 2) TRIAL_IDX = 0;
    },
    response_ends_trial: false,
};

let empty_slide = {
    type: 'html-keyboard-response',
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.EMPTY,
    on_start: function() {
        TRIAL_PART = "empty";
    }
}

/* #####################################################################
                LOP
    ##################################################################### */

let response_prompt = {
    type: 'html-keyboard-response',
    stimulus: function() {
        let LOP_tmp = jsPsych.timelineVariable("LOP");
        if (LOP_tmp == "deep") {
            return "<p class='deep-prompt'>" + "Geben Sie ein assoziiertes Wort ein." + "<br></p>";
        } else {
            return "<p class='shallow-prompt'>" + "Geben Sie Anzahl Vokale ein." + "<br></p>";
        }
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.PROMPT,
    on_start: function() {
        TRIAL_PART = "resp_prompt";
    },
}

let word_learning_LOP = {
    type: 'html-keyboard-response',
    stimulus: function() {
        // same here -> just add the whole html string and not just the text
        let LOP_tmp = jsPsych.timelineVariable("LOP");
        let word_html; let prompt;
        if (LOP_tmp == "deep")  word_html = '<p class="deep-word">' + jsPsych.timelineVariable("word") + '</p>';
        else word_html = '<p class="shallow-word">' + jsPsych.timelineVariable("word"); + '</p>';

        if (LOP_tmp == "deep") {
            prompt = "<p class='deep-prompt'>" + "Geben Sie ein assoziiertes Wort ein." + "<br></p>";
        } else {
            prompt = "<p class='shallow-prompt'>" + "Geben Sie die Anzahl Vokale ein." + "<br></p>";
        }
        return prompt + word_html;
    },
    choices: jsPsych.NO_KEYS,
    trial_duration: DURATIONS.LEARN,
    on_start: function() {
        TRIAL_PART = "word";
    },
}

let resp_learning_LOP = {
    type: 'survey-text',
    // !!! the standard preamble function is overwritten in the customized plugin
    // -> you have to specify the exact html string that is displayed as preamble
    preamble: function() {
        let LOP_tmp = jsPsych.timelineVariable("LOP");
        if (LOP_tmp == "deep") {
            return "<p class='deep-prompt'>" + "Geben Sie ein assoziiertes Wort ein." + "<br></p>";
        } else {
            return "<p class='shallow-prompt'>" + "Geben Sie die Anzahl Vokale ein." + "<br></p>";
        }
    },
    questions: [
        {
            prompt: "",
            rows: 1,
            columns: 20,
            type: "text",
            pattern: function() {
                let type = jsPsych.timelineVariable("LOP") == "deep" ? "[^0-9]+" : "^[0-9q]+$";
                return type;
            },
            invalid_message: function() {
                if (jsPsych.timelineVariable("LOP") == "deep") {
                    return "Bitte geben Sie nur Buchstaben ein.";
                } else {
                    return "Bitte geben Sie nur Zahlen ein.";
                }
            },
            required: false
        },
    ],
    button_label: "Weiter",
    required: true,
    on_start: function() {
        TRIAL_PART = "response";
    },
    on_finish: function(data) {
        // data only contains the data of the last trial
        // catch case where no response was saved because the participant left
        // the window too many times
        if (data.hasOwnProperty("response")) {
            let resp = data["response"]["Q0"];
            if (resp == "") {
                N_EMPTY++;
                console.log("N_empty: ", N_EMPTY);
            }
            if (N_EMPTY > MAX_EMPTY) {
                let end_message = "Leider haben Sie mehr als " + MAX_EMPTY + " leere Eingaben produziert. <br>" +
                    "Wie angekündigt, endet daher das Experiment an dieser Stelle. Sie können dieses Fenster nun schließen."
                jsPsych.endExperiment(end_message);
            }
        }
        TRIAL_IDX++;
    }
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
        "<div class='Column'>A: Typ A Erinnerung</div>" +
        "<div class='Column'>B: Typ B Erinnerung</div>" +
        "<div class='Column'>N: Neues Wort</div>" +
        "</div>",
    // we don't actually want to display feedback but we want the promt feature
    // from the categorize-html plugin, hence this weird stuff
    feedback_duration: 0.0000000001,
    show_stim_with_feedback: false,
    correct_text: "",
    incorrect_text: "",
    key_answer: "",
    on_start: function() {
        TRIAL_PART = "R-K-N";
        TRIAL_IDX++
    },
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
    labels: ["extrem <strong>un</strong>vertraut", "relativ <strong>un</strong>vertraut",
        "relativ vertraut", "extrem vertraut"],
    min: 0,
    max: 1000,
    button_label: "Weiter",
    // set slider width dynamically, depending on the size of the browser window
    slider_start: 50,
    //slider_width: function() {
    //    return window.innerWidth * 0.6;
    //    return window.innerWidth * 0.6;
    //},
    prompt: "<br>" +
        "Bitte geben Sie an, wie vertraut Ihnen das Wort ist. " +
        "Bewegen Sie dazu den Schieberegler mit den Pfeiltasten." +
        "<br> <br>",
    require_movement: true,
    on_start: function() {
        TRIAL_PART = "rating";
    },
}


function gen_calc_task() {
    // create a random series of addition and subtraction of 6 random integers
    let correct_result;
    let html_str;
    while (true) {
        correct_result = 0;
        html_str = '<p style="font-size: 28px">';
        let random_op = " + ";
        for (let i = 0; i < 6; i++) {
            let random_num = Math.floor(Math.random() * 30 + 1);
            // also store the correct result to check if the participant answered correctly
            if (random_op == " + ") correct_result += random_num;
            else correct_result -= random_num;
            if (correct_result < 0) break;
            random_op = Math.random() < 0.5 ? " + " : " - ";
            html_str += String(random_num);
            if (i < 5) html_str += random_op;
        }
        // ensure that the tasks aren't too complicated^
        if (correct_result > 0 && correct_result < 50) break;
    }
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
            let resp = data.values()[0].response["calc"];
            let response_correct = resp === String(correct_result);
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
    ],
    on_start: function() {
        EXP_PART = "calculations";
        PAUSE = false;
    }
}


console.log("trials.js imported successfully.");