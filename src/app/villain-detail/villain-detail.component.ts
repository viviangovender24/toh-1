import { Component, OnInit } from '@angular/core';
import { Villain } from '../villain';
import { VillainService } from '../villain.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {
  villain: Villain | undefined;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVil();
  }

  getVil(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.villainService.getVil(id)
      .subscribe(villain => this.villain = villain);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.villain) {
      this.villainService.updateVil(this.villain)
        .subscribe(() => this.goBack());
    }
  }
}