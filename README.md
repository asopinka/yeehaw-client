## Yee-Haw (Client)

Yee-Haw is a simple tool to give your locally running HTTP(s) servers a public URL. For example, you could get a public URL for
- A web server
- A Docker container
- An API
- A React or node application
- A static website

### Installation

If you have **NodeJS 16.10** or later, you can install Yee-Haw by running
```
sudo npm install -g yeehaw
```

### Using Yee-Haw
First, verify that the install went fine by running
```
yeehaw
```
This command should print the help and doesn't connect to any external services. 

If instead you got an error and you installed with `npm`, you probably have an older version of Node (lower than 16.10) installed. Check your NodeJS version with `node --version` and then reinstall using one of the above copy/paste install commands to get the pre compiled binary for your platform.

Now that you have a working installation:
- Start your web application locally and note down the port number its listening on
- Run `yeehaw <port number>`, replacing `<port number>` with your applications port number. For example, if your application listens on port `8080`, run `yeehaw 8080`.

Here's what it should look like
```
$ yeehaw 8080
Your Yee-Haw Public URLs are below and are accessible internet wide. Always use HTTPs for the best security

https://cqcu2t-ip-49-185-26-79.yeehaw.sh ⟶ http://localhost:8080
http://cqcu2t-ip-49-185-26-79.yeehaw.sh ⟶ http://localhost:8080
```

Now, just go to either one of the URLs shown with your web browser.
The URLs are public - this means you can also share them with collaborators and others over the internet.

#### Custom subdomain
Sometimes, it can be useful to have a domain that does not change frequently. To use a custom subdoman run
`yeehaw 8080 as <yourdomain>.yeehaw.sh`.

### Using Yee-Haw as a dependency in your code
To use Yee-Haw as a dependency for your project you need Node 16.10 or later.

#### Add the dependency
Add Yee-Haw as a dependency with
```
npm install --save yeehaw
```

#### Starting Yee-Haw using code
First import `yeehaw`. Both ES and CommonJS modules are supported.

Importing `yeehaw` as an ES module
```javascript
import { yeehaw } from 'yeehaw';
```

Importing `yeehaw` as a CommonJS module
```javascript
const yeehaw = require('yeehaw/cjs');
```

Once the module is imported you can start Yee-Haw with the code below, changing port 3000 to the port your application listens on if it is different.
```javascript
const url = await yeehaw({
    port: 3000
});
// url = https://idsq6j-ip-157-211-195-169.yeehaw.sh
```

Yee-Haw will start in the background and you'll see output in the console log similar to the Yee-Haw command line application which will include the public URLs that now point to your application. The function is `async` and won't block execution of the rest of your code.

If you want to use a custom subdomain, you could also pass the domain as an option.
```javascript
const url = await yeehaw({
    port: 3000,
    domain: '<your Yee-Haw domain e.g. mysite.yeehaw.sh>'
});
// url = mydomain.yeehaw.sh
```

#### Suppress output/logs
To suppress the initial output with the URLs, set the environment variable `YEEHAW_QUIET_MODE=1` somewhere in your environment. This might be useful in a CI/CD environment or in other scripts.

#### Using Yee-Haw with NPM scripts
Installing Yee-Haw as an NPM dependency will make the following executables available in your project:
```
node_modules/.bin/yeehaw
```

They both work identically to the Yee-Haw command line application.

You can run them manually in the same way as the command line application (for example `node node_modules/.bin/yeehaw 3000`), but its far more convenient to integrate them with NPM scripts in `package.json`. This way, you can automate starting your application and generating a public URL with a single command. For example:
```json
{
    "name": "myapp",
    "version": "0.0.1",
    "scripts": {
        "start": "dist/index.js",
        "start-public": "npm run start && yeehaw 3000"
    }
}
```

In this example, `npm run start-public` will simultaneously start your application and get Yee-Haw to generate public URLs tunneling to port 3000. Replace port 3000 with the port your application listens on if it is different. You will see the public URLs in the command line output.

This allows you to start your application and get a public URL with a single command, instead of needing to run two commands in separate terminals.
