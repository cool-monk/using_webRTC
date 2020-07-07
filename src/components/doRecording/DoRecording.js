import React, { useRef } from 'react';
import { Button } from '@material-ui/core';
import StartRecord from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import RecordRTC from 'recordrtc';
import io from 'socket.io-client';
import ss from 'socket.io-stream';
// import ss from 'socket.io-stream';

let socket;

function DoRecording() {
  const videoRef = useRef();
  const screenRef = useRef();
  var camRecorder;
  var screenRecorder;
  const socketEndpoint = 'localhost:8000';
  socket = io(socketEndpoint);
  var mediaRecorder;

  // TODO these are for webrtc
  function invokeGetDisplayMedia(success, error) {
    var displaymediastreamconstraints = {
      video: {
        mimeType: 'video/mp4',
      },
    };

    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices
        .getDisplayMedia(displaymediastreamconstraints)
        .then((screenStream) => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (mic) {
              screenStream.addTrack(mic.getTracks()[0]);
              success(screenStream);
            });
        })
        .catch(error);
    } else {
      navigator
        .getDisplayMedia(displaymediastreamconstraints)
        .then(success)
        .catch(error);
    }
  }

  function captureCamera(callback) {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          mimeType: 'video/mp4',
        },
      })
      .then(function (camera) {
        callback(camera);
      })
      .catch(function (error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
      });
  }

  function captureScreen(callback) {
    invokeGetDisplayMedia(
      function (screen) {
        // addStreamStopListener(screen, function () {
        //   handleStopRecording();
        // });
        console.log('something to be added here');
        console.log('we have screen here', screen);
        callback(screen);
      },
      function (error) {
        console.error(error);
        alert(
          'Unable to capture your screen. Please check console logs.\n' + error
        );
      }
    );
  }

  function handleStartRecording() {
    // connecting the server socket

    captureCamera(function (camera) {
      console.log(camera);
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      videoRef.current.srcObject = camera;

      camRecorder = RecordRTC(camera, {
        type: 'video',
      });

      camRecorder.startRecording();

      // release camera on stopRecording
      camRecorder.camera = camera;
    });

    captureScreen(function (screen) {
      screenRef.current.srcObject = screen;

      screenRecorder = RecordRTC(screen, {
        type: 'video',
      });

      mediaRecorder = new MediaRecorder(screen);

      function videoDataHandler(event) {
        // var blob = event.data;
        var reader = new FileReader();
        reader.readAsArrayBuffer(event.data);
        reader.onloadend = function (event) {
          console.log(reader.result);
          // Send to server
          ss(socket).emit('dataStream', reader.result);
        };
      }

      mediaRecorder.start();
      mediaRecorder.ondataavailable = videoDataHandler;
      // Then send the binary data via the WebSocket connection!
      // const streama = ss.createStream();

      // ss(socket).emit('dataStream', e.data);

      screenRecorder.startRecording();

      // release screen on stopRecording
      screenRecorder.screen = screen;
    });
  }

  // Stop callbacks
  function stopScreenRecordingCallback() {
    screenRef.current.src = screenRef.current.srcObject = null;
    screenRef.current.src = URL.createObjectURL(screenRecorder.getBlob());

    screenRecorder.screen.stop();
    screenRecorder.destroy();
    screenRecorder = null;
  }

  function stopCamRecordingCallback() {
    videoRef.current.src = videoRef.current.srcObject = null;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;

    videoRef.current.src = URL.createObjectURL(camRecorder.getBlob());

    camRecorder.camera.stop();
    camRecorder.destroy();
    camRecorder = null;
  }

  function handleStopRecording() {
    screenRecorder.stopRecording(stopScreenRecordingCallback);
    camRecorder.stopRecording(stopCamRecordingCallback);
  }

  return (
    <React.Fragment>
      <div className='playButtons'>
        <Button
          variant='contained'
          color='secondary'
          className='startRecordButton'
          startIcon={<StartRecord />}
          onClick={handleStartRecording}
        >
          Start Recording
        </Button>
        <Button
          variant='contained'
          color='primary'
          className='startRecordButton'
          startIcon={<StopIcon />}
          onClick={handleStopRecording}
        >
          Stop Recording
        </Button>
      </div>
      <div className='videoPlayers'>
        <div className='screenRecording'>
          <video
            style={{
              height: '200px',
              width: '355px',
              margin: 5,
              backgroundColor: 'black',
            }}
            ref={screenRef}
            controls
            autoPlay
          ></video>
        </div>
        <div className='cameraRecording'>
          <video
            style={{
              height: '200px',
              width: '355px',
              margin: 5,
              backgroundColor: 'black',
            }}
            ref={videoRef}
            autoPlay
            controls
          ></video>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DoRecording;
