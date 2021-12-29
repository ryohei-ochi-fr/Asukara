//おまじない
enchant();

//変数宣言
var game;
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;
const CORE_FPS = 60;

// 暫定の固定
const PLAYSONG = 'mp3/014_shining_star.mp3';

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
function removeScene(scene) {
	while (scene.firstChild) {
		scene.removeChild(scene.firstChild);
	}
}

var bgm;
var labelTime;
var labeljudgeTime;
var labelTapTime;
var labelGapTime;
var judgeTime;


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
		'mp3/00039_hajimari.mp3',
		// s040 メニュー画面
		'img/s040.png',
		'mp3/00093_The Snowmobile.mp3',
		// s090 ローディング画面(曲紹介だけで何もしていない)
		'img/s090.png',
		// s100 プレイ画面
		'img/s100.png',
		'img/PERFECT.png',
		'img/GOOD.png',
		'img/MISS.png',
		'img/resultScore_sample.png',
		// s200 スコア画面
		'img/s200.png',
		// s300 クレジット画面
		'img/s300.png',
		// other
		// 'mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3',
		PLAYSONG,
	);

	game.onload = function () {
		// ルートシーンの背景色
		game.rootScene.backgroundColor = "#ffffff";

		// s010 チームロゴ画面の読み込み
		// s010 -> s020 -> s030 と遷移する

		// デバッグ時はs030へすっ飛ばす
		// var currentScene = createSceneS030(game);

		// デバッグ時はs090へすっ飛ばす
		// var currentScene = createSceneS090(game);

		// デバッグ時はs100へすっ飛ばす
		var currentScene = createSceneS100(game);

		// リリースするときはここから
		// var currentScene = createSceneS010(game);

		// todo 前画面の要素を削除するべし


		// 現在表示しているシーンを次のシーンに置き換える
		game.replaceScene(currentScene);

		// todo 全体的に音量大きすぎない？

	}

	//ゲームスタート
	game.start();

}