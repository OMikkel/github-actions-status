import * as vscode from "vscode";
import { Octokit } from "octokit";

const getAllWorkflows = async (session: vscode.AuthenticationSession) => {

    const octokit = new Octokit({ auth: session.accessToken });
    const { data: { login } } = await octokit.request('GET /users/{username}', {
        username: 'OMikkel'
      });

    console.log("Hello, %s", login);
    const test = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
        owner: login,
        repo: process.env.REPO as string
    });
    console.log(test);

};

export default getAllWorkflows;