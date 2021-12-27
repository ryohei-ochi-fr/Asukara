// ローディング画面生成
function createSceneS090(core) {
    var countFrame = 0;

    var scene = new Scene();
    // ここはsceneではなく、rootSceneの背景を変えないとだめ
    core.rootScene.backgroundColor = '#000000';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s090.png'];
    scene.addChild(bg);



    // todo 本来は曲の情報をここでアレコレする



    // s090 画面のフェードイン、フェードアウト
    scene.addEventListener(Event.ENTER_FRAME, function () {
        // jQueryでフェードイン
        if (countFrame == 0) {
            $(scene.element()).hide().fadeIn(1000);

        }

        // n秒経過
        if (countFrame == CORE_FPS * 4) {
            // jQueryでフェードアウト
            $(scene.element()).fadeOut(1000);
        }

        // n秒経過
        if (countFrame == CORE_FPS * 5) {
            // s100 プレイ画面を表示
            core.replaceScene(createSceneS100(core));
        }

        // console.log(countFrame);
        countFrame++;

    });

    // シーンを返す
    return scene;

};