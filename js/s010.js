// チームロゴ画面生成
function createSceneS010(core) {
    var countFrame = 0;

    var scene = new Scene();
    scene.backgroundColor = '#ffffff';

    var logo = new Sprite(200, 200);
    logo.image = core.assets['img/s010_ashita_logo.png'];
    logo.x = SCREEN_WIDTH / 2 - logo.width / 2;
    logo.y = SCREEN_HEIGHT / 2 - logo.height / 2 - 50;
    scene.addChild(logo);

    var title = new Label('was want to be flying in the blue sky');
    title.textAlign = 'center';
    title.color = '#606060';
    title.width = SCREEN_WIDTH;
    title.x = 0;
    title.y = 255;
    title.font = "24px 'Vujahday Script',cursive";
    scene.addChild(title);

    // s010 画面のフェードイン、フェードアウト
    scene.addEventListener(Event.ENTER_FRAME, function () {
        // jQueryでフェードイン
        if (countFrame == 0) {
            $(scene.element()).hide().fadeIn(500);
            // サウンドロゴ
            core.assets['mp3/se0028.mp3'].play();

        }

        // n秒経過
        if (countFrame == CORE_FPS * 4.5) {
            // jQueryでフェードアウト
            $(scene.element()).fadeOut(500);
        }

        // n秒経過
        if (countFrame == CORE_FPS * 6) {
            // s020 注意書きページを表示
            core.replaceScene(createSceneS020(core));
        }

        console.log(countFrame);
        countFrame++;

    });

    // シーンを返す
    return scene;

};