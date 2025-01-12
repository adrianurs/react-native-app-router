const path = require('path');
const spy = require('@parcel/watcher');
const {execFile, exec} = require('child_process');

const generateRoutesPath =
    'scripts/generate-routes.js';
const generateImportsPath =
    'scripts/generate-imports.js';

const appRouterDir = path.resolve(
    __dirname,
    '../../../node_modules/react-native-app-router'
);

if (require.main === module) {
    console.log('react-native-app-router: starting watchers');
    init();
}

function init() {
    runGeneratorScripts();

    return watchAppDir();
}

function watchAppDir() {
    const screensDir = path.resolve(__dirname, '../../../src/app');

    spy.subscribe(screensDir, runGeneratorScripts, {
        persistent: true,
    });

    console.log(`Watching for changes in ${screensDir}`);

    const unscribe = () => spy.unsubscribe(screensDir, runGeneratorScripts, {persistent:true});
    return unscribe;
}

function runGeneratorScripts() {
    exec('mkdir dist/output', { cwd: appRouterDir });

    execFile('node', [generateRoutesPath], { cwd: appRouterDir }, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error in generate-routes: ${err}`);
            return;
        }
        if (stderr) console.error(`Stderr: ${stderr}`);

        execFile('node', [generateImportsPath], { cwd: appRouterDir }, (err2, stdout2, stderr2) => {
            if (err2) {
                console.error(`Error in generate-imports: ${err2}`);
                return;
            }
            if (stderr2) console.error(`Stderr: ${stderr2}`);
        });
    });
}
