#!/usr/bin/env node

const repo = require("./lib/repo");
const inquirer = require("./lib/inq");
const github = require("./lib/github");
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const files = require("./lib/files");
const Configstore = require("configstore");
const conf = new Configstore("ginit");

clear();
console.log(
    chalk.yellow(
        figlet.textSync("Ginit", { horizontalLayout: "full" })
    )
);

if (files.directoryExists(".git")) {
    console.log(chalk.red("Already a git repository!"));
    process.exit();
}
//     const credentials = await inquirer.askGithubCredentials();
//     console.log(credentials);
// };
//
// const run = async () => {
//     // let token = github.getStoredGithubToken();
//     // if (!token) {
//     let token = await github.setGithubCredentials();
//     //     token = await github.registerNewToken();
//     // }
//     // github(registerNewToken
//     console.log(token);
// };
//
// run();


const getGithubToken = async () => {
    // Fetch token from config store
    let token = github.getStoredGithubToken();
    if (token) {
        return token;
    }

    // No token found, use credentials to access github account
    await github.setGithubCredentials();

    // Check if access token for ginit was registered
    const accessToken = await github.hasAccessToken();
    if (accessToken) {
        console.log(chalk.yellow("An existing access token has been found!"));
        // ask user to regenerate a new token
        token = await github.regenerateNewToken(accessToken.id);
        return token;
    }

    // No access token found, register one now
    token = await github.registerNewToken();
    return token;
};


const run = async () => {
    try {
        // Retrieve & Set Authentication Token
        const token = await getGithubToken();
        github.githubAuth(token);

        // Create remote repository
        const url = await repo.createRemoteRepo();

        // Create .gitignore file
        await repo.createGitignore();

        // Setup local repository and push to remote
        const done = await repo.setupRepo(url);
        if (done) {
            console.log(chalk.green("All done!"));
        }
    } catch (err) {
        if (err) {
            switch (err.code) {
                case 401:
                    console.log(chalk.red("Couldn't log you in. Please provide correct credentials/token."));
                    break;
                case 422:
                    console.log(chalk.red("There already exists a remote repository with the same name"));
                    break;
                default:
                    console.log(err);
            }
        }
    }
};

run();