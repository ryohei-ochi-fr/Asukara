// 最大化ボタン
function goFullScreen() {
	var stage = document.getElementById('enchant-stage');

	fullScreen(stage);
}

// Full Screen
function fullScreen(target){
	//Chrome15+, Safari5.1+, Opera15+
	if (target.webkitRequestFullscreen) {
		target.webkitRequestFullscreen(); 
	}
	//FF10+
	else if (target.mozRequestFullScreen) {
		target.mozRequestFullScreen(); 
	}
	//IE11+
	else if (target.msRequestFullscreen) {
		target.msRequestFullscreen(); 
	}
	// HTML5 Fullscreen API仕様
	else if (target.requestFullscreen) {
		target.requestFullscreen(); 
	}
	// 未対応
	else {
		alert('ご利用のブラウザはフルスクリーン操作に対応していません');
	}
}
 
// Cancel Full Screen
function cancelFullScreen(target){
	//Chrome15+, Safari5.1+, Opera15+
	if (document.webkitRequestFullscreen) {
		document.webkitCancelFullScreen(); 
	}
	//FF10+
	else if (document.mozRequestFullScreen) {
		document.mozCancelFullScreen(); 
	}
	//IE11+
	else if (document.msRequestFullscreen) {
		document.msExitFullscreen(); 
	}
	// HTML5 Fullscreen API仕様
	else if (document.requestFullscreen) {
		document.cancelFullScreen(); 
	}
}