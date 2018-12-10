import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Action } from '../../domain/action';

const locale:string = 'en-US';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: String[];
  isRecording = false;
  resp: any;
  actions: Action[];
  totalActions:number = 0;
  text:string;

  constructor(public navCtrl: NavController,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private rest: RestApiProvider,
    private tts: TextToSpeech) { }

  isIos() {
    return this.plt.is('ios');
  }

  isAndroid() {
    return this.plt.is('android');
  }

  stopListening() {
    // this.speechRecognition.stopListening().then(() => {
    //   this.isRecording = false;
    // });

    this.isRecording = false;
    console.log('listening stopped!');
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
          console.log('permisson granted!');
        }
      });
  }

  startListening() {
    // let options = {
    //   language: 'en-US'
    // }
    // this.speechRecognition.startListening().subscribe(matches => {
    //   this.matches = matches;
    //   let query = this.matches.join('~!~');
    //   this.cd.detectChanges();
    // });

    let query = 'Add Employee';
    this.predictedActions(query);
    this.isRecording = true;
    console.log('speech listening!');
  }

  predictedActions(query){
    this.rest.getPredictedActions(query).subscribe(response => {
      this.resp = response;
      this.actions = this.resp;

      if (this.totalActions > 1) {
        console.log('multiple actions detected, need to select one of then by user');
      } else {
        console.log('single actions detected.');
        this.actions.forEach(action => {
          action.activities.forEach(activity => {
            this.text = activity.fieldInput;
            //txt to speach
            this.speakToUser(this.text);

            //speach to txt
            //get user resposne and process it
          });
        });
      }
    }, error => {
      console.log(error);
    });
  }

  speakToUser(textToSpeak){
    this.tts.speak({
      text: textToSpeak,
      rate: 1 / 10,
      locale: locale
    }).then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

}