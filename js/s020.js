// 注意画面生成
function createSceneS020(core) {
    var countFrame = 0;

    var scene = new Scene();
    scene.backgroundColor = '#ffffff';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s020.png'];
    scene.addChild(bg);

    scene.addEventListener(Event.ENTER_FRAME, function () {
        // n秒経過
        if (countFrame == CORE_FPS * 5) {
            // s030 スタート画面を表示
            core.replaceScene(createSceneS030(core));
        }

        // console.log(countFrame);
        countFrame++;

    });

    // シーンを返す
    return scene;

};