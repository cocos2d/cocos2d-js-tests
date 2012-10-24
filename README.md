# cocos2d JavaScript tests

These tests are shared by the following projects:

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
$ open samples/TestJavascript/proj.ios/TestJavascript.xcodeproj
```
- Select the "TestJavascript" scheme in Xcode
- Run it

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

