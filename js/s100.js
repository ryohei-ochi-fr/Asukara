function createSceneS100(core) {

    var scene = new Scene();

    // 背景を生成
    var bg = new Sprite(SCREEN_WIDTH, SCREEN_HEIGHT);
    bg.image = core.assets['img/s100.png'];
    scene.addChild(bg);

    var bgm = core.assets[PLAYSONG];

    // イベントのログ表示用 丸め関数
    var round = function (num) {
        return Math.round(num * 1e3) / 1e3;
    };

    // ノーツを配置するための譜面の幅
    const notesMaxWidth = 450;

    // ノーツ1音を描画する幅(px)
    const notesWidth = 150;

    // ノーツ1音を描画する高さ(px)
    const notesHight = 50;

    // 判定ゾーンを描画する高さ(px)
    const judgeHight = 60;

    // 発音の判定時間(ms)
    // todo ほんとは計算して設定すべき 判定幅60px 移動高さ6px 10fps
    // 1 / 60 * 10 = 0.16666...(秒) * 1000 = 166ms 
    const judgeTimeMs = 166;

    // パーフェクト判定する時間(ms) 3fps
    // 1 / 60 * 3 = 0.05(秒) * 1000 = 50ms
    const judgePerfectMs = 50;

    // スコア集計
    var resultScore = 0;

    // 1秒あたりの譜面移動量(px)
    const pxPerSec = SCREEN_HEIGHT;

    // 音を出すまでの待機秒
    const stanbySec = 3;

    // 曲の長さ(秒)
    const midiDuration = 90;

    // 譜面の長さ 360px x 100sec + stanbySec
    const notesLength = pxPerSec * (midiDuration + stanbySec);
    console.log('notesLength = ' + notesLength);

    // 譜面のスプライトを生成
    var scoreNotes = new Sprite(notesMaxWidth, notesLength);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface1 = new Surface(notesMaxWidth, notesLength);
    scoreNotes.image = surface1;
    scene.addChild(scoreNotes);

    // 譜面にノーツを描く色を先行して設定
    surface1.context.fillStyle = "#B1CFFC";

    // 譜面の初期位置
    scoreNotes.x = 95 + 1
    scoreNotes.y = 0 - notesLength + 360;

    // 検証用 midiData
    // midiData = [
    //     [50, 0],
    //     [50, 1],
    //     [50, 2],
    //     [50, 3],
    //     [50, 4],
    //     [50, 5],
    //     [50, 6],
    //     [50, 7],
    //     [50, 8],
    //     [50, 9],
    // ];

    var lane = 0;
    notesData[0].forEach(note => {
        // midiDataの1音の音程をレーン配置に変換する
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

        // timming(px) = 待機時間(px) + ノーツの出現時間(秒) * 1秒あたりのスクロール数(px) 360px
        var timming = Math.floor(note[1] * pxPerSec);
        // console.log('timming is: ' + timming + ",", lane);

        // 149pxはノーツの幅
        surface1.context.fillRect(lane, notesLength - timming - notesHight, 149, notesHight);
        // console.log('height is: ' + (notesLength - timming - notesHight) + 'px');

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
    var sprite = new Sprite(notesMaxWidth, judgeHight);
    // Surfaceオブジェクトを生成しスプライトに連結
    var surface = new Surface(notesMaxWidth, judgeHight);
    // 四角形を描く 透明度 0x80h = 50%(128/256)
    surface.context.fillStyle = "#E7B3FA80";
    surface.context.fillRect(0, 0, notesMaxWidth - 1, judgeHight);
    // スプライトの設定諸々
    sprite.image = surface;
    sprite.x = 95 + 1
    // todo 計算で求めよう
    sprite.y = 275
    scene.addChild(sprite);

    // タッチイベントを設定 デバッグ用リスタート
    scene.addEventListener('touchstart', function (evt) {
        if (evt.x < 80) {
            bgm.stop();
            core.replaceScene(createSceneS100(core));
        }
    });

    // タッチイベントを設定
    sprite.addEventListener('touchstart', function (evt) {

        // タッチ(タップ)した時間
        var touchTimeMs = currentTime.getTime() - startTime.getTime();
        // console.log('touchstart:  ' + touchTimeMs + 'ms (' + round(evt.x) + ', ' + round(evt.y) + ')');

        const getNoteFunction = (element) => element[1] >= ((touchTimeMs - judgeTimeMs) / 1000);

        nowNote = midiData[0].findIndex(getNoteFunction)
        if (nowNote != -1) {
            // 配列から値が取得できた場合

            // console.log(nowNote);
            // console.log(midiData[0][nowNote]);
            // MIDIデータ上の発音する音階
            console.log(midiData[0][nowNote][0]);
            // MIDIデータ上の正しい発音の時間(発音時間)
            console.log(midiData[0][nowNote][1]);

            // 判定時間(秒をmsに変換) - タッチ時間
            var judgeDiffMs = (midiData[0][nowNote][1] * 1000) - touchTimeMs;

            console.log('touchTimeMs:' + touchTimeMs);
            console.log('judgeDiffMs:' + judgeDiffMs);

            if(Math.sign(judgeDiffMs)){
                // 負の数の場合は通過している(ハズ)

                if (judgeTimeMs >= judgeDiffMs) {
                    // 判定時間に収まっていれば発音(ノーマル判定)
    
                    // 発音
                    synth.send([0x91, midiData[0][nowNote][0], 100]);
                    // roomに送信
                    room.send('note: 0,' + midiData[0][nowNote][0]);
    
                    // パーフェクト判定
                    if(judgePerfectMs >= judgeDiffMs){
                        // パーフェクトアニメーション
                        resultScore += 100;
    
                    }else{
                        // ノーマルアニメーション
                        resultScore += 80;
                       
                    }
                    console.log('resultScore =' + resultScore);
    
                    // コンボ判定用にインデックス(nowNote)を保存
                    // todo 間に合えば実装する
                }
    
            }

            // todo コンボの判定
            // 配列の操作でうまくできるよ？
        }

        // todo 後で消すデバッグ用
        labelTapTime.text = 'tap ' + touchTimeMs + 'ms';
        labelGapTime.text = 'gap ' + (touchTimeMs - judgeTime) + 'ms';

    });

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

    labelScoreNotes = new Label('scoreNotes.y 0px');
    labelScoreNotes.y = 80;
    scene.addChild(labelScoreNotes);

    var callFps = 0;
    var callFlag = true;

    var currentTime;
    var startTime;
    var judgeFirstFlag = true;

    var moveHeight = 6;

    // スプライトの当たり判定 デバッグ用
    judgeLine.on(Event.ENTER_FRAME, function (evt) {
        if (judgeLine.intersect(judgeNote)) {
            if (judgeFirstFlag) {
                judgeTime = currentTime.getTime() - startTime.getTime();
                // console.log('judgeLine:  ' + judgeTime + 'ms');
                labeljudgeTime.text = 'judge ' + judgeTime + 'ms';
                labelScoreNotes.text = 'scoreNotes.y ' + scoreNotes.y + 'px';
                judgeFirstFlag = false;
            }
        } else {
            judgeFirstFlag = true;
        }
    });

    scoreNotes.on(Event.ENTER_FRAME, function (evt) {
        if (callFlag) {

            // 曲の鳴り出しまでは3秒で 60fps * 3sec
            if (callFps >= CORE_FPS * stanbySec) {
                callFlag = false;
                // 判定ライン幅 100ms
                // startTime = new Date();
                bgm.currentTime = 0;
                bgm.play();
                bgm.volume = 0.1;

                // todo 正確にするならコールバック
                // startTime = new Date();

            } else {
                startTime = new Date();
                currentTime = new Date();
            }
        } else {
            // 譜面の移動開始

            // 譜面の終端を判定
            if (this.y > notesHight) {
                this.y = 0;
                // console.log('notes end... next scene')
                // todo フェードアウトしてからのー
                bgm.stop();
                core.replaceScene(createSceneS200(core));
            }

            // ノーツを描画したのは 1秒 = 300px
            // 60fpsは Event.ENTER_FRAME が1秒に60回
            // 300pxが1秒で移動するためには？ 300px / 60 = 5px ということで、5px を加算
            // いや、実測するとjudgeNoteは1.5秒
            // 360px / 60fps = 6px
            // this.y += SCREEN_HEIGHT / 60;
            this.y += moveHeight;
        }
        var touchTimeMs = currentTime.getTime() - startTime.getTime();
        labelTime.text = 'current ' + touchTimeMs + 'ms';


        // メトロノーム的な緑のやつのループ
        // judgeNote.y += SCREEN_HEIGHT / 60;
        judgeNote.y += moveHeight;
        if (judgeNote.y >= SCREEN_HEIGHT) {
            judgeNote.y = 0;
        }

        // 描画後の時間を取得
        currentTime = new Date();

        callFps++;
    });

    // シーンを返す
    return scene;

}