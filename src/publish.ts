import {retargetSourcemaps} from "retarget-sourcemaps-after-move";
import {rm, mkdir, cp, exec} from "shelljs";

function run() {
    let pub = ".tmp/publish";
    let srcRoot = "src/lib";
    rm("-rf", pub);
    rm("-rf", "dist_es2015");
    mkdir("-p", pub);
    mkdir("-p", `${pub}/_es2015`);
    cp("-r", [
        "package.json",
        "LICENSE.md",
        "README.md"
    ], pub);
    cp("-r", "dist/lib/.", pub);
    cp("-r", "src/lib/.", `${pub}/src`);
    retargetSourcemaps({
        srcRoot: {
            old: srcRoot,
            new: `${pub}/src`
        },
        distRoot: {
            old: "dist/lib",
            new: ".tmp/publish"
        },
        distGlob: "**/*.js"
    });
    exec("tsc --module es2015 --outDir dist_es2015");
    cp("-r", "dist_es2015/lib/.", `${pub}/_es2015`);
    retargetSourcemaps({
        srcRoot: {
            old: srcRoot,
            new: `${pub}/src`
        },
        distRoot: {
            old: "dist/lib",
            new: ".tmp/publish/_es2015"
        },
        distGlob: "**/*.js"
    });
}
run();
