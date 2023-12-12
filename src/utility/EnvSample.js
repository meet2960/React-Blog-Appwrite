import fs from 'fs';
// import path from "path";

fs.watch('.env', eventType => {
  if (eventType === 'change') {
    const env = fs.readFileSync('.env', 'utf-8');
    const sample = env.replace(/=.*/g, '= " "'); // Replace all values with an empty string
    fs.writeFileSync('.env.sample', sample);
  }
});
