// 注意画面生成
function createSceneS030(core) {
    var scene = new Scene();
    scene.backgroundColor = '#ffffff';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s030.jpg'];
    scene.addChild(bg);

    // シーンを返す
    return scene;

};