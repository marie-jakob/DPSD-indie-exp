##------------------------------------------------------------
## Test Pilot study
## Date: May 2021
## Author: Marie Jakob <mjakob@cs.uni-freiburg.de>
## ------------------------------------------------------------

# Setup (load packages)

library(tidyverse)
library(jsonlite)
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

# ---------------------------------------------------------------------------- #
#### LOP manipulation ####

test_LOP <- read_csv("test_LOP.csv")
View(test_LOP)

test_LOP %>%
    filter(exp_part != "instr",
           exp_part != "demographics",
           trial_type != "html-keyboard-response") %>%
    select(rt, 
           response, 
           word, 
           test, 
           learned, 
           LOP,
           exp_part,
           trial_type, 
           block_num) -> trials

learn <- trials %>% filter(exp_part == "learning_1")
learn$response <- unlist(lapply(learn$response, fromJSON))


all(unique(learn$word) == learn$word)  # :) 

table(learn$LOP)

trials %>% 
    filter(exp_part == "test_1",
           ! is.na(word)) %>%
    mutate(trial_part = ifelse(trial_type == "categorize-html", "R-K", "fam-rating")) %>%
    select(-trial_type, -rt) %>%
    pivot_wider(names_from = trial_part,
                values_from = response) -> test



all(unique(test$word) == test$word)
all(learn$word %in% test$word)
all(test$learned[which(test$word %in% learn$word)] == TRUE)
all(test$learned[which(! test$word %in% learn$word)] == FALSE)
table(test$LOP)

table(test$block_num)
table(learn$block_num)


# ---------------------------------------------------------------------------- #
#### Strength Manipulation ####


test_strength<- read_csv("test_strength.csv")
View(test_strength)

test_strength %>%
    filter(exp_part != "instr",
           exp_part != "demographics") %>%
    select(rt, 
           response, 
           word, 
           test, 
           learned, 
           exp_part,
           trial_type, 
           block_num,
           trial_num) -> trials

learn <- trials %>% filter(exp_part == "learning")
table(learn$word)

learn %>%
    group_by(word) %>%
    summarize(n = n()) -> counts
table(counts$n)


trials %>% 
    filter(exp_part == "test",
           trial_type != "html-keyboard-response",
           ! is.na(word)) %>%
    mutate(trial_part = ifelse(trial_type == "categorize-html", "R-K", "fam-rating")) %>%
    select(-trial_type, -rt) %>%
    pivot_wider(names_from = trial_part,
                values_from = response) -> test



all(unique(test$word) == test$word)
all(learn$word %in% test$word)
all(test$learned[which(test$word %in% learn$word)] == TRUE)
all(test$learned[which(! test$word %in% learn$word)] == FALSE)
table(test$LOP)

table(test$block_num)
table(learn$block_num)



