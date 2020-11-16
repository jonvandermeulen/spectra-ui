import { Component, OnInit } from '@angular/core';
import * as Tone from 'Tone';
import { Piano } from '@tonejs/piano';
const rrs443 = require('../data/rrs443.json');
const rrs547 = require('../data/rrs547.json');
const rrs667 = require('../data/rrs667.json');
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

  constructor() { }

  ngOnInit(): void {
    // this.baseline();
    // this.kickdrums();
    // this.snaredrums();
    const synth = this.synth();
    const synth2 = this.synth2();
    const synth3 = this.synth3();
    const bass = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      }
    }).toDestination().connect(recorder);
    
    const piano = new Piano().toDestination();
    // const synthPart = new Tone.Sequence(
    //   (time, note) => {
    //     synth2.triggerAttackRelease(note, '8n', time);
    //   },
    //   rrs443,
    //   '8n'
    // ).start(0);
    // const bassPart = new Tone.Sequence(
    //   (time, note) => {
    //     bass.triggerAttackRelease(note, '5hz', time);
    //   },
    //   rrs547,
    //   '8n'
    // ).start(0);
    // const auxPart = new Tone.Sequence(
    //   (time, note) => {
    //     synth3.triggerAttackRelease(note, '8n', time);
    //   },
    //   rrs667,
    //   '8n'
    // ).start(0);

    const timedNotes443 = this.timeNotes(4, rrs443);
    const mergedNotes443 = this.mergeNotes(timedNotes443).filter(item => item !== null);
    const timedNotes667 = this.timeNotes(4, rrs667);
    const mergedNotes667 = this.mergeNotes(timedNotes667).filter(item => item !== null);

    this.part443 = new Tone.Part((time, note) => {
      console.log(`Top Note: ${JSON.stringify(note)}`);
      synth.triggerAttackRelease(note.note, note.duration);
    }, mergedNotes443);
    
    this.part667 = new Tone.Part((time, note) => {
      console.log(`Bass Note: ${JSON.stringify(note)}`);
      this.basswind().triggerAttackRelease(note.note, note.duration);
    }, mergedNotes667);
    // this.toggleStart();
  }

  toggleStart(): void {
    if (Tone.Transport.state !== 'started') {
      // recorder.start();
      this.part443.start(0);
      this.part667.start(0);
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      // recorder.stop().then(
      //   (recording) => {
      //     const url = URL.createObjectURL(recording);
      //     const anchor = document.createElement('a');
      //     anchor.download = 'recording.webm';
      //     anchor.href = url;
      //     anchor.click();
      //   });
    }
  }

  countAdd(count: string, add: number): string{
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

  baseline(): Tone.Part {
    const bassline = [
      { time: 0, note: 'A1', duration: '2n' },
      { time: '0:3', note: 'F1', duration: '2n.' },
      { time: '1:3', note: 'D1', duration: '2n.' },
      { time: '2:3', note: 'F1', duration: '1:1' },
    ];

    const bass = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      }
    }).toDestination();

    const bassPart = new Tone.Part((time, note) => {
      console.log(`baseline: ${time} ${note}`);
      bass.triggerAttack(note.note, note.time);
    }, bassline);
    return bassPart.start(0);
  }

  kickdrums(): Tone.Part {

    const kickDrum = new Tone.MembraneSynth({
      volume: 6
    }).toDestination();

    const kicks = [
      { time: '0:0' },
      { time: '0:3:2' },
      { time: '1:1' },
      { time: '2:0' },
      { time: '2:1:2' },
      { time: '2:3:2' },
      { time: '3:0:2' },
      { time: '3:1:' },
      { time: '4:0' },
      { time: '4:3:2' },
      { time: '5:1' },
      { time: '6:0' },
      { time: '6:1:2' },
      { time: '6:3:2' },
      { time: '7:0:2' },
      { time: '7:1:' },
    ];

    const kickPart = new Tone.Part((time) => {
      kickDrum.triggerAttackRelease('C1', '8n', time);
    }, kicks).start(0);
    return kickPart;
  } 

  snaredrums(): Tone.Part {
    const lowPass = new Tone.Filter({
      frequency: 8000,
    }).toDestination();

    const snareDrum = new Tone.NoiseSynth({
      noise: {
        type: 'white',
        playbackRate: 3,
        volume: 4,
      },
      envelope: {
        attack: 0.001,
        decay: 0.20,
        sustain: 0.15,
        release: 0.03,
      },
    }).connect(lowPass);

    const snares = [
      { time: '0:2' },
      { time: '1:2' },
      { time: '2:2' },
      { time: '3:2' },
      { time: '4:2' },
      { time: '5:2' },
      { time: '6:2' },
      { time: '7:2' },
    ];

    const snarePart = new Tone.Part(time => {
      snareDrum.triggerAttackRelease('4n', time);
    }, snares).start(0);
    return snarePart;
  }

  timeNotes(notesPerMeasure: number, data: any[]): Array<any>  {
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

  octave(notes: Array<any>, add: number): Array<any>{
    // foreach note, add/subtract octave
    notes.forEach(note => {
      const noteOctave = this.splitOctaveFromNote(note.note);
      note.note = `${noteOctave.note}${noteOctave.octave + add}`;
    });
    return notes;
  }

  splitOctaveFromNote(notestring: string): any {
    return {
      note: notestring.match(/\D*/)[0],
      // tslint:disable-next-line:radix
      ocative: Number.parseInt(notestring.match(/[0-9]*/)[0]),
    };
  }

  mergeNotes(notes: Array<any>): Array<any> {
    let lastNote;
    for (let i = 0; i < notes.length; i++) {
      const thisNote = notes[i];
      if (lastNote && lastNote.note === thisNote.note) {
        // delete this note and update the duration of the lastNote
        let duration = this.getNumberFromDuration(notes[lastNote.index].duration);
        if (duration <= 1) {
          // It's getting to long, time to start a new note.
          lastNote = notes[i];
        } else {
          notes[i] = null;
          duration = duration / 2;
          notes[lastNote.index].duration = `${duration}n`;
        } 
      } else {
        // note becomes lastNote and we move on.
        lastNote = notes[i];
      }
    }
    notes[0].time = 0;
    return notes;
  }

  getNumberFromDuration(duration: string): number {
    return Number.parseFloat(duration.match(/[0-9]*/)[0]);
  }

}
