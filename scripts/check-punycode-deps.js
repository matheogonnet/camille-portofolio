const { execSync } = require('child_process');
const { colored } = require('termcolor');

try {
    console.log(colored.cyan('Checking for dependencies using punycode...'));
    
    const output = execSync('npm ls punycode').toString();
    
    console.log(colored.yellow('The following packages depend on punycode:'));
    console.log(output);
    
    console.log(colored.green('Consider updating these packages to their latest versions.'));
} catch (error) {
    console.error(colored.red('Error checking dependencies:'), error.message);
} 