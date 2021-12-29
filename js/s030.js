var round = function (num) {
    return Math.round(num * 1e3) / 1e3;
};

// スタート画面生成
function createSceneS030(core) {
    var scene = new Scene();
    scene.backgroundColor = '#ffffff';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s030.png'];
    scene.addChild(bg);

    // スタートボタン
    var buttonWidth = 200;
    var buttonHeight = 75;
    var startButton = new Sprite(buttonWidth, buttonHeight);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(buttonWidth, buttonHeight);
    // 四角形を描く 
    // surface.context.fillStyle = "#FF000080";
    surface.context.fillStyle = "#FF000000";
    surface.context.fillRect(0, 0, buttonWidth, buttonHeight);

    // スプライトの設定諸々
    startButton.image = surface;
    startButton.x = SCREEN_WIDTH / 2 - buttonWidth / 2;
    startButton.y = 240;

    // タッチイベントを設定
    startButton.addEventListener('touchstart', function (evt) {
        // console.log('touchstart:  ' + 'ms (' + round(evt.x) + ', ' + round(evt.y) + ')');

        // BGM停止
        core.assets['mp3/00039_hajimari.mp3'].stop();

        // メニュー画面へ
        core.replaceScene(createSceneS040(core));

    });

    scene.addChild(startButton);

    // サウンドロゴ
    // todo ループの処理
    core.assets['mp3/00039_hajimari.mp3'].play();

    // シーンを返す
    return scene;

};