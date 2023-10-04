import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { IForm } from 'src/shared/interfaces/form.interface';
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
        console.log(this.pets);
      },
      error: (err) => {
        console.error('Error: ', err);
      },
    });
  }
}
