// 注意画面生成
function createSceneS020(core) {
    var scene = new Scene();
    scene.backgroundColor = '#ffffff';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s020.png'];
    scene.addChild(bg);

    // シーンを返す
    return scene;

};