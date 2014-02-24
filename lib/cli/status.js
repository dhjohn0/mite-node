var path = require("path"),
	MigrationProvider = require("../migrationProvider"),
	reporter = require("./reporter"),
	printMigrationList = require("./util").printMigrationList;

module.exports = StatusCommand;

function StatusCommand() {}

StatusCommand.prototype.execute = function(mite, miteRoot) {
	var provider = new MigrationProvider(path.join(miteRoot, "migrations"));

	return mite.status(provider.getMigrations()).then(function(miteStatus) {
		if (miteStatus.clean) {
			reporter.success("clean");
		} else {
			if (miteStatus.dirtyMigrations) {
				printMigrationList("dirty migrations:", "info", miteStatus.dirtyMigrations, "err");
			}

			if (miteStatus.unexecutedMigrations) {
				printMigrationList("unexecuted migrations:", "info", miteStatus.unexecutedMigrations, "warn");
			}
		}
	});
};