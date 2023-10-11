import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/shared/interfaces/pet.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pets!: IPet[];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getAllPetsAvailable().subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }
}
