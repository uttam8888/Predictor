import { Component } from '@angular/core';
// import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // constructor(private nativeAudio: NativeAudio) { }

  audio() {
    // this.nativeAudio.preloadSimple('uniqueId1', 'path/to/file.mp3').then(onSuccess, onError);
    // this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/test.mp3').then(() => {
    //   console.log("test");
    // });
    // this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);

    // this.nativeAudio.play('uniqueId1').then(onSuccess, onError);

    // can optionally pass a callback to be called when the file is done playing
    // this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));

    // this.nativeAudio.loop('uniqueId2').then(onSuccess, onError);

    // this.nativeAudio.setVolumeForComplexAsset('uniqueId2', 0.6).then(onSuccess, onError);

    // this.nativeAudio.stop('uniqueId1').then(onSuccess, onError);

    // this.nativeAudio.unload('uniqueId1').then(onSuccess, onError);
  }

}
