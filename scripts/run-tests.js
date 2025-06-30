+27
-14

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
const routeArgs = [];
const extraArgs = [];

for (const arg of cliArgs) {
    if (arg.startsWith('-')) {
        extraArgs.push(arg);
    } else if (arg.startsWith('/')) {
        routeArgs.push(arg);
    } else {
        methodArgs.push(arg);
    }
}

// Allow inputs like "get post" or "post,get" and "/posts,/comments"
let args = methodArgs.join(' ');
args = args.replace(/,/g, ' ').trim();

let cmd;

if (routeArgs.length > 0) {
    const routes = [...new Set(routeArgs.join(' ').replace(/,/g, ' ').split(/\s+/))];
    const pattern = routes.map(r => r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const files = Object.values(specFiles).join(' ');
    cmd = `npx playwright test ${files} -g "${pattern}" ${extraArgs.join(' ')}`.trim();
} else {
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
    cmd = `npx playwright test ${files} ${extraArgs.join(' ')}`.trim();
}

execSync(cmd, { stdio: 'inherit' });