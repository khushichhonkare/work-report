import express from 'express';
import { exec } from 'child_process';
import generateWorkReport from './generateWorkReport.js'; // Updated import

const app = express();

// Function to run Git commands
const runGitCommand = (command) => 
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }
      if (stderr) {
        reject(new Error(`stderr: ${stderr}`));
        return;
      }
      resolve(stdout);
    });
  });

// Main function to process Git logs and generate report
(async () => {
  try {
    const result = await runGitCommand('git --no-pager log');
    let match;
    const messages = [];
    const regex = /(refactor|merge|feat|fix): ([^\n]+)/g;

    // Extract relevant messages
    do {
      match = regex.exec(result);
      if (match !== null) {
        messages.push(match[0]);
      }
    } while (match !== null);

    // Generate the report
    // const workPlan = await generateReport(messages);
    console.log(`------------------------------`);
    const workReport = generateWorkReport(messages);
    console.log(workReport);
    console.log(`------------------------------`);

  } catch (err) {
    console.error(`Error: ${err}`);
  }
})();

// Start the Express server
app.listen(3000, () => {
  console.log("Server activated at 3000");
});

export default app;
