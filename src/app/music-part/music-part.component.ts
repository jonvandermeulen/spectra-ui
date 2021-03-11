import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-part',
  templateUrl: './music-part.component.html',
  styleUrls: ['./music-part.component.css']
})
export class MusicPartComponent implements OnInit {

  instrument: string;
  notes: string;

  constructor() { }

  ngOnInit(): void {
    
  }

  parseNotes(notes: string): string[] {
    return notes.split(',');
  }

}
