const { execSync } = require('child_process');

const versionType = process.env.npm_config_vir || 'patch';
console.log({ versionType });
if (!versionType)
{
    console.error('Please specify a version type (patch, minor, major)');
    process.exit(1);
}

execSync(`cd projects/mt-select-dropdown && npm version ${ versionType }`);
