# Web Project Template
This template has everything you need to start an HTML/SCSS/JavaScript/PHP web project right away

# Prerequisites
1. [XAMPP](https://www.apachefriends.org/download.html) or any other web server
2. Add the directory of the php executable to your path
3. [Composer](https://getcomposer.org/download/) 
4. [NPM](https://nodejs.org/en/)
5. Open this directory and a terminal and run `npm install -g yarn;npm install;composer require --dev phpunit/phpunit ^8`

# Running the project
1. Run `gulp`, this will start a PHP server and enable live reload for the project.

#### Live reload - on change of CSS/Images the data will be replaced on the page, on change of PHP/HTML/JS the page will be reloaded

# Debugging in VS Code
1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Disable the `@builtin TypeScript and JavaScript` extension
3. Install these VS Code extensions: [Debugger for Chrome(for JS)](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug)
4. Follow the guide to in PHP Debug's overview section to enable the PHP debugging for your PHP server
5. Run the `Server + Debugging` option from the debugger(you should not run gulp before that), the server takes time to start so when chrome opens up you will see an error message - "This site can’t be reached"

# Git - recommended SSH using the set key
### Set the new repo name
```
git remote set-url origin git@bitbucket.org:emanuilov/new-repo-name.git
```
### Check the current repo
```
git remote -v
```
### Merge with the new after the change
```
git pull --allow-unrelated-histories
```

### ToDO

- [ ] sFTP deployment trough Git
- [ ] Working with a remote server
- [ ] Directory separation when working with frameworks
- [ ] Lint and test all staged files
- [x] Linting and testing for PHP & JS
- [x] Debugging for PHP & JS
- [x] ES6 & module imports