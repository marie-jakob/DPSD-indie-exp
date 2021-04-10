"""
Generates dummy stimuli, saves them in "dummy_stimuli.csv"
and adds them to a .js file containing all stimuli in array
called "stimuli".

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
    stimuli = gen_stimuli(600)
    write_stimuli(stimuli, "dummy_stimuli.csv")
    stimuli = pd.read_csv("dummy_stimuli.csv", names = ["word"])
    # print(stimuli)

    stimuli = stimuli.to_json(orient = 'records')
    with open("ExperimentFiles/dummy_stimuli.js", "w+") as f:
        f.write("var stimuli = ")
        f.write(stimuli)
        f.write(";\n")
        f.write("console.log(stimuli);\n")
        f.write("shuffle(stimuli); \n")
        f.write("console.log('stimuli.js imported successfully.');")





    
    

