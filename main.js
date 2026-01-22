const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./walkingchopper.png");
ASSET_MANAGER.queueDownload("./standingchopper.png");
ASSET_MANAGER.queueDownload("./runchopper.png");
ASSET_MANAGER.queueDownload("./punch1.png");
ASSET_MANAGER.queueDownload("./punch2.png");
ASSET_MANAGER.queueDownload("./punch3.png");
ASSET_MANAGER.queueDownload("./jumpchopper.png");
ASSET_MANAGER.queueDownload("./idleluffy.png");
ASSET_MANAGER.queueDownload("./deadluffy.png");
ASSET_MANAGER.queueDownload("./idlejinbei.png");
ASSET_MANAGER.queueDownload("./deadjinbei.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");


	gameEngine.addEntity(new chopper(gameEngine));
	gameEngine.init(ctx);

	gameEngine.start();
});
