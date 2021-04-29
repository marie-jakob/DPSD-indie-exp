"""

Contains functions to generate dummy stimuli and to write
them to a .csv and a .js file.

The main function writes the word pool to a .js file to use for the experiment.


Author: Marie Jakob <marie.a.jakob@gmail.com>

"""

import random
import pandas as pd
import sys

def gen_random_word(length):
    letters = "abcdefghijklmnopqrstuvwxyz"
    word = ""
    for _ in range(length):
        idx_temp = random.randint(0, len(letters) - 1)
        word += letters[idx_temp]
    return word


def gen_stimuli(n_words):
    stimuli = []
    for _ in range(n_words):
        len_temp = random.randint(5, 15)
        stimuli.append(gen_random_word(len_temp))
    return stimuli


def write_stimuli(stimuli, path):
    with open(path, mode = "w+") as f:
        for i in stimuli:
            f.write(i)
            f.write("\n")


if __name__ == "__main__":
    stimuli = pd.read_excel("wordpool.xlsx", names = ["word"])
    print(stimuli)
    stimuli = stimuli.to_json(orient = 'records')
    with open("../experiment-files/stimuli.js", "w+") as f:
        f.write("var STIMULI = ")
        f.write(stimuli)
        f.write(";\n")
        f.write("console.log(STIMULI);\n")
        f.write("shuffle(STIMULI); \n")
        f.write("console.log('stimuli.js imported successfully.');")





    
    

