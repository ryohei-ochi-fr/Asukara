// SkyWay TURN Server
// const Peer = window.Peer;

// roomをグローバル変数に定義する
var room;

(async function main() {
	const localVideo = document.getElementById('js-local-stream');
	const remoteVideos = document.getElementById('js-remote-streams');

	const localStream = await navigator.mediaDevices
		.getUserMedia({
      // ここで音声の許可を設定できる
			// audio: true,
			audio: false,
			video: false,
		})
		.catch(console.error);

	// SkyWay TURN Server
	const Peer = window.Peer;
	const peer = (window.peer = new Peer({
		key: 'b78ac2d3-b7c3-4ccd-8a39-01b2b0ba9f74',
		debug: 3,
	}));

	var roomId = {
		value: "debugroom"
	};

	peer.on('open', () => {

		console.log("Peer.EVENTS.open");

		room = peer.joinRoom(roomId.value, {
			mode: "mesh",
			stream: localStream,
		});

		room.once('open', () => {
			console.log('=== You joined ===');
		});

		room.on('peerJoin', peerId => {
			console.log(`=== ${peerId} joined ===`);
		});

		room.on('data', ({ data, src }) => {
			// Show a message sent to the room and who sent
			console.log(`${src}: ${data}`);
		});


		// Render remote stream for new peer join in the room
		room.on('stream', async stream => {
			const newVideo = document.createElement('video');
			newVideo.srcObject = stream;
			newVideo.playsInline = true;
			// mark peerId to find it later at peerLeave event
			newVideo.setAttribute('data-peer-id', stream.peerId);
			remoteVideos.append(newVideo);
			await newVideo.play().catch(console.error);
		});

		// for closing room members
		room.on('peerLeave', peerId => {
			const remoteVideo = remoteVideos.querySelector(
				`[data-peer-id="${peerId}"]`
			);
			remoteVideo.srcObject.getTracks().forEach(track => track.stop());
			remoteVideo.srcObject = null;
			remoteVideo.remove();

			console.log(`=== ${peerId} left ===`);
		});


	});
})();