//おまじない
enchant();

//変数宣言
var game;
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;
const CORE_FPS = 60;

// jQueryを利用するため、
// enchantの中でHTML要素として画面に表示される要素に対して、
// elementプロパティでelementを取り出せるようにする。
enchant.Entity.prototype.element = function () {
	return this._element;
}
enchant.Scene.prototype.element = function () {
	return this._element;
};
enchant.Surface.prototype.element = function () {
	return this._element;
};

// 画面の切り替えをして前のシーンが画面上消えてもシーンで使った要素が残っています。
// これはたぶんHTML5ゲームの特徴で、
// プログラムの変数とは関係なくHTMLの要素として記録されているので、
// 別にHTMLの要素を消す必要があるようです。
function removeScene(scene){
    while(scene.firstChild){
        scene.removeChild(scene.firstChild);
    }
}

var bgm;
var labelTime;
var labeljudgeTime;
var labelTapTime;
var labelGapTime;
var judgeTime;
var countFrame = 0;


// ここからゲームが始まるよー
function startGame() {
	//ゲームオブジェクトの作成
	var game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	game.fps = CORE_FPS;

	// nowLoading.jsで上書きされたローディング画面が表示される
	game.preload(
		// s010 チームロゴ
		// todo サウンドのフェードイン
		'mp3/se0028.mp3',
		'img/s010_ashita_logo.png',
		// s020 注意画面
		'img/s020.png',
		// s030 スタート画面
		'img/s030.jpg',
		// other
		'mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3',
		'img/s100.png',
	);

	game.onload = function () {
		// ルートシーンの背景色
		game.rootScene.backgroundColor = "#ffffff";
		game.rootScene.addEventListener(Event.ENTER_FRAME, function () {
			// n秒経過
			if (countFrame == CORE_FPS * 6) {
				// s020 注意書きページを表示
				game.replaceScene(createSceneS020(game));
			}

			// n秒経過
			if (countFrame == CORE_FPS * (6 + 5)) {
				// s030 スタートページを表示
				game.replaceScene(createSceneS030(game));
				// todo イベントリスナーを削除
			}
			console.log(countFrame);
			countFrame++;
		});

		// s010 チームロゴ画面の読み込み
		var currentScene = createSceneS010(game);

		// s010 画面のフェードイン、フェードアウト
		// currentScene シーンのイベント
		// game.rootScene ゲーム全体のイベント
		currentScene.addEventListener(Event.ENTER_FRAME, function () {
			// jQueryでフェードイン
			if (countFrame == 0) {
				$(currentScene.element()).hide().fadeIn(500);
			}

			// n秒経過
			if (countFrame == CORE_FPS * 4.5) {
				// jQueryでフェードアウト
				$(currentScene.element()).fadeOut(500);
			}

		});

		// 現在表示しているシーンを次のシーンに置き換える
		//game.replaceScene(currentScene);

		// サウンドロゴ
		game.assets['mp3/se0028.mp3'].play();

	}

	//ゲームスタート
	game.start();

}