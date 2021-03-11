import { Injectable } from '@angular/core';
import * as Tone from 'Tone';

@Injectable({
  providedIn: 'root'
})
export class DataConversionService {

  constructor() { }

  /// Turn an array of note values into sequential notation for ToneJS ///
  timeNotes(notesPerMeasure: number, data: any[]): Array<any> {
    const notes = [];
    for (let i = 0; i < data.length; i++) {
      notes.push({
        time: Tone.Time(Tone.Time(`${notesPerMeasure}n`).toTicks() * i),
        note: data[i],
        duration: `${notesPerMeasure}n`,
        index: i,
      });
    }
    return notes;
  }

  /// merges duplicate consecutive notes into one longer note. ///
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
