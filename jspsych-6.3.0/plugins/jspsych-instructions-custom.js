/* jspsych-instructions.js
 * Josh de Leeuw
 *
 * This plugin displays text (including HTML formatted strings) during the experiment.
 * Use it to show instructions, provide performance feedback, etc...
 *
 * Page numbers can be displayed to help with navigation by setting show_page_number
 * to true.
 *
 * documentation: docs.jspsych.org
 *
 *
 */

jsPsych.plugins.instructions = (function() {

  var plugin = {};

  plugin.info = {
    name: 'instructions',
    description: '',
    parameters: {
      pages: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Pages',
        default: undefined,
        array: true,
        description: 'Each element of the array is the content for a single page.'
      },
      key_forward: {
        type: jsPsych.plugins.parameterType.KEY,
        pretty_name: 'Key forward',
        default: 'ArrowRight',
        description: 'The key the subject can press in order to advance to the next page.'
      },
      key_backward: {
        type: jsPsych.plugins.parameterType.KEY,
        pretty_name: 'Key backward',
        default: 'ArrowLeft',
        description: 'The key that the subject can press to return to the previous page.'
      },
      allow_backward: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow backward',
        default: true,
        description: 'If true, the subject can return to the previous page of the instructions.'
      },
      allow_keys: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow keys',
        default: true,
        description: 'If true, the subject can use keyboard keys to navigate the pages.'
      },
      show_clickable_nav: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show clickable nav',
        default: false,
        description: 'If true, then a "Previous" and "Next" button will be displayed beneath the instructions.'
      },
      show_page_number: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Show page number',
          default: false,
          description: 'If true, and clickable navigation is enabled, then Page x/y will be shown between the nav buttons.'
      },
      page_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Page label',
        default: 'Page',
        description: 'The text that appears before x/y (current/total) pages displayed with show_page_number'
      },      
      button_label_previous: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label previous',
        default: 'Previous',
        description: 'The text that appears on the button to go backwards.'
      },
      button_label_next: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label next',
        default: 'Next',
        description: 'The text that appears on the button to go forwards.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    var current_page = 0;

    var view_history = [];

    var start_time = performance.now();

    var last_page_update_time = start_time;

    function btnListener(evt){
    	evt.target.removeEventListener('click', btnListener);
    	if(this.id === "jspsych-instructions-back"){
    		back();
    	}
    	else if(this.id === 'jspsych-instructions-next'){
    		next();
    	}
    }

    function show_current_page() {
      var html = trial.pages[current_page];

      var pagenum_display = "";
      if(trial.show_page_number) {
          pagenum_display = "<span style='margin: 0 1em;' class='"+
          "jspsych-instructions-pagenum'>"+ trial.page_label + ' ' +(current_page+1)+"/"+trial.pages.length+"</span>";
      }
     
      if (trial.show_clickable_nav) {

        var nav_html = "<div class='jspsych-instructions-nav' style='padding: 10px 0px;'>";
        if (trial.allow_backward) {
          var allowed = (current_page > 0 )? '' : "disabled='disabled'";
          nav_html += "<button id='jspsych-instructions-back' class='jspsych-btn' "+allowed+">"+trial.button_label_previous+"</button>";
        }
        if (trial.pages.length > 1 && trial.show_page_number) {
            nav_html += pagenum_display;
        }
        nav_html += "<button id='jspsych-instructions-next' class='jspsych-btn'>" +trial.button_label_next+
            "</button></div>";

        html += nav_html;
        display_element.innerHTML = html;
        if (current_page != 0 && trial.allow_backward) {
          display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
        }

        display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);
      } else {
        if (trial.show_page_number && trial.pages.length > 1) {
          // page numbers for non-mouse navigation
          html += "<div class='jspsych-instructions-pagenum'>"+pagenum_display+"</div>"
        } 
        display_element.innerHTML = html;
      }

      // I am deeply ashamed of this part..

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
          // value = Math.max(Math.min(parseInt(value) + change, maximum), minimum);
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
      }

      // handle arrow key events and move the slider accordingly
      let slider = document.querySelector('.slider-container');
      if (slider != null) {
        slider.focus();
        init_slider(slider.id);
        slider.addEventListener('keydown', function (event) {
          handle_keydown_slider(event);
        });
      }
      // Done

    }
    function next() {

      add_current_page_to_view_history()

      current_page++;

      // if done, finish up...
      if (current_page >= trial.pages.length) {
        endTrial();
      } else {
        show_current_page();
      }

    }

    function back() {

      add_current_page_to_view_history()

      current_page--;

      show_current_page();
    }

    function add_current_page_to_view_history() {

      var current_time = performance.now();

      var page_view_time = current_time - last_page_update_time;

      view_history.push({
        page_index: current_page,
        viewing_time: page_view_time
      });

      last_page_update_time = current_time;
    }

    function endTrial() {

      if (trial.allow_keys) {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);
      }

      display_element.innerHTML = '';

      var trial_data = {
        view_history: view_history,
        rt: performance.now() - start_time
      };

      jsPsych.finishTrial(trial_data);
    }

    var after_response = function(info) {

      // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
      keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
      // check if key is forwards or backwards and update page
      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_backward)) {
        if (current_page !== 0 && trial.allow_backward) {
          back();
        }
      }

      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
        next();
      }

    };

    show_current_page();

    if (trial.allow_keys) {
      var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward],
        rt_method: 'performance',
        persist: false
      });
    }
  };

  return plugin;
})();
