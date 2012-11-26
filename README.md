# cocos2d JavaScript tests

These tests and samples are shared by the following projects:

  - [cocos2d-html5](http://www.cocos2d-html5.org)
  - [cocos2d-x](http://www.cocos2d-x.org)
  - [cocos2d-iphone](http://www.cocos2d-iphone.org)

If you modify the a test, please test it with all the projects to ensure 100% API compatibility between all the projects.

## Running the tests ##

### cocos2d-html5 ###

```shell
$ git clone git://github.com/cocos2d/cocos2d-html5.git
$ cd cocos2d-html5
$ git submodule update --init
$ python -m SimpleHTTPServer
```
... and run a brower and open it in `localhost:8000/tests`

### cocos2d-iphone ###

```shell
$ git clone git://github.com/cocos2d/cocos2d-iphone.git
$ cd cocos2d-iphone
$ git checkout develop-v2
$ git submodule update --init
$ open cocos2d-ios.xcodeproj
```
- Select the "JS Test" scheme in Xcode
- Run it

![Xcode JS-Tests](https://lh4.googleusercontent.com/-qK1AiPbVggI/UIgeykWN1rI/AAAAAAAAqHA/hBegMW0VTkE/s800/Xcode_jstests.png)

### cocos2d-x ###

```shell
$ git clone git://github.com/cocos2d/cocos2d-x.git
$ cd cocos2d-x
$ git checkout gles20
$ git submodule update --init
```

#### run on iOS ####

```shell
$ open samples/TestJavascript/proj.ios/TestJavascript.xcodeproj
```
- Select the "TestJavascript" scheme in Xcode
- Run it

#### run on Android ####

- Install Android NDK developement environment
- Define environment variable "NDK_ROOT" which means the directory NDK installed in
- Run the following command

```shell
$ cd Samples/TestJavascript/proj.android
$ ./build.native.sh
```
- Import android projects into Eclipses and run, please refer to http://www.cocos2d-x.org/projects/cocos2d-x/wiki/How_to_build_and_run_HelloWorld_on_Android(gles20_branch)

## Automated tests ##

Automated tests are not ready yet.  In the meantime use the obsolete method of updating the following spreadsheet:

- [cocos2d JS tests](https://docs.google.com/spreadsheet/ccc?key=0AtMnlkzywt1zdHlZcVZQZlp6RHhZd0lHcGtleXV4aUE#gid=1)

## Multiplatform ##

__Code once, run everywhere.__
These tests can be run unmodified in the following platforms:

  - In any browser ( with _cocos2d-html5_ )
  - iOS ( with _cocos2d-x / cocos2d-iphone_ + _JS Bindings_)
  - Android ( with _cocos2d-x_ + _JS Bindings_ )
  - Mac ( with _cocos2d-iphone_ + _JS Bindings_ )

# cocos2d JavaScript samples

MoonWarriors
==================
Art and audio is copyrighted by Enigmata Genus Revenge,
you may not use any copyrighted material without permission.

This showcase is licensed under GPL

Authors
------------------
   * Programmer: Shengxiang Chen, Dingping Lv
   * Effects animation: Hao Wu
   * Quality Assurance:  Shun Lin

Website
------------------
   * HTML5China: [bbs.html5china.com][1]
   * Cocos2d-html5: [www.cocos2d-x.org][2]

   [1]: http://bbs.html5china.com/forum-cocos2d_html5-1.html "HTML5China"
   [2]: http://www.cocos2d-x.org "Cocos2d-html5"
   [3]: http://www.cocos2d-x.org/MoonWarriors/index.html "MoonWarriors"

Watermelon with Me
==================
This showcase is licensed under MIT.

Authors
------------------
    Ricardo Quesada