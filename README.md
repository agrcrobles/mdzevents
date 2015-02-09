MdzEvents

==========
**Setup**

* Download Android ADT or Android Studio
* Download SDKs
* Add _%ANDROID_SDK%/platform-tools_ && _tools_ to path
* If zipalign is not in path copy from _%ANDROID_SDK%/build-tools_ to _./_

Use _./signalign.sh_ to sign (it asks for password ... and you should too :P)

- npm install
- sudo npm install -g grunt-cli
- sudo npm install -g bower
- bower install

**Run**

grunt serve (browser)

grunt platform:add:android

grunt run:android

grunt run:android -l -c -s (server live)

https://github.com/diegonetto/generator-ionic
# mdzevents