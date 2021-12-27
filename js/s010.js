// チームロゴ画面生成
function createSceneS010(core) {

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

    // シーンを返す
    return scene;

};