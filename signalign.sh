#!/bin/bash
echo "Signing apk"

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore grow.keystore ./platforms/android/ant-build/MdzEventos-release-unsigned.apk mdzev-grow

echo "Aligning apk"

zipalign -v 4 ./platforms/android/ant-build/MdzEventos-release-unsigned.apk mdze.apk

echo "Done!"