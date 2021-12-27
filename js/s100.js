function createSceneS100(core) {

    var scene = new Scene();

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s100.png'];
    scene.addChild(bg);

    bgm = core.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'];

    // イベントのログ表示用 丸め関数
    var round = function (num) {
        return Math.round(num * 1e3) / 1e3;
    };

    // ノーツを配置するための譜面の幅
    const notesMaxWidth = 450;

    // ノーツ1音を描画する高さ(px)
    const notesHight = 50;

    // ノーツ1音を描画する幅(px)
    const notesWidth = 150;

    // 1秒あたりの譜面移動量(px)
    const pxPerSec = 300;

    // 曲の長さ(秒)
    const midiDuration = 100;

    // 譜面の長さ 300px x 100sec
    const notesLength = pxPerSec * midiDuration;

    // 譜面のスプライトを生成
    var sprite1 = new Sprite(notesMaxWidth, notesLength);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface1 = new Surface(notesMaxWidth, notesLength);
    sprite1.image = surface1;
    scene.addChild(sprite1);

    // 譜面にノーツを描く色を先行して設定
    surface1.context.fillStyle = "#B1CFFC";

    // 譜面の初期位置
    sprite1.x = 95 + 1
    sprite1.y = 0 - notesLength;

    // todo なんか判定エリアとずれてない？

    var lane = 0;
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
        // ノーツの出現時間(秒) * 1秒あたりのスクロール数(px) 300px
        timming = note[1] * pxPerSec;
        console.log(timming + ",", lane);

        // surface1.context.fillStyle = "#B1CFFC";
        surface1.context.fillRect(lane, notesLength - timming - notesHight, 149, notesHight);

        // console.log('notes is: ' + (notesLength - timming - notesHight));

    })

    // 検証用 判定ラインを生成
    var judgeLine = new Sprite(notesMaxWidth, 1);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(notesMaxWidth, 1);
    // 四角形を描く 
    surface.context.fillStyle = "#FF0000";
    surface.context.fillRect(0, 0, notesMaxWidth, 1);
    // スプライトの設定諸々
    judgeLine.image = surface;
    judgeLine.x = 95;
    judgeLine.y = 285 + notesHight;
    scene.addChild(judgeLine);

    // 検証用 判定ノーツを生成 メトロノーム的な緑の帯
    var judgeNote = new Sprite(notesMaxWidth, notesHight);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(notesMaxWidth, notesHight);
    // 四角形を描く 半透明
    surface.context.fillStyle = "#00FF0080";
    surface.context.fillRect(0, 0, notesMaxWidth, notesHight);
    // スプライトの設定諸々
    judgeNote.image = surface;
    judgeNote.x = 95;
    judgeNote.y = 0 - notesHight;
    // コメントアウトして非表示
    // scene.addChild(judgeNote);

    // 判定ゾーンを生成
    var sprite = new Sprite(notesMaxWidth, notesHight);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(notesMaxWidth, notesHight);
    // 四角形を描く 透明度 0x80h = 50%(128/256)
    surface.context.fillStyle = "#E7B3FA80";
    surface.context.fillRect(0, 0, notesMaxWidth - 1, notesHight);
    // スプライトの設定諸々
    sprite.image = surface;
    sprite.x = 95 + 1
    sprite.y = 285
    scene.addChild(sprite);

    // 時間の画面表示
    // todo このブロックはデバッグ用なので後で消す
    labelTime = new Label('current 0ms');
    labelTime.y = 0;
    scene.addChild(labelTime);

    labeljudgeTime = new Label('judge 0ms');
    labeljudgeTime.y = 20;
    scene.addChild(labeljudgeTime);

    labelTapTime = new Label('tap 0ms');
    labelTapTime.y = 40;
    scene.addChild(labelTapTime);

    labelGapTime = new Label('gap 0ms');
    labelGapTime.y = 60;
    scene.addChild(labelGapTime);

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
    judgeLine.on(Event.ENTER_FRAME, function (evt) {
        if (judgeLine.intersect(judgeNote)) {
            if (judgeFirstFlag) {
                judgeTime = currentTime.getTime() - startTime.getTime();
                console.log('judgeLine:  ' + judgeTime + 'ms');
                labeljudgeTime.text = 'judge ' + judgeTime + 'ms';
                judgeFirstFlag = false;
            }
        } else {
            judgeFirstFlag = true;
        }
    });

    sprite1.on(Event.ENTER_FRAME, function (evt) {
        if (callFlag) {
            // ここで60フレーム待っているから、初タップまでの序奏開始時間1秒は無視でよし
            if (callFps >= 60) {
                callFlag = false;
                // 判定ライン 100ms
                // startTime = new Date();
                // core.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].volume = 0.5;
                // core.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].play();
                bgm.play();
                bgm.volume = 0.2;

                // todo 正確にするならコールバック
                startTime = new Date();

            } else {
                startTime = new Date();
                currentTime = new Date();
            }
        }
        var touchTime = currentTime.getTime() - startTime.getTime();
        labelTime.text = 'current ' + touchTime + 'ms';

        // ノーツを描画したのは 1秒 = 300px
        // 60fpsは Event.ENTER_FRAME が1秒に60回
        // 300pxが1秒で移動するためには？ 300px / 60 = 5px ということで、5px を加算
        this.y += 5;
        console.log('y: ' + this.y);

        if (this.y > notesHight) {
            this.y = 0;
            console.log('notes end... next scene')
            // todo フェードアウトしてからのー
            core.replaceScene(createSceneS200(core));
        }

        judgeNote.y += 10 / 2;

        // メトロノーム的な緑のやつのループ
        if (judgeNote.y > 360) {
            judgeNote.y = 0 - 115;
        }

        // 描画後の時間を取得
        currentTime = new Date();

        callFps++;
    });

    // シーンを返す
    return scene;

}