const octokit = require("@octokit/rest")();
const Configstore = require("configstore");
const pkg = require("../package.json");
const _ = require("lodash");
const CLI = require("clui");
const Spinner = CLI.Spinner;
const chalk = require("chalk");

const inquirer = require("./inq");

const conf = new Configstore(pkg.name);


//
//     getInstance: () => {
//         return octokit;
//     },
//     setGithubCredentials: async () => {
//         const credentials = await inquirer.askGithubCredentials();
//         const status = new Spinner("Authenticating you, please wait...");
//         status.start();
//
//         conf.set("github.token", credentials.token);
//
//         status.stop();
//
//         return credentials.token;
//         // try {
//         //     octokit.authenticate(
//         //         _.extend(
//         //             {
//         //                 type: "basic"
//         //             },
//         //             credentials
//         //         )
//         //     );
//         // } catch (e) {
//         // octokit.authenticate({
//         //     type: "oauth",
//         // });
//         // octokit.authenticate({
//         //     type: "token",
//         //     token: credentials.password
//         // });
//         // }
//     },
//
//     registerNewToken: async () => {
//         const status = new Spinner("Authenticating you, please wait...");
//         status.start();
//
//         try {
//             const response = await octokit.authorization.create({
//                 scopes: ["user", "public_repo", "repo", "repo:status"],
//                 note: "ginits, the command-line tool for initalizing Git repos"
//             });
//             const token = response.data.token;
//             if (token) {
//                 conf.set("github.token", token);
//                 return token;
//             } else {
//                 throw new Error("Missing Token", "GitHub token was not found in the response");
//             }
//         } catch (err) {
//             throw err;
//         } finally {
//             status.stop();
//         }
//     },
//     getStoredGithubToken: () => {
//         return conf.get("github.token");
//     }
//
//
// };


module.exports = {

    getInstance: () => {
        return octokit;
    },

    setGithubCredentials: async () => {
        const credentials = await inquirer.askGithubCredentials();
        octokit.authenticate(
            _.extend(
                {
                    type: "basic"
                },
                credentials
            )
        );
    },

    registerNewToken: async () => {
        const status = new Spinner("Authenticating you, please wait...");
        status.start();

        try {
            const response = await octokit.authorization.create({
                scopes: ["user", "public_repo", "repo", "repo:status"],
                note: "ginits, the command-line tool for initalizing Git repos"
            });
            const token = response.data.token;
            if (token) {
                conf.set("github.token", token);
                return token;
            } else {
                throw new Error("Missing Token", "Github token was not found in the response");
            }
        } catch (err) {
            throw err;
        } finally {
            status.stop();
        }
    },

    githubAuth: (token) => {
        octokit.authenticate({
            type: "oauth",
            token: token
        });
    },

    getStoredGithubToken: () => {
        return conf.get("github.token");
    },

    hasAccessToken: async () => {
        const status = new Spinner("Authenticating you, please wait...");
        status.start();

        try {
            const response = await octokit.authorization.getAll();
            const accessToken = _.find(response.data, (row) => {
                if (row.note) {
                    return row.note.indexOf("ginit") !== -1;
                }
            });
            return accessToken;
        } catch (err) {
            throw err;
            m;
        } finally {
            status.stop();
        }
    },

    regenerateNewToken: async (id) => {
        const tokenUrl = "https://github.com/settings/tokens/" + id;
        console.log("Please visit " + chalk.underline.blue.bold(tokenUrl) + " and click the " + chalk.red.bold("Regenerate Token Button.\n"));
        const input = await inquirer.askRegeneratedToken();
        if (input) {
            conf.set("github.token", input.token);
            return input.token;
        }
    }

};