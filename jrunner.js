/**
 * Created by lifeg on 08/04/2017.
 */
var Jasmine = require("jasmine");
var SpecReporter = require("jasmine-spec-reporter");
var jrunner = new Jasmine();
jrunner.loadConfigFile("test/jasmine.json");
jrunner.env.clearReporters(); // jasmine >= 2.5.2, remove
// default reporter logs
jrunner.addReporter(new SpecReporter()); // add jasmine-spec-reporter
jrunner.loadConfigFile(); // load jasmine.json
// configuration
jrunner.execute();
//# sourceMappingURL=jrunner.js.map