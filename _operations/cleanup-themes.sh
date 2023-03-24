#!/bin/bash

# Each Fomantic UI update will add a number of unused themes to the Semantic
# themes folder. Run this script to get rid of them.

source "config.sh"

rm -rf "${installPath}/assets/semantic/src/themes/amazon"
rm -rf "${installPath}/assets/semantic/src/themes/bookish"
rm -rf "${installPath}/assets/semantic/src/themes/bootstrap3"
rm -rf "${installPath}/assets/semantic/src/themes/chubby"
rm -rf "${installPath}/assets/semantic/src/themes/classic"
rm -rf "${installPath}/assets/semantic/src/themes/colored"
rm -rf "${installPath}/assets/semantic/src/themes/duo"
rm -rf "${installPath}/assets/semantic/src/themes/famfamfam"
rm -rf "${installPath}/assets/semantic/src/themes/flat"
rm -rf "${installPath}/assets/semantic/src/themes/github"
rm -rf "${installPath}/assets/semantic/src/themes/gmail"
rm -rf "${installPath}/assets/semantic/src/themes/instagram"
rm -rf "${installPath}/assets/semantic/src/themes/joypixels"
rm -rf "${installPath}/assets/semantic/src/themes/material"
rm -rf "${installPath}/assets/semantic/src/themes/pulsar"
rm -rf "${installPath}/assets/semantic/src/themes/raised"
rm -rf "${installPath}/assets/semantic/src/themes/round"
rm -rf "${installPath}/assets/semantic/src/themes/rtl"
rm -rf "${installPath}/assets/semantic/src/themes/striped"
rm -rf "${installPath}/assets/semantic/src/themes/twitter"