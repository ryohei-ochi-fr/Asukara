function createSceneS100() {
    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = game.assets['img/s100.png'];
    game.rootScene.addChild(bg);

    bgm = game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'];

    // イベントのログ表示
    var round = function (num) {
        return Math.round(num * 1e3) / 1e3;
    };
    // game.rootScene.on('touchstart', function (evt) {
    // 	console.log('touchstart (' + round(evt.x) + ', ' + round(evt.y) + ')');
    // });
    // game.rootScene.on('touchmove', function (evt) {
    // 	console.log('touchmove (' + round(evt.x) + ', ' + round(evt.y) + ')');
    // });
    // game.rootScene.on('touchend', function (evt) {
    // 	console.log('touchend (' + round(evt.x) + ', ' + round(evt.y) + ')');
    // });


    // 譜面を描画
    // スプライトを生成 300px x 63sec
    var sprite1 = new Sprite(450, 18900 * 3);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface1 = new Surface(450, 18900 * 3);
    sprite1.image = surface1;
    game.rootScene.addChild(sprite1);

    // ノーツを描く
    surface1.context.fillStyle = "#B1CFFC";

    // surface1.context.fillRect(0, 18900 - 50, 149, 50);
    // 譜面の初期位置
    sprite1.x = 95 + 1
    sprite1.y = 0 - 18900 * 3

    // todo なんか判定エリアとずれてない？

    var lane = 0
    midiData.forEach(note => {
        // midiの1音のデータ(ノーツ)を書き出してみる
        // console.log(note.midi, note.time, note.duration, note.name);
        // console.log(note[0] + ",", note[1]);
        switch (note[0]) {
            case 48:
                lane = 0;
                break;
            case 50:
                lane = 150;
                break;
            case 52:
                lane = 300;
                break;
        }
        timming = note[1] * 300
        console.log(timming + ",", lane);

        surface1.context.fillStyle = "#B1CFFC";
        surface1.context.fillRect(lane, 18900 * 3 - timming - 50, 149, 50);

        // game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].play();

    })

    // 検証用 判定ラインを生成
    var judgeLine = new Sprite(450, 1);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(450, 1);
    // 四角形を描く 
    surface.context.fillStyle = "#FF0000";
    surface.context.fillRect(0, 0, 450, 1);
    // スプライトの設定諸々
    judgeLine.image = surface;
    judgeLine.x = 95;
    judgeLine.y = 285 + 50;
    game.rootScene.addChild(judgeLine);

    // 検証用 判定ノーツを生成
    var judgeNote = new Sprite(450, 50);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(450, 50);
    // 四角形を描く 半透明
    surface.context.fillStyle = "#00FF0080";
    surface.context.fillRect(0, 0, 450, 50);
    // スプライトの設定諸々
    judgeNote.image = surface;
    judgeNote.x = 95;
    judgeNote.y = 0 - 50;
    game.rootScene.addChild(judgeNote);

    // 判定ゾーンを生成
    var sprite = new Sprite(450, 50);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(450, 50);
    // 四角形を描く 透明度 0x80h = 50%(128/256)
    surface.context.fillStyle = "#E7B3FA80";
    surface.context.fillRect(0, 0, 450 - 1, 50);
    // スプライトの設定諸々
    sprite.image = surface;
    sprite.x = 95 + 1
    sprite.y = 285
    game.rootScene.addChild(sprite);

    // 時間の画面表示
    labelTime = new Label('current 0ms');
    labelTime.y = 0;
    game.rootScene.addChild(labelTime);

    labeljudgeTime = new Label('judge 0ms');
    labeljudgeTime.y = 20;
    game.rootScene.addChild(labeljudgeTime);

    labelTapTime = new Label('tap 0ms');
    labelTapTime.y = 40;
    game.rootScene.addChild(labelTapTime);

    labelGapTime = new Label('gap 0ms');
    labelGapTime.y = 60;
    game.rootScene.addChild(labelGapTime);

    // タッチイベントを設定
    sprite.addEventListener('touchstart', function (evt) {
        var touchTime = currentTime.getTime() - startTime.getTime();
        console.log('touchstart:  ' + touchTime + 'ms (' + round(evt.x) + ', ' + round(evt.y) + ')');
        labelTapTime.text = 'tap ' + touchTime + 'ms';
        labelGapTime.text = 'gap ' + (touchTime - judgeTime) + 'ms';

    });


    var callFps = 0;
    var callFlag = true;

    var currentTime;
    var startTime;
    var judgeFirstFlag = true;

    // スプライトの当たり判定
    judgeLine.on('enterframe', function (evt) {
        if (judgeLine.intersect(judgeNote)){
            if(judgeFirstFlag){
                judgeTime = currentTime.getTime() - startTime.getTime();
                console.log('judgeLine:  ' + judgeTime + 'ms');
                labeljudgeTime.text = 'judge ' + judgeTime + 'ms';
                judgeFirstFlag = false;
            }
        }else{
            judgeFirstFlag = true;
        }
    });

    sprite1.on('enterframe', function (evt) {
        if (callFlag) {
            // ここで60フレーム待っているから、初タップまでの序奏開始時間1秒は無視でよし
            if (callFps >= 60) {
                callFlag = false;
                // 判定ライン 100ms
                // startTime = new Date();
                // game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].volume = 0.5;
                // game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].play();
                bgm.play();
                bgm.volume = 0.2;

                // todo 正確にするならコールバック
                startTime = new Date();

            }else{
                startTime = new Date();
                currentTime = new Date();
            }
        }
        var touchTime = currentTime.getTime() - startTime.getTime();
        labelTime.text = 'current ' + touchTime + 'ms';

        // this.y += 10 / 4;
        this.y += 10 / 2;
        // this.y += 10;
        // this.y += 10 * 2;

        if (this.y > 18900) {
            this.y = 0;
        }

        judgeNote.y += 10 / 2;
        if(judgeNote.y > 360){
            judgeNote.y = 0 - 115;
        }

        // 描画後の時間を取得
        currentTime = new Date();

        callFps++;
    });

}