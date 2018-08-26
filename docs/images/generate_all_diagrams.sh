#!/bin/bash
# need brew install graphviz
# need npm i -g svgexport for pngs
EXT=svg
TEMPSVG=tempsvg.svg
for SRC in *.dot
do
  DEST=$(echo $SRC | sed -e "s/\.dot$/.$EXT/") && \
  PNG=$(echo $DEST | sed -e "s/\.$EXT/.png/") && \
  echo $SRC '->' $DEST &&\
  dot -T$EXT -Nshape=record -Nmargin=0.05 -Nfontsize=12pt -Nfontname=Courier -Efontsize=12pt -Efontname=helvetica -Ecolor=maroon -Efontcolor=navy -Gnodesep=0.2 -o $DEST $SRC && \
  # svgexport $DEST $PNG
  echo 'Done.'
done
