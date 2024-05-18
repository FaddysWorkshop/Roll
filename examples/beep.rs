# Faddy's Roll Example: Creating a Beep Sound

This roll is capable of creating a beep sound.
Besides Roll, Csound is required to be installed for this roll to work.

## Step #1 Writing an Instrument That Produces Beep Sounds

## Note:

The following line starts with ?# which tells roll to start a new page.
All the remaining text in the line will be the command line that will run at the end of the page.
The end of a page is reached when Roll reads another line that starts with ?# or by hitting the end of the file.

?# cat - > beep.orc

==+
sr = 48000
ksmps = 32
nchnls = 1
0dbfs = 1

instr 1

  aNote poscil .5, 440

  out aNote

endin
-==

?# cat - > beep.sco

=+ i 1 0 1

?# csound -odac beep.orc beep.sco

?# rm beep.orc beep.sco
