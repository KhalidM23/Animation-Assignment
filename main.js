const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./monsterchopper.png");	
ASSET_MANAGER.queueDownload("./walkingchopper.png");
ASSET_MANAGER.queueDownload("./idlechopper1.png");
ASSET_MANAGER.queueDownload("./standingchopper.png");
ASSET_MANAGER.queueDownload("./runchopper.png");
ASSET_MANAGER.queueDownload("./chopper.png");
ASSET_MANAGER.queueDownload("./punch1.png");
ASSET_MANAGER.queueDownload("./punch2.png");
ASSET_MANAGER.queueDownload("./punch3.png");
ASSET_MANAGER.queueDownload("./jumpchopper.png");
ASSET_MANAGER.queueDownload("./idlechopper.png");
ASSET_MANAGER.queueDownload("./deadchopper.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");


	gameEngine.addEntity(new chopper(gameEngine));
	gameEngine.init(ctx);

	gameEngine.start();
});
