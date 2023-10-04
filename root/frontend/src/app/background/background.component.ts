import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getBackgroundColor() {
    if (this.router.url !== '/') return 'whiteBackground';
    return 'blueBackground';
  }
}
