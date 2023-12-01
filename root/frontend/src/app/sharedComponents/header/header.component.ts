import { DonorService } from 'src/app/services/donor.service';
import { AdopterService } from './../../services/adopter.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { SharedService } from 'src/app/services/shared-services.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  routeEditProfile = `/${this.auth.getUserType()?.toLocaleLowerCase()}/profile`;
  profitePicture!: string | null | undefined;
  subscriptionPicture!: Subscription;
  linkHome!: string;
  linkChat!: string;

  constructor(
    public auth: AuthService,
    private adopterService: AdopterService,
    private donorService: DonorService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.auth.getUserType() === 'Adopter') {
      this.adopterService.getAdopterPicture().subscribe({
        next: (data) => {
          this.profitePicture = data.picture;
          this.linkHome = '/adopter/pets';
          this.linkChat = '/adopter/messages';
        },
        error: (err) => console.error('Error: ', err),
      });
    } else if (this.auth.getUserType() === 'Donor') {
      this.donorService.getDonorPicture().subscribe({
        next: (data) => {
          this.profitePicture = data.picture;
          this.linkHome = '/donor/pets';
          this.linkChat = '/donor/messages';
        },
        error: (err) => console.error('Error: ', err),
      });
    }

    this.subscriptionPicture = this.sharedService.pictureUpdated$.subscribe((data) => {
      this.profitePicture = data;
    });
  }

  ngOnDestroy() {
    this.subscriptionPicture.unsubscribe();
  }
}
