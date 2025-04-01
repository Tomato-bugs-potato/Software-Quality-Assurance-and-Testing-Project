// const createJiraIssue = require('../utils/jiraReporter');
import createJiraIssue from '../utils/jiraReporter';
test('Intentional fail to test Jira integration', async () => {
  try {
    expect(1).toBe(2); // This will fail
  } catch (error) {
    await createJiraIssue(error);
    throw error; // Re-throw to fail the test
  }
});