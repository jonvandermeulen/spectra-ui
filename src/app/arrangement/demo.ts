// import * as Tone from 'tone';
// export class Demo {
    
//     const AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
//     IChord: any;
//     VChord: any;
//     VIChord: any;
//     IVChord: any;
    
//     constructor() {
//         Tone.Transport.bpm.value = 150;
//         this.IChord = this.constructMajorChord(this.AMinorScale, 4, 'A3');
//         this.VChord = this.constructMajorChord(this.AMinorScale, 4, 'E4');
//         this.VIChord = this.constructMajorChord(this.AMinorScale, 3, 'F3');
//         this.IVChord = this.constructMajorChord(this.AMinorScale, 3, 'D3');
//         this.IChord.push('A2', 'G4');
//         this.VChord.push('E2', 'G3');
//         this.VIChord.push('F2', 'E4');
//         this.IVChord.push('D2', 'C4');

//         console.log(this.IChord);
//         console.log(this.VChord);
//         console.log(this.VIChord);
//         console.log(this.IVChord);

//     }

// const addOctaveNumbers = (scale, octaveNumber) => scale.map(note => {
//     const firstOctaveNoteIndex = scale.indexOf('C') !== -1 ? scale.indexOf('C') : scale.indexOf('C#');
//     const noteOctaveNumber = scale.indexOf(note) < firstOctaveNoteIndex ? octaveNumber - 1 : octaveNumber;
//     return `${note}${noteOctaveNumber}`;
// })

// const constructMajorChord = (scale, octave, rootNote) => {
//     const scaleWithOctave = this.addOctaveNumbers(scale, octave);

//     const getNextChordNote = (note, nextNoteNumber) => {
//         const nextNoteInScaleIndex = scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
//         let nextNote;
//         if (typeof (scaleWithOctave[nextNoteInScaleIndex]) !== 'undefined') {
//             nextNote = scaleWithOctave[nextNoteInScaleIndex];
//         } else {
//             nextNote = scaleWithOctave[nextNoteInScaleIndex - 7];
//             // tslint:disable-next-line:radix
//             const updatedOctave = parseInt(nextNote.slice(1)) + 1;
//             nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
//         }

//         return nextNote;
//     };

//     const thirdNote = getNextChordNote(rootNote, 3);
//     const fifthNote = getNextChordNote(rootNote, 5);
//     const chord = [rootNote, thirdNote, fifthNote];

//     return chord;
// }

// const constructChords = (scale, octave) => {
//     const scaleWithOctave = this.addOctaveNumbers(scale, octave);

//     const getNextChordNote = (note, nextNoteNumber) => {
//         const nextNoteInScaleIndex = scaleWithOctave.indexOf(note) + nextNoteNumber - 1;
//         let nextNote;
//         if (typeof (scaleWithOctave[nextNoteInScaleIndex]) !== 'undefined') {
//             nextNote = scaleWithOctave[nextNoteInScaleIndex];
//         } else {
//             nextNote = scaleWithOctave[nextNoteInScaleIndex - 6];
//             // tslint:disable-next-line:radix
//             const updatedOctave = parseInt(nextNote.slice(1)) + 1;
//             nextNote = `${nextNote.slice(0, 1)}${updatedOctave}`;
//         }

//         return nextNote;
//     };


//     const chordArray = scaleWithOctave.map(note => {
//         const thirdNote = getNextChordNote(note, 3);
//         const fifthNote = getNextChordNote(note, 5);

//         const chord = [note, thirdNote, fifthNote];

//         return chord;
//     });

//     return chordArray;

// }

// const synth = new Tone.PolySynth(Tone.Synth, {
//     volume: -5,
//     oscillator: {
//         type: 'sawtooth'
//     }
// }).toDestination();

// const mainChords = [
//     { time: 0, note: this.IChord, duration: '2n.' },
//     { time: '0:3', note: this.VChord, duration: '4n' },
//     { time: '1:0', note: this.VIChord, duration: '2n.' },
//     { time: '1:3', note: this.VChord, duration: '4n' },
//     { time: '2:0', note: this.IVChord, duration: '2n.' },
//     { time: '2:3', note: this.VChord, duration: '4n' },
//     { time: '3:0', note: this.VIChord, duration: '2n' },
//     { time: '3:2', note: this.VChord, duration: '4n' },
//     { time: '3:3', note: this.IVChord, duration: '4n' },
//     { time: '4:0', note: this.IChord, duration: '2n.' },
//     { time: '4:3', note: this.VChord, duration: '4n' },
//     { time: '5:0', note: this.VIChord, duration: '2n.' },
//     { time: '5:3', note: this.VChord, duration: '4n' },
//     { time: '6:0', note: this.IVChord, duration: '2n.' },
//     { time: '6:3', note: this.VChord, duration: '4n' },
//     { time: '7:0', note: this.VIChord, duration: '2n' },
//     { time: '7:2', note: this.VChord, duration: '4n' },
//     { time: '7:3', note: this.IVChord, duration: '4n' },
// ];

// const part = new Tone.Part((time, note) => {
//     this.synth.triggerAttackRelease(note.note, note.duration, time);
// }, this.mainChords).start(0);

// const IChord1 = this.constructMajorChord(this.AMinorScale, 5, 'A4');
// const VChord1 = this.constructMajorChord(this.AMinorScale, 5, 'E5');
// const VIChord1 = this.constructMajorChord(this.AMinorScale, 4, 'F4');
// const IVChord1 = this.constructMajorChord(this.AMinorScale, 4, 'D4');

// IChord.push('A3', 'G5');
// VChord.push('E3', 'D5');
// VIChord.push('F3', 'E5');
// IVChord.push('D3', 'C5');


// const mainChordPart = new Tone.PolySynth(Tone.Synth, {
//     oscillator: {
//         count: 6,
//         spread: 80,
//         type: 'fatsawtooth'
//     }
// }).toDestination();

// const highOctaveChords = [
//     { time: 0, note: this.IChord1, duration: '2n.' },
//     { time: '0:3', note: this.VChord1, duration: '4n' },
//     { time: '1:0', note: this.VIChord1, duration: '2n.' },
//     { time: '1:3', note: this.VChord1, duration: '4n' },
//     { time: '2:0', note: this.IVChord1, duration: '2n.' },
//     { time: '2:3', note: this.VChord1, duration: '4n' },
//     { time: '3:0', note: this.VIChord1, duration: '2n' },
//     { time: '3:2', note: this.VChord1, duration: '4n' },
//     { time: '3:3', note: this.IVChord1, duration: '4n' },
//     { time: '4:0', note: this.IChord1, duration: '2n.' },
//     { time: '4:3', note: this.VChord1, duration: '4n' },
//     { time: '5:0', note: this.VIChord1, duration: '2n.' },
//     { time: '5:3', note: this.VChord1, duration: '4n' },
//     { time: '6:0', note: this.IVChord1, duration: '2n.' },
//     { time: '6:3', note: this.VChord1, duration: '4n' },
//     { time: '7:0', note: this.VIChord1, duration: '2n' },
//     { time: '7:2', note: this.VChord1, duration: '4n' },
//     { time: '7:3', note: this.IVChord1, duration: '4n' },
// ];

// const highSynth = new Tone.PolySynth(Tone.Synth, {
//     volume: -16,
//     oscillator: {
//         type: 'fatsawtooth'
//     }
// }).toMaster();

// const highOctaveChordPart = new Tone.Part((time, note) => {
//     this.highSynth.triggerAttackRelease(note.note, note.duration, time, 0.5);
// }, this.highOctaveChords).start(0);


// const mainMelody = [
//     { time: 0, note: 'G4', duration: '8n' },
//     { time: '0:0:2', note: 'F4', duration: '8n' },
//     { time: '0:1', note: 'D4', duration: '8n.' },
//     { time: '0:2', note: 'D4', duration: '8n' },
//     { time: '0:2:2', note: 'F4', duration: '8n.' },
//     { time: '0:3', note: 'G4', duration: '8n' },
//     { time: '0:3:2', note: 'A4', duration: '2n' },
//     { time: '2:0', note: 'A4', duration: '8n' },
//     { time: '2:0:2', note: 'G4', duration: '8n' },
//     { time: '2:1', note: 'F4', duration: '8n' },
//     { time: '2:2', note: 'A4', duration: '8n' },
//     { time: '2:2:2', note: 'G4', duration: '8n' },
//     { time: '2:3', note: 'E4', duration: '8n' },
//     { time: '2:3:2', note: 'F4', duration: '2n' },
//     { time: '4:0', note: 'G4', duration: '8n' },
//     { time: '4:0:2', note: 'F4', duration: '8n' },
//     { time: '4:1', note: 'D4', duration: '8n' },
//     { time: '4:2', note: 'F4', duration: '8n' },
//     { time: '4:2:2', note: 'A4', duration: '8n' },
//     { time: '4:3', note: 'G4', duration: '8n' },
//     { time: '4:3:2', note: 'A4', duration: '2n' },
//     { time: '5:2:2', note: 'G4', duration: '8n' },
//     { time: '5:3', note: 'A4', duration: '8n' },
//     { time: '5:3:2', note: 'B4', duration: '8n' },
//     { time: '6:0', note: 'C5', duration: '8n' },
//     { time: '6:1', note: 'B4', duration: '8n' },
//     { time: '6:1:2', note: 'A4', duration: '8n' },
//     { time: '6:2', note: 'B4', duration: '8n' },
//     { time: '6:2:2', note: 'A4', duration: '8n' },
//     { time: '6:3', note: 'G4', duration: '8n' },
//     { time: '6:3:2', note: 'A4', duration: '1n' },
// ];


// const synth2 = new Tone.Synth({
//     oscillator: {
//         volume: 5,
//         count: 3,
//         spread: 40,
//         type: 'fatsawtooth'
//     }
// }).toMaster();

// const mainMelodyPart = new Tone.Part((time, note) => {
//     this.synth2.triggerAttackRelease(note.note, note.duration, time);
// }, this.mainMelody).start(0);


// const lowPass = new Tone.Filter({
//     frequency: 8000,
// }).toMaster();

// const snareDrum = new Tone.NoiseSynth({
//     noise: {
//         type: 'white',
//         playbackRate: 3,
//     },
//     envelope: {
//         attack: 0.001,
//         decay: 0.20,
//         sustain: 0.15,
//         release: 0.03,
//     },
// }).connect(this.lowPass);

// const snares = [
//     { time: '0:2' },
//     { time: '1:2' },
//     { time: '2:2' },
//     { time: '3:2' },
//     { time: '4:2' },
//     { time: '5:2' },
//     { time: '6:2' },
//     { time: '7:2' },
// ];

// const snarePart = new Tone.Part((time) => {
//     this.snareDrum.triggerAttackRelease('4n', time);
// }, this.snares).start(0);


// const kickDrum = new Tone.MembraneSynth({
//     volume: 6
// }).toMaster();

// const kicks = [
//     { time: '0:0' },
//     { time: '0:3:2' },
//     { time: '1:1' },
//     { time: '2:0' },
//     { time: '2:1:2' },
//     { time: '2:3:2' },
//     { time: '3:0:2' },
//     { time: '3:1:' },
//     { time: '4:0' },
//     { time: '4:3:2' },
//     { time: '5:1' },
//     { time: '6:0' },
//     { time: '6:1:2' },
//     { time: '6:3:2' },
//     { time: '7:0:2' },
//     { time: '7:1:' },
// ];

// const kickPart = new Tone.Part((time) => {
//     this.kickDrum.triggerAttackRelease('C1', '8n', time);
// }, this.kicks).start(0);


// const bassline = [
//     { time: 0, note: 'A0', duration: '2n' },
//     { time: '0:3', note: 'F0', duration: '2n.' },
//     { time: '1:3', note: 'D0', duration: '2n.' },
//     { time: '2:3', note: 'F0', duration: '1:1' },
// ];

// const bass = new Tone.Synth({
//     oscillator: {
//         type: 'triangle'
//     }
// }).toMaster();

// const bassPart = new Tone.Part((time, note) => {
//     this.bass.triggerAttackRelease(note.note, note.duration, time);
// }, this.bassline).start(0);

// }
