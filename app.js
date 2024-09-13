import express from 'express';
import { exec } from 'child_process';

const app = express();

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


(async () => {
  try {
    const result = await runGitCommand(
      'git --no-pager log'
    );

    const regex = /\b(?:refactor|merge|feat|fix): ([^\n]+)/gi;
    
    // Use matchAll to get all matches at once
    const messages = [...result.matchAll(regex)].map(match => match[0]);

    console.log(`Full Git log output: ${result}`);  // Optional, prints the full log
    console.log(`Filtered Git commit messages: ${messages}`);  // Prints filtered commit messages
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
})();

// Start the Express server
app.listen(3000, () => {
  console.log('Server activated at port 3000');
});

export default app;
