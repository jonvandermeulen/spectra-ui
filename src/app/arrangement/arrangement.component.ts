import { Component, OnInit, ViewChild } from '@angular/core';
import * as Tone from 'Tone';
import { Piano } from '@tonejs/piano';
const rrs443 = require('../../data/rrs443-1.json');
const rrs547 = require('../../data/rrs547-3.json');
const rrs667 = require('../../data/rrs667-1.json');
const bassElectricDef = require('../synth-presets/sampler-defs/cello.json');
const fluteDef = require('../synth-presets/sampler-defs/flute.json');
const harpDef = require('../synth-presets/sampler-defs/harp.json');
const recorder = new Tone.Recorder();
import { ChartData, ChartDataSets, ChartOptions, ChartPoint } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { DataConversionService } from '../services/data-conversion.service';


@Component({
  selector: 'app-arrangement',
  templateUrl: './arrangement.component.html',
  styleUrls: ['./arrangement.component.css'],
})
export class ArrangementComponent implements OnInit {

  AMinorScale = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  CMajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  part443;
  part547;
  part667;
  public record = false;
  public bpm = 120;
  // piano = new Piano().toDestination().connect(recorder);

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'RRS443',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'blue',
    },
    {
      data: [],
      label: 'RRS547',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'green',
    },
    {
      data: [],
      label: 'RRS667',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'red',
    },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: { responsive: true, },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Measure'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'MIDI note'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    const chorus = new Tone.Chorus(4, 2.5, 1).toDestination();
    const reverb = new Tone.Reverb({
      wet: 1,
      decay: 1.5,
      preDelay: 0.01
    }).toDestination();
    const limiter = new Tone.Limiter(-10).toDestination();
    const limiter2 = new Tone.Limiter(-10).toDestination();
    const stereo = new Tone.StereoWidener(1).toDestination();

    const cello = new Tone.Sampler({
      urls: bassElectricDef.urls,
      baseUrl: bassElectricDef.baseUrl,
      volume: -15,
    }).toDestination()
      // .connect(limiter)
      .connect(reverb)
      .connect(new Tone.StereoWidener(0.3).toDestination())
      .connect(recorder);

    const harp = new Tone.Sampler({
      urls: harpDef.urls,
      baseUrl: harpDef.baseUrl,
      volume: -15,
    }).toDestination()
      // .connect(limiter)
      .connect(reverb)
      .connect(new Tone.StereoWidener(0.5).toDestination())
      .connect(recorder);

    const flute = new Tone.Sampler({
      urls: fluteDef.urls,
      baseUrl: fluteDef.baseUrl,
      volume: -25,
    }).toDestination()
      .connect(reverb)
      .connect(new Tone.StereoWidener(0.7).toDestination())
      .connect(recorder);

    const timedNotes443 = this.timeNotes(4, rrs443);
    const mergedNotes443 = this.mergeNotes(timedNotes443).filter(item => item !== null);
    const timedNotes547 = this.timeNotes(4, rrs547);
    const mergedNotes547 = this.mergeNotes(timedNotes547).filter(item => item !== null);
    const timedNotes667 = this.timeNotes(4, rrs667);
    const mergedNotes667 = this.mergeNotes(timedNotes667).filter(item => item !== null);

    this.part443 = new Tone.Part((time, note) => {
      // console.log(`Top Note: ${JSON.stringify(note)}`);
      // synth.triggerAttackRelease(note.note, note.duration);
      // if (note.duration === '1n') {
      //   this.piano.pedalUp({ time });
      // }
      flute.triggerAttackRelease(note.note, note.duration);

      // this.lineChartData[0].data.push(Tone.Frequency(note.note).toFrequency());
      const ticks = Tone.Transport.getTicksAtTime(time);
      const measure = Tone.Time(ticks / 192).toBarsBeatsSixteenths();
      console.log(`${note.index} - ${measure} : ${Tone.Frequency(note.note).toMidi()}`);
      const d: ChartPoint = { x: measure, y: Tone.Frequency(note.note).toMidi() };
      // console.log(`data: ${JSON.stringify(d)}`);
      (this.chart.datasets[0].data as ChartPoint[]).push(d);
      if (!this.chart.labels.includes(measure)) {
        this.chart.labels.push(measure);
      }
      this.chart.update();
      // this.piano.keyDown({ note: note.note, time });
      // this.piano.keyUp({ note: note.note, time: time + Tone.Time(note.duration).valueOf() });
      // if (note.duration === '1n') {
      //   this.piano.pedalDown({ time: time + Tone.Time(note.duration).valueOf() });
      // }
    }, mergedNotes443);

    this.part547 = new Tone.Part((time, note) => {
      // console.log(`Top Note: ${JSON.stringify(note)}`);
      // synth.triggerAttackRelease(note.note, note.duration);
      // if (note.duration === '1n') {
      //   this.piano.pedalUp({ time });
      // }
      harp.triggerAttackRelease(note.note, note.duration + Tone.Time('4n'));
      const ticks = Tone.Transport.getTicksAtTime(time);
      const measure = Tone.Time(ticks / 192).toBarsBeatsSixteenths();
      const d: ChartPoint = { x: measure, y: Tone.Frequency(note.note).toMidi() };
      console.log(`data: ${JSON.stringify(d)}`);
      (this.chart.datasets[1].data as ChartPoint[]).push(d);
      if (!this.chart.labels.includes(measure)) {
        this.chart.labels.push(measure);
      }
      this.chart.update();
      // this.piano.keyDown({ note: note.note, time });
      // this.piano.keyUp({ note: note.note, time: time + Tone.Time(note.duration).valueOf() });
      // if (note.duration === '1n') {
      //   this.piano.pedalDown({ time: time + Tone.Time(note.duration).valueOf() });
      // }
    }, mergedNotes547);

    this.part667 = new Tone.Part((time, note) => {
      // console.log(`Bass Note: ${JSON.stringify(note)}`);
      // this.basswind().triggerAttackRelease(note.note, note.duration);
      cello.triggerAttackRelease(note.note, note.duration);
      const ticks = Tone.Transport.getTicksAtTime(time);
      const measure = Tone.Time(ticks / 192).toBarsBeatsSixteenths();
      const d: ChartPoint = { x: measure, y: Tone.Frequency(note.note).toMidi() };
      console.log(`data: ${JSON.stringify(d)}`);
      (this.chart.datasets[2].data as ChartPoint[]).push(d);
      if (!this.chart.labels.includes(measure)) {
        this.chart.labels.push(measure);
      }
      this.chart.update();
      // this.piano.keyDown({ note: note.note, time });
      // this.piano.keyUp({ note: note.note, time: time + Tone.Time(note.duration).valueOf() });
    }, mergedNotes667);
    // this.toggleStart();
  }

  toggleStart(): void {
    if (Tone.Transport.state !== 'started') {
      
      if (this.record) {
        recorder.start();
      }
      this.part443.start(0);
      this.part547.start(0);
      this.part667.start(0);
      Tone.Transport.bpm.value = this.bpm;
      Tone.Transport.start();
    } else {
      Tone.Transport.pause();
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
      Tone.Transport.seconds = 0;
    }
  }

  clearChart(): void {
    this.chart.datasets[0].data = [];
    this.chart.datasets[1].data = [];
    this.chart.datasets[2].data = [];
    this.chart.labels = [];
    this.chart.update();
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
      // rebuild data with midi numbers so we can re-import it.
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
