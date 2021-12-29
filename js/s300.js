// クレジット画面生成
function createSceneS300(core) {
    var scene = new Scene();
    scene.backgroundColor = '#000000';

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s300.png'];
    scene.addChild(bg);

    // エンドボタン
    var buttonWidth = 150;
    var buttonHeight = 75;
    var playButton = new Sprite(buttonWidth, buttonHeight);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(buttonWidth, buttonHeight);
    // 四角形を描く 
    // surface.context.fillStyle = "#FF000080";
    surface.context.fillStyle = "#FF000000";
    surface.context.fillRect(0, 0, buttonWidth, buttonHeight);
    // スプライトの設定諸々
    playButton.image = surface;
    playButton.x = SCREEN_WIDTH - buttonWidth - 20;
    playButton.y = 260;

    // タッチイベントを設定
    playButton.addEventListener('touchstart', function (evt) {
        // core.assets['mp3/00093_The Snowmobile.mp3'].stop();
        core.replaceScene(createSceneS030(core));

    });

    scene.addChild(playButton);

    // todo クレジット画面のBGMを探す
    // todo ループの処理
    // core.assets['mp3/00093_The Snowmobile.mp3'].play();

    // シーンを返す
    return scene;

};