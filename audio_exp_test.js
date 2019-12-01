/* ************************************ */
/* Define helper functions */
/* ************************************ */

function levenshtein(source, target) {
    // This function measures the Damerau-levenshtein distance between two strings
    // Levenshtein distance is the minimum number of opperations 
    // (Deletion, Insertion and Substitution)
    // to get from string1 to string2
    // Damerau-levenshtein additionally allows Transposition.
    //
    // Other measures of string distance allow or disallow other opperations.
    if (!source || source.length === 0)
        if (!target || target.length === 0)
            return 0;
        else
            return target.length;
    else if (!target)
        return source.length;

    var sourceLength = source.length;
    var targetLength = target.length;
    var score = [];

    var INF = sourceLength + targetLength;
    score[0] = [INF];
    for (var i = 0; i <= sourceLength; i++) { score[i + 1] = []; score[i + 1][1] = i; score[i + 1][0] = INF; }
    for (var i = 0; i <= targetLength; i++) { score[1][i + 1] = i; score[0][i + 1] = INF; }

    var sd = {};
    var combinedStrings = source + target;
    var combinedStringsLength = combinedStrings.length;
    for (var i = 0; i < combinedStringsLength; i++) {
        var letter = combinedStrings[i];
        if (!sd.hasOwnProperty(letter))
            sd[letter] = 0;
    }

    for (var i = 1; i <= sourceLength; i++) {
        var DB = 0;
        for (var j = 1; j <= targetLength; j++) {
            var i1 = sd[target[j - 1]];
            var j1 = DB;

            if (source[i - 1] == target[j - 1]) {
                score[i + 1][j + 1] = score[i][j];
                DB = j;
            }
            else
                score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;

            score[i + 1][j + 1] = Math.min(score[i + 1][j + 1], score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1));
        }
        sd[source[i - 1]] = i;
    }
    return score[sourceLength + 1][targetLength + 1];
}

function evalAttentionChecks() {
    var check_percent = 1
    if (run_attention_checks) {
        var attention_check_trials = jsPsych.data.getTrialsOfType('attention-check')
        var checks_passed = 0
        for (var i = 0; i < attention_check_trials.length; i++) {
            if (attention_check_trials[i].correct === true) {
                checks_passed += 1
            }
        }
        check_percent = checks_passed / attention_check_trials.length
    }
    return check_percent
}

var getInstructFeedback = function () {
    return '<div class = centerbox><p class = center-block-text>' + feedback_instruct_text +
        '</p></div>'
}

var arraysEqual = function (arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

var randomDraw = function (lst) {
    var index = Math.floor(Math.random() * (lst.length))
    return lst[index]
}

var setVisualStims = function () {
    curr_seq = []
    visual_stim_array = []
    time_array = []
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var last_num = 0
    var content_push = '';
    for (var i = 0; i < num_digits; i++) {
        var num = randomDraw(nums.filter(function (x) { return Math.abs(x - last_num) > 2 }))
        last_num = num
        curr_seq.push(num)
     
        content_push = '<div class = centerbox><div class = digit-span-text>' + num.toString() +
            '</div></div>';
        visual_stim_array.push(content_push)
        time_array.push(stim_time)
    }
    console.log("curr sequwnce from visual set stims: " + curr_seq);
    total_time = num_digits * (stim_time + gap_time)
}

var setAudioStims = function () {
    audio_curr_seq = []
    audio_stim_array = []
    time_array = []
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    var last_num = 0
    var content_push = '';
    for (var i = 0; i < audio_num_digits; i++) {
        var num = randomDraw(nums.filter(function (x) { return Math.abs(x - last_num) > 2 }))
        last_num = num
        audio_curr_seq.push(num)
        content_push = '<div class = centerbox><div class = digit-span-text>' + num.toString() +
            '</div></div>' + '<audio autoplay><source src="sound/Audio' + num + '.mp3" type="audio/ogg"></audio>';
        audio_stim_array.push(content_push)
        time_array.push(stim_time)
    }
    console.log("current sequence from audio: " + audio_curr_seq);
    total_time = audio_num_digits * (stim_time + gap_time)
}


var getTestText = function () {
    return '<div class = centerbox><div class = center-text>' + num_digits + ' Digits</p></div>'
}

var getTestTextAudio = function () {
    return '<div class = centerbox><div class = center-text>' + audio_num_digits + ' Digits</p></div>'
}

var getVisualStims = function () {
    return visual_stim_array
}

var getAudioStims = function () {
    return audio_stim_array
}

var getTimeArray = function () {
    return time_array
}

var getTotalTime = function () {
    return total_time
}

var getFeedback = function () {
    return '<div class = centerbox><div class = center-text>' + feedback + '</div></div>'
}

var recordClick = function (elm) {
    response.push(Number($(elm).text()))
}

var clearResponse = function () {
    response = []
}



/* ************************************ */
/* Define experimental variables */
/* ************************************ */
// generic task variables
var run_attention_checks = false
var attention_check_thresh = 0.65
var sumInstructTime = 0 //ms
var instructTimeThresh = 0 ///in seconds

// task specific variables
var num_digits = 4
var audio_num_digits = 4
var num_trials = 2
var curr_seq = []
var audio_curr_seq = []
var stim_time = 1000
var gap_time = 1500
var time_array = []
var total_time = 0
var errors = 0
var error_lim = 3
var response = []
//setVisualStims()
//var visual_stim_array = getVisualStims()
//setAudioStims()
//var audio_stim_array = getAudioStims()

var response_grid =
    '<div class = numbox>' +
    '<button id = button_1 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>1</div></div></button>' +
    '<button id = button_2 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>2</div></div></button>' +
    '<button id = button_3 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>3</div></div></button>' +
    '<button id = button_4 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>4</div></div></button>' +
    '<button id = button_5 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>5</div></div></button>' +
    '<button id = button_6 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>6</div></div></button>' +
    '<button id = button_7 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>7</div></div></button>' +
    '<button id = button_8 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>8</div></div></button>' +
    '<button id = button_9 class = "square num-button" onclick = "recordClick(this)"><div class = content><div class = numbers>9</div></div></button>' +
    '<button class = clear_button id = "ClearButton" onclick = "clearResponse()">Clear</button>' +
    '<button class = submit_button id = "SubmitButton">Submit Answer</button></div>'

/* ************************************ */
/* Set up jsPsych blocks */
/* ************************************ */
// Set up attention check node
var attention_check_block = {
    type: 'attention-check',
    data: {
        trial_id: "attention_check"
    },
    timing_response: 180000,
    response_ends_trial: true,
    timing_post_trial: 200
}

var attention_node = {
    timeline: [attention_check_block],
    conditional_function: function () {
        return run_attention_checks
    }
}

var user_data = { 
    type: 'survey-text',
    data: {
        trial_id: "retrieve user data"
    },
    questions: ['<p class = center-block-text style = "font-size: 20px">Please enter nickname</p>'],
    rows: [15],
    columns: [60]
};

//Set up post task questionnaire
var post_task_block = {
    type: 'survey-text',
    data: {
        trial_id: "post task questions"
    },
    questions: ['<p class = center-block-text style = "font-size: 20px">Please summarize what you were asked to do in this task.</p>',
        '<p class = center-block-text style = "font-size: 20px">Do you have any comments about this task?</p>'],
    rows: [15, 15],
    columns: [60, 60]
};

/* define static blocks */
var feedback_instruct_text =
    'Welcome to the experiment. This experiment will take less than 10 minutes. Press <strong>enter</strong> to begin.'
var feedback_instruct_block = {
    type: 'poldrack-text',
    cont_key: [13],
    data: {
        trial_id: "instruction"
    },
    text: getInstructFeedback,
    timing_post_trial: 0,
    timing_response: 180000
};
/// This ensures that the subject does not read through the instructions too quickly.  If they do it too quickly, then we will go over the loop again.
var instructions_block = {
    type: 'poldrack-instructions',
    data: {
        trial_id: "instruction"
    },
    pages: [
        '<div class = centerbox><p class = block-text>In this test you will have to try to remember a sequence of numbers that will appear on the screen one after the other. At the end of each trial, enter all the numbers into the presented numpad in the sequence in which they occurred. Do your best to memorize the numbers, but do not write them down or use any other external tool to help you remember them.</p><p class = block-text>Trials will start after you end instructions.</p></div>'
    ],
    allow_keys: false,
    show_clickable_nav: true,
    timing_post_trial: 1000
};

var instruction_node = {
    timeline: [feedback_instruct_block, instructions_block],
    /* This function defines stopping criteria */
    loop_function: function (data) {
        for (i = 0; i < data.length; i++) {
            if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
                rt = data[i].rt
                sumInstructTime = sumInstructTime + rt
            }
        }
        if (sumInstructTime <= instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
            return true
        } else if (sumInstructTime > instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Done with instructions. Press <strong>enter</strong> to continue.'
            return false
        }
    }
}

//nak buat second instruction for auditory part but tak jadi lagi :'(

/*var second_instruction_node = {
    timeline: [feedback_instruct_block, instructions_block],
    
    loop_function: function (data) {
        for (i = 0; i < data.length; i++) {
            if ((data[i].trial_type == 'poldrack-instructions') && (data[i].rt != -1)) {
                rt = data[i].rt
                sumInstructTime = sumInstructTime + rt
            }
        }
        if (sumInstructTime <= instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Read through instructions too quickly.  Please take your time and make sure you understand the instructions.  Press <strong>enter</strong> to continue.'
            return true
        } else if (sumInstructTime > instructTimeThresh * 1000) {
            feedback_instruct_text =
                'Done with visual part. Press <strong>enter</strong> to continue to auditory.'
            return false
        }
    }
}*/

var end_block = {
    type: 'poldrack-text',
    timing_response: 180000,
    data: {
        trial_id: "end",
        exp_id: 'digit_span'
    },
    text: '<div class = centerbox><p class = center-block-text>Thanks for completing this task!</p><p class = center-block-text>Press <strong>enter</strong> to continue.</p></div>',
    cont_key: [13],
    timing_post_trial: 0
};


var start_visual_test_block = {
    type: 'poldrack-single-stim',
    is_html: true,
    stimulus: getTestText,
    data: {
        trial_id: "test_intro"
    },
    choices: 'none',
    timing_stim: 1000,
    timing_response: 1000,
    response_ends_trial: false,
    timing_post_trial: 1000
};

var start_audio_test_block = {
    type: 'poldrack-single-stim',
    is_html: true,
    stimulus: getTestTextAudio,
    data: {
        trial_id: "test_intro"
    },
    choices: 'none',
    timing_stim: 1000,
    timing_response: 1000,
    response_ends_trial: false,
    timing_post_trial: 1000
};

/* define test block */
var test_visual_block = {
    type: 'poldrack-multi-stim-multi-response',
    stimuli: getVisualStims,
    is_html: true,
    timing_stim: getTimeArray,
    timing_gap: gap_time,
    choices: [
        ['none']
    ],
    data: {
        trial_id: "stim",
        exp_stage: 'test'
    },
    timing_response: getTotalTime,
    timing_post_trial: 0,
    on_finish: function () {
        jsPsych.data.addDataToLastTrial({
            "sequence": curr_seq,
            "num_digits": num_digits
        })
    }
}

var test_audio_block = {
    type: 'poldrack-multi-stim-multi-response',
    stimuli: getAudioStims,
    is_html: true,
    timing_stim: getTimeArray,
    timing_gap: gap_time,
    choices: [
        ['none']
    ],
    data: {
        trial_id: "stim",
        exp_stage: 'test'
    },
    timing_response: getTotalTime,
    timing_post_trial: 0,
    on_finish: function () {
        jsPsych.data.addDataToLastTrial({
            "sequence": audio_curr_seq,
            "audio_num_digits": audio_num_digits
        })
    }
}


var visual_response_block = {
    type: 'single-stim-button',
    stimulus: response_grid,
    button_class: 'submit_button',
    data: {
        trial_id: "response_visual",
        exp_stage: 'test'
    },
    on_finish: function () {
        jsPsych.data.addDataToLastTrial({
            "response": response.slice(),
            "sequence": curr_seq,
            "num_digits": num_digits,
            "condition": "forward"
        })
        var correct = false
        console.log("current sequence from user response: " + response);
        console.log("current sequence from visual stimulus: " + curr_seq);
        // staircase
        if (arraysEqual(response, curr_seq)) {
            num_digits += 1
            feedback = '<span style="color:green">Correct!</span>'
            stims = setVisualStims()
            correct = true
        } else {
            errors += 1
            if (num_digits > 1 && errors == 2) {
                num_digits -= 1
                errors = 0
            }
            feedback = '<span style="color:red">Incorrect!</span>'
            stims = setVisualStims()
        }
        jsPsych.data.addDataToLastTrial({
            correct: correct
        })
        response = []
    },
    timing_post_trial: 500
}

var audio_response_block = {
    type: 'single-stim-button',
    stimulus: response_grid,
    button_class: 'submit_button',
    data: {
        trial_id: "response_audio",
        exp_stage: 'test'
    },
    on_finish: function () {
        jsPsych.data.addDataToLastTrial({
            "response": response.slice(),
            "sequence": audio_curr_seq,
            "audio_num_digits": audio_num_digits,
            "condition": "forward"
        })
        var correct = false
        console.log("current sequence from user response: " + response);
        console.log("current sequence from audio stimulus: " + audio_curr_seq);
        // staircase
        if (arraysEqual(response, audio_curr_seq)) {
            audio_num_digits += 1
            feedback = '<span style="color:green">Correct!</span>'
            stims = setAudioStims()
            correct = true
        } else {
            errors += 1
            if (audio_num_digits > 1 && errors == 2) {
                audio_num_digits -= 1
                errors = 0
            }
            feedback = '<span style="color:red">Incorrect</span>'
            stims = setAudioStims()
        }
        jsPsych.data.addDataToLastTrial({
            correct: correct
        })
        response = []
    },
    timing_post_trial: 500
}


var feedback_block = {
    type: 'poldrack-single-stim',
    stimulus: getFeedback,
    data: {
        trial_id: "feedback"
    },
    is_html: true,
    choices: 'none',
    timing_stim: 1000,
    timing_response: 1000,
    response_ends_trial: true
}

/* create experiment definition array */
var digit_span_experiment = [];
digit_span_experiment.push(user_data)
digit_span_experiment.push(instruction_node);
console.log("lev_result : " + levenshtein("1133", "1030"));
setVisualStims()
var visual_stim_array = getVisualStims()
for (i = 0; i < num_trials; i++) {
    digit_span_experiment.push(start_visual_test_block)
    digit_span_experiment.push(test_visual_block) // display numbers
    digit_span_experiment.push(visual_response_block) // keypad
    digit_span_experiment.push(feedback_block) // correct incorrect
}
digit_span_experiment.push(attention_node)
digit_span_experiment.push(instruction_node); // added to display audio instruction (need to change text)
setAudioStims()
var audio_stim_array = getAudioStims()
for (i = 0; i < num_trials; i++) {
    digit_span_experiment.push(start_audio_test_block) // display audio
    digit_span_experiment.push(test_audio_block) // play audio
    digit_span_experiment.push(audio_response_block) // keypad
    digit_span_experiment.push(feedback_block)
}

digit_span_experiment.push(post_task_block)
digit_span_experiment.push(end_block)