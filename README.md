# Web Project Template
This template has everything you need to start an HTML/SCSS/JavaScript/PHP web project right away

# Features
* PHP
   * Linting - phplint
   * Testing - phpunit
   * Debugging - xdebug
* ES6
  * Linting - eslint + prettifier
  * Testing - jest
  * Browserify + babelify
  * Sourcemaps
  * Minification
* SCSS
   * Linting - stylelint
   * Compiling - node-sass
* HTML linting
* Image compression
* Debuging
  * Live reload
    *  On change of PHP/HTML/JS the page will be reloaded
    *  On change of SCSS and Images the content on the page will be replaced without reload of the whole page
    
  * Breakpoints through VS Code(for PHP)/Chrome(for ES6)
* Pre-commit hook - adds the staged files in the place of the current ones
   * Linting - lints all staged files
   * Testing - runs all tests(staged or not)
 * SFTP synchronisation on build via rsync(An additional setup may be required for Windows, see below)


# Prerequisites
1. [XAMPP](https://www.apachefriends.org/download.html) or any other web server
2. Add the directory of the php executable to your path
3. [Composer](https://getcomposer.org/download/) 
4. [NPM](https://nodejs.org/en/)
5. Open this directory and a terminal and run `npm install -g yarn;npm install;composer require --dev phpunit/phpunit ^8`

# Setting up SFTP sync on Windows ()
#### If you get this error when using rsync via cygwin - `gulp-rsync: rsync error: error in rsync protocol data stream (code 12) at io.c(226)` do the following:
1. Download any Linux subsystem for Linux
2. Open the bash terminal and install rsync
3. Open `./node_modules/gulp-rsync/rsync.js` and replace the array in the spawn command for Windows(line 85) with this - `['/s', '/c', '"bash -c -i \"' + command + ' && exit\""']`

# Starting a new project
1. Set the correct project name, version and git link in `package.json`
2. Set the correct repository for git
    * Change the repository `git remote set-url origin git@bitbucket.org:emanuilov/new-repository.git`
    * Verify the change `git remote -v`
    * Merge with the new repository `git pull --allow-unrelated-histories`
3. To start the project run `gulp`, this will start a PHP server and enable live reload for the project.
4. To start debugging follow the next section

# Debugging in VS Code
1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Disable the `@builtin TypeScript and JavaScript` extension
3. Install these VS Code extensions: [Debugger for Chrome(for JS)](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
4. Follow the guide to in PHP Debug's overview section to enable the PHP debugging for your PHP server
5. Run the `Server + Debugging` option from the debugger(you should not run gulp before that), the server takes time to start so when chrome opens up you will see an error message - "This site can't be reached"

# Future plans

1. Directory separation when working with frameworks
2. Working with a remote server