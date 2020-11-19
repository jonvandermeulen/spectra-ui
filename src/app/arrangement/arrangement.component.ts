import { Component, OnInit } from '@angular/core';
import * as Tone from 'Tone';
import { Piano } from '@tonejs/piano';
const rrs443 = require('../data/rrs443-1.json');
const rrs547 = require('../data/rrs547.json');
const rrs667 = require('../data/rrs667-1.json');
const bassElectricDef = require('../synth-presets/sampler/cello.json');
const fluteDef = require('../synth-presets/sampler/flute.json');
const recorder = new Tone.Recorder();


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.css']
})
export class ArrangementComponent implements OnInit {

  AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  part443;
  part667;
  record = false;
  // piano = new Piano().toDestination().connect(recorder);

  constructor() { }

  ngOnInit(): void {
    // this.baseline();
    // this.kickdrums();
    // this.snaredrums();
    // const synth = this.synth();
    // const synth2 = this.synth2();
    // const synth3 = this.synth3();
    // const bass = new Tone.Synth({
    //   oscillator: {
    //     type: 'triangle'
    //   }
    // }).toDestination().connect(recorder);

    const chorus = new Tone.Chorus(4, 2.5, 1).toDestination();
    const reverb = new Tone.Reverb({
      wet: 1,
      decay: 1.5,
      preDelay: 0.01
    }).toDestination();
    const limiter = new Tone.Limiter(-10).toDestination();
    const limiter2 = new Tone.Limiter(-10).toDestination();
    const gainNode = new Tone.Gain(0).toDestination();

    const bassElectric = new Tone.Sampler( {
      urls: bassElectricDef.urls,
      baseUrl: bassElectricDef.baseUrl,
      volume: -6,
    }).toDestination()
      // .connect(limiter)
      // .connect(gainNode)
      .connect(reverb)
      .connect(recorder);

    const flute = new Tone.Sampler({
      urls: fluteDef.urls,
      baseUrl: fluteDef.baseUrl,
      volume: -6,
    }).toDestination()
      .connect(reverb)
      // .connect(limiter2)
      .connect(recorder);

    const timedNotes443 = this.timeNotes(4, rrs443);
    const mergedNotes443 = this.mergeNotes(timedNotes443).filter(item => item !== null);
    const timedNotes667 = this.timeNotes(4, rrs667);
    const mergedNotes667 = this.mergeNotes(timedNotes667).filter(item => item !== null);

    this.part443 = new Tone.Part((time, note) => {
      // console.log(`Top Note: ${JSON.stringify(note)}`);
      // synth.triggerAttackRelease(note.note, note.duration);
      // if (note.duration === '1n') {
      //   this.piano.pedalUp({ time });
      // }
      flute.triggerAttackRelease(note.note, note.duration);
      // this.piano.keyDown({ note: note.note, time });
      // this.piano.keyUp({ note: note.note, time: time + Tone.Time(note.duration).valueOf() });
      // if (note.duration === '1n') {
      //   this.piano.pedalDown({ time: time + Tone.Time(note.duration).valueOf() });
      // }
    }, mergedNotes443);


    this.part667 = new Tone.Part((time, note) => {
      // console.log(`Bass Note: ${JSON.stringify(note)}`);
      // this.basswind().triggerAttackRelease(note.note, note.duration);
      bassElectric.triggerAttackRelease(note.note, note.duration);
      // this.piano.keyDown({ note: note.note, time });
      // this.piano.keyUp({ note: note.note, time: time + Tone.Time(note.duration).valueOf() });
    }, mergedNotes667);
    // this.toggleStart();
  }

  toggleStart(): void {
    if (Tone.Transport.state !== 'started') {
      // this.piano.load().then(n => {
        if (this.record) {
          recorder.start();
        }
        this.part443.start(0);
        this.part667.start(0);
        Tone.Transport.start();
      // });
    } else {
      Tone.Transport.stop();
      if (recorder.state === 'started') {
        recorder.stop().then(
          (recording) => {
            const url = URL.createObjectURL(recording);
            const anchor = document.createElement('a');
            anchor.download = 'recording.webm';
            anchor.href = url;
            anchor.click();
          });
      }
    }
  }

  countAdd(count: string, add: number): string {
    return '';
  }

  synth(): Tone.AMSynth {
    return new Tone.AMSynth(
      {
        harmonicity: 2,
        oscillator: {
          type: 'amsine2',
          modulationType: 'sine',
          harmonicity: 1.01
        },
        envelope: {
          attack: 0.006,
          decay: 4,
          sustain: 0.04,
          release: 1.2
        },
        modulation: {
          volume: 13,
          type: 'amsine2',
          modulationType: 'sine',
          harmonicity: 12
        },
        modulationEnvelope: {
          attack: 0.006,
          decay: 0.2,
          sustain: 0.2,
          release: 0.4
        }
      }
    ).toDestination().connect(recorder);
  }

  synth2(): Tone.AMSynth {
    return new Tone.AMSynth({
      harmonicity: 2.5,
      oscillator: {
        type: 'fatsawtooth'
      },
      envelope: {
        attack: 0.1,
        decay: 0.2,
        sustain: 0.2,
        release: 0.3
      },
      modulation: {
        type: 'square'
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0.01
      }
    }).toDestination().connect(recorder);
  }

  synth3(): Tone.Synth {
    return new Tone.Synth(
      {
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.001,
          decay: 0.1,
          sustain: 0.1,
          release: 1.2
        }
      }).toDestination().connect(recorder);
  }

  basswind(): Tone.Synth {
    return new Tone.Synth({
      portamento: 0.0,
      volume: 0.7,
      oscillator: {
        type: 'square4'
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.2,
        release: 2
      }
    }).toDestination().connect(recorder);
  }

  timeNotes(notesPerMeasure: number, data: any[]): Array<any> {
    const notes = [];
    for (let i = 0; i < data.length; i++) {
      notes.push({
        time: `${Math.floor(i / notesPerMeasure)}:${i % notesPerMeasure}`,
        note: data[i],
        duration: `${notesPerMeasure}n`,
        index: i,
      });
    }
    return notes;
  }
  
  mergeNotes(notes: Array<any>): Array<any> {
    let lastNote;
    for (let i = 0; i < notes.length; i++) {
      const thisNote = notes[i];
      if (lastNote && lastNote.note === thisNote.note) {
        // delete this note and update the duration of the lastNote
        // let duration = this.getNumberFromDuration(notes[lastNote.index].duration);
        let duration = Tone.Time(notes[lastNote.index].duration);
        if (duration.toNotation() === '1n') {
          // It's getting to long, time to start a new note.
          lastNote = notes[i];
        } else {
          notes[i] = null;
          duration = Tone.Time(Tone.Time(thisNote.duration).valueOf() + duration.valueOf());
          notes[lastNote.index].duration = duration;
        }
      } else {
        // note becomes lastNote and we move on.
        lastNote = notes[i];
      }
    }
    notes[0].time = 0;
    return notes;
  }
}
