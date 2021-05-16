import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Capa-Load Vergleich',
        link: './comparison',
        index: 0
      },
      {
        label: 'Kapazitäten',
        link: './capaview',
        index: 1
      },
      {
        label: 'Workload',
        link: './occupancy',
        index: 2
      },
      {
        label: 'Nutzer Verwaltung',
        link: './user',
        index: 3
      },
      {
        label: 'PI Verwaltung',
        link: './pi',
        index: 4
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
