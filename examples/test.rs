?# cat - > test.orc

#++
     sr = 48000
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1

  aNote poscil .5, 440

  out aNote

endin
++#

?# cat - > test.sco

#++
i 1 0 1
++#

?# csound -odac test.orc test.sco

?# rm test.orc test.sco
