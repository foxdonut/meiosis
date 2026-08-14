#!/bin/bash
for D in . docs helpers/setup/{source,examples/{snippets,view-{preact,mithril,react},nested-components}} helpers/router/{source,examples/{hash,history}-mode}; do echo '-----' $D; (cd $D && npm audit fix && npm ci); done
