var block_num = 0

generate_trials = function (table, test_part, search_condition) {
    let to_return = [];

    let target_set;
    let distractor_set;

    if (search_condition === 'conjunction') {
        target_set = conjunction_target;
        distractor_set = conjunction_distractors;
    } else { // feature search
        target_set = feature_targets;
        distractor_set = feature_distractors;
    }

    let repetitions = test_part === 'practice' ? 2 : 20;

    block_num += 1;


    for (let rep = 0; rep < repetitions; rep++) {
        for (let i = 0; i < table.length; i++) {
            let cue;
            let target;
            let distractor_1;
            let distractor_2;
            let distractor_3;
            let distractor_4;
            let stimuli;
            let response;
            let t_char;
            let t_rgb;
            let t_color;
            let d1_char;
            let d1_rgb;
            let d1_color
            let d2_char;
            let d2_rgb;
            let d2_color;
            let d3_char;
            let d3_rgb;
            let d3_color;
            let d4_char;
            let d4_rgb;
            let d4_color

            let final_display = '<div class=display>';

            final_display += table[i][0] == 'LEFT' ? '<table class="array left">' : '<table class="array right">';

            // shuffle distractor array
            var distractors = array_shuffle(distractor_set);

            if (table[i][2] == 'TRUE') {
                target = target_set[target_set.length * Math.random() | 0];
                distractor_1 = distractors[0];
                distractor_2 = distractors[1];
                distractor_3 = distractors[2];

                t_char = target[0];
                t_rgb = target[1];
                t_color = target[2];
                d1_char = distractor_1[0]
                d1_rgb = distractor_1[1];
                d1_color = distractor_1[2];
                d2_char = distractor_2[0];
                d2_rgb = distractor_2[1];
                d2_color = distractor_2[2];
                d3_char = distractor_3[0];
                d3_rgb = distractor_3[1];
                d3_color = distractor_3[2];
                d4_char = 'NA';
                d4_rgb = 'NA';
                d4_color = 'NA';


                stimuli = [target, distractor_1, distractor_2, distractor_3];
                stimuli = array_shuffle(stimuli);

                response = present_key;
            } else {

                distractor_1 = distractors[0];
                distractor_2 = distractors[1];
                distractor_3 = distractors[2];
                distractor_4 = distractors[3];

                t_char = 'NA';
                t_rgb = 'NA';
                t_color = 'NA';
                d1_char = distractor_1[0];
                d1_rgb = distractor_1[1];
                d1_color = distractor_1[2];
                d2_char = distractor_2[0];
                d2_rgb = distractor_2[1];
                d2_color = distractor_2[2];
                d3_char = distractor_3[0];
                d3_rgb = distractor_3[1];
                d3_color = distractor_3[2];
                d4_char = distractor_4[0];
                d4_rgb = distractor_4[1];
                d4_color = distractor_4[2];

                stimuli = [distractor_1, distractor_2, distractor_3, distractor_4];
                stimuli = array_shuffle(stimuli);

                response = absent_key;
            }


            final_display +=
                `<tr>` +
                `<td class="cell char-stim" style="color: ${stimuli[0][1]}">` + `${stimuli[0][0]}` + `</td>` +
                `<td class="cell char-stim" style="color: ${stimuli[1][1]}">` + `${stimuli[1][0]}` + `</td>` +
                `</tr>` +
                `<tr>` +
                `<td class="cell char-stim" style="color: ${stimuli[2][1]}">` + `${stimuli[2][0]}` + `</td>` +
                `<td class="cell char-stim" style="color: ${stimuli[3][1]}">` + `${stimuli[3][0]}` + `</td>` +
                `</tr>`;

            final_display += `</table>`;

            // this has to go at the end I think
            if (table[i][1] == 'LEFT') {
                cue = cue_L;
                final_display += '<div class="fix-cue-box"><div class="cue-left"></div></div>';
            } else {
                cue = cue_R;
                final_display += '<div class="fix-cue-box"><div class="cue-right"></div></div>';
            }


            final_display += `</div>`;

            to_return.push(
                {
                    fix: fix,
                    cue: cue,
                    target: final_display,
                    data: {
                        practicing: test_part == 'practice',
                        block_num: block_num,
                        condition: 4,
                        block_type: search_condition,
                        target_present: table[i][2],
                        cue_valid: table[i][1] == table[i][0],
                        visual_field: table[i][0],
                        cue_direction: table[i][1],
                        correct_response: response,
                        target_id: t_char,
                        target_rgb: t_rgb,
                        target_color: t_color,
                        distractor1_id: d1_char,
                        distractor1_rgb: d1_rgb,
                        distractor1_color: d1_color,
                        distractor2_id: d2_char,
                        distractor2_rgb: d2_rgb,
                        distractor2_color: d2_color,
                        distractor3_id: d3_char,
                        distractor3_rgb: d3_rgb,
                        distractor3_color: d3_color,
                        distractor4_id: d4_char,
                        distractor4_rgb: d4_rgb,
                        distractor4_color: d4_color
                    }
                });
        }
    }
    // Trim trial list to 25 for practice
    if (test_part == 'practice') {
        arr1 = to_return.slice(0,21);
        arr2 = to_return.slice(21, to_return.length);
        to_return = arr1;
        to_return.concat(jsPsych.randomization.sampleWithoutReplacement(arr2, 5));
    };
    return array_shuffle(to_return);
}