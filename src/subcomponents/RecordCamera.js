import React, { useRef } from 'react';

import '../assets/css/main.css';

function RecordCamera() {
  const videoRef = useRef();
  console.log(videoRef);

  const constraints = {
    video: { width: 355, height: 200, aspectRatio: 1.777777778 },
    audio: true,
  };

  try {
    navigator.mediaDevices.getUserMedia =
      navigator.mediaDevices.getUserMedia ||
      navigator.mediaDevices.webkitGetUserMedia ||
      navigator.mediaDevices.mozGetUserMedia;

    navigator.mediaDevices
      .getUserMedia(constraints)

      .then(function (stream) {
        videoRef.current.srcObject = stream;
      })

      .catch(function (e) {
        console.log('getUsermedia Error:', e);
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className='videoPlayers'>
      <div className='screenRecording'>
        <video controls autoPlay></video>
      </div>
      <div className='cameraRecording'>
        <video ref={videoRef} autoPlay controls></video>
      </div>
    </div>
  );
}

export default RecordCamera;
