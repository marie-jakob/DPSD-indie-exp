/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-scale-response'] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'html-slider-response',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The HTML string to be displayed'
            },
            min: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Min slider',
                default: 0,
                description: 'Sets the minimum value of the slider.'
            },
            max: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Max slider',
                default: 100,
                description: 'Sets the maximum value of the slider',
            },
            slider_start: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Slider starting value',
                default: 50,
                description: 'Sets the starting value of the slider',
            },
            step: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Step',
                default: 1,
                description: 'Sets the step of the slider'
            },
            labels: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name:'Labels',
                default: [],
                array: true,
                description: 'Labels of the slider.',
            },
            slider_width: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name:'Slider width',
                default: null,
                description: 'Width of the slider in pixels.'
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button label',
                default:  'Continue',
                array: false,
                description: 'Label of the button to advance.'
            },
            require_movement: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'Require movement',
                default: false,
                description: 'If true, the participant will have to move the slider before continuing.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: null,
                description: 'Any content here will be displayed below the slider.'
            },
        }
    }

    plugin.trial = function(display_element, trial) {
        console.log('<div class="slider-container" id="my-slider" tabindex="0" data-max="' +
            trial.max + '" data-min="' + trial.min + '" data-init=">' + trial.slider_start + '">' +
            '    <div class="slider-text"></div>')
        var html = '<div id="jspsych-html-slider-response-stimulus">' + trial.stimulus + '</div>';
        html += '<div class="slider-container" id="my-slider" tabindex="0" data-max="' +
            trial.max + '" data-min="' + trial.min + '" data-init="' + trial.slider_start + '">' +
            '    <div class="slider-text"></div>\n' +
            '    <div class="slider-bar">' +
            '      <div class="slider-pointer"></div>' +
            '      <div class="slider-scale-container" style="left 0;">' +
            '        <div class="slider-scale"></div>' +
            '           <div class="slider-ticks">' +
            '          <!-- One div less than the number of labels -->' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '           <div></div>' +
            '          </div>' +
            '        <div class="slider-labels">' +
            '            <div class="slider-label--4 slider-label-neg">'+ trial.labels[0] + '</div>' +
            '            <div class="slider-label--3 slider-label-neg">'+ trial.labels[1] + '</div>' +
            '            <div class="slider-label--2 slider-label-neg">'+ trial.labels[2] + '</div>' +
            '            <div class="slider-label--1 slider-label-neg">'+ trial.labels[3] + '</div>' +
            '            <div class="slider-label-0">'+ trial.labels[4] + '</div>' +
            '            <div class="slider-label-1 slider-label-pos">'+ trial.labels[5] + '</div>' +
            '            <div class="slider-label-2 slider-label-pos">'+ trial.labels[6] + '</div>' +
            '            <div class="slider-label-3 slider-label-pos">'+ trial.labels[7] + '</div>' +
            '            <div class="slider-label-4 slider-label-pos">'+ trial.labels[8] + '</div>' +
            '          </div>' +
            '      </div>' +
            '    </div>' +
            '  </div>'

        if (trial.prompt !== null){
            html += trial.prompt;
        }

        // add submit button
        html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn" '+ (trial.require_movement ? "disabled" : "") + '>'+trial.button_label+'</button>';

        display_element.innerHTML = html;

        var response = {
            rt: null,
            response: null
        };


        function init_slider(id) {
            var slider = document.getElementById(id);
            var width = parseInt(slider.dataset.width);
            var minimum = parseInt(slider.dataset.min);
            var maximum = parseInt(slider.dataset.max);
            if (Math.abs(maximum) !== Math.abs(minimum)) {
                console.log('WARNING: Minimum and maximum need to have the same absolute value for this to work properly!');
            }
            // Set the width scaling for the slider bar
            if (typeof width !== 'undefined') {
                var slider_bar = document.querySelector('#' + id + ' .slider-bar');
                slider_bar.style.width = width.toString() + '%';
                // Calculate how much will not be visible on each side
                slider_bar.style.left = (-(width - 100) * 0.5).toString() + '%';
            }
            // Calculate the correct width and left position for the labels
            var all_slider_labels = document.querySelectorAll('#' + id + ' .slider-labels > div');
            var slider_labels = document.querySelector('#' + id + ' .slider-labels');
            var labels_total_width = 100 / (all_slider_labels.length - 1) * all_slider_labels.length;
            slider_labels.style.width = labels_total_width.toString() + '%';
            slider_labels.style.left = (-(labels_total_width - 100) / 2).toString() + '%';
        }


        // function that handles keydown events for the slider and adapts the
        // handle according to the key pressed
        function set_slider(id, change) {
            var slider = document.getElementById(id);
            // Get minimum, maximum and the current value
            var value = slider.dataset.value;
            var minimum = parseInt(slider.dataset.min);
            var maximum = parseInt(slider.dataset.max);
            var initial = parseInt(slider.dataset.init);
            // Set or change the value
            if ((typeof value === 'undefined') || (typeof change === 'undefined')) {
                value = parseInt(slider.dataset.init);
            }
            else {
                //value = Math.max(Math.min(parseInt(value) + change, maximum), minimum);
                value = parseInt(value) + change;
            }
            // Set the new value
            slider.dataset.value = value;
            console.log('Value:', value)
            // Move the slider bar
            var slider_scale_container = document.querySelector('#' + id + ' .slider-scale-container');

            var position_change = Math.abs(value) * (slider_scale_container.offsetWidth / (Math.abs(maximum) + Math.abs(minimum)));
            slider_scale_container.style.left = ((value < initial ? 1 : -1) * position_change).toString() + 'px';
        };

        function handle_keydown_slider(event) {
            // Get the id from the current element
            var id = event.target.id;
            console.log("ID:", id);
            var key = event.keyCode ? event.keyCode : event.which;
            // Left arrow
            if (key === 37) {
                set_slider(id, -1);
            }
            // Right arrow
            else if (key === 39) {
                set_slider(id, 1);
            }
        };
        // get the slider
        let slider = display_element.querySelector('.slider-container');
        slider.focus();
        init_slider(slider.id);
        // handle arrow key events and move the slider accordingly
        slider.addEventListener('keydown', function (event) {
            handle_keydown_slider(event);
            let key = event.keyCode ? event.keyCode : event.which;
            if (key === 37 || key === 39) {
                display_element.querySelector('#jspsych-html-slider-response-next').disabled = false;
            }
        });
        display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
            // measure response time
            var endTime = performance.now();
            response.rt = endTime - startTime;
            //response.response = display_element.querySelector('#jspsych-html-slider-response-response').valueAsNumber;
            let slider = document.getElementById('my-slider');
            let value = slider.dataset.value;
            console.log(value);
            response.response = value;
            end_trial();
        });

        function end_trial(){

            jsPsych.pluginAPI.clearAllTimeouts();

            // save data
            var trialdata = {
                rt: response.rt,
                stimulus: trial.stimulus,
                slider_start: trial.slider_start,
                response: response.response
            };

            display_element.innerHTML = '';

            // next trial
            jsPsych.finishTrial(trialdata);
        }


        var startTime = performance.now();
    };

    return plugin;
})();
