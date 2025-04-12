require('dotenv').config();
// Now, proceed with the React build command
const { execSync } = require('child_process');

try {
    execSync('react-scripts build', { stdio: 'inherit' });
    console.log('React build completed successfully with loaded environment variables.');
} catch (error) {
    console.error('Error during React build:', error);
    process.exit(1);
}