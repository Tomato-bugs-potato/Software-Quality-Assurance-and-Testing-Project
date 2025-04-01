require('dotenv').config();
const fetch = require('node-fetch');

async function createJiraIssue(error) {
  const { JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY, GITHUB_SHA } = process.env;
  const jiraUrl = `https://${process.env.JIRA_INSTANCE}/rest/api/3/issue`;

  const body = {
    fields: {
      project: { key: JIRA_PROJECT_KEY },
      summary: `CI Failure: ${error.message.split('\n')[0]}`,
      description: {
        type: "doc",
        version: 1,
        content: [{
          type: "paragraph",
          content: [
            { text: `Commit: ${GITHUB_SHA}\n\n`, type: "text" },
            { text: "Error:\n```\n" + error.stack + "\n```", type: "text" }
          ]
        }]
      },
      issuetype: { name: "Bug" }
    }
  };

  const response = await fetch(jiraUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) throw new Error(`Jira API Error: ${await response.text()}`);
  return response.json();
}

module.exports = createJiraIssue;