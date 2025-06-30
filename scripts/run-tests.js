const { execSync } = require('child_process');

const specFiles = {
    get: 'src/tests/get.spec.ts',
    post: 'src/tests/post.spec.ts',
    put: 'src/tests/put.spec.ts',
    patch: 'src/tests/patch.spec.ts',
    delete: 'src/tests/delete.spec.ts',
};

const cliArgs = process.argv.slice(2);
const methodArgs = [];
const extraArgs = [];
for (const arg of cliArgs) {
    if (arg.startsWith('-')) {
        extraArgs.push(arg);
    } else {
        methodArgs.push(arg);
    }
}

// Allow inputs like "get post" or "post,get"
let args = methodArgs.join(' ');
args = args.replace(/,/g, ' ').trim();

let files;
if (!args) {
    files = Object.values(specFiles).join(' ');
} else {
    const methods = [...new Set(args.split(/\s+/))];
    const selected = methods
        .map((m) => specFiles[m.toLowerCase()])
        .filter(Boolean);
    if (selected.length === 0) {
        console.error(`Unknown method(s): ${args}`);
        process.exit(1);
    }
    files = selected.join(' ');
}

const cmd = `npx playwright test ${files} ${extraArgs.join(' ')}`.trim();
execSync(cmd, { stdio: 'inherit' });