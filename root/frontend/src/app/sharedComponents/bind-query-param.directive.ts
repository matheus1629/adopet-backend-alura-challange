import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[bindQueryParam]',
})
export class BindQueryParamDirective {
  @Input('bindQueryParam') petName!: string;
  @Input('bindQueryParam') adopterDonorName!: string;
  @Input('bindQueryParam') dateOrder!: string;
  @Input('bindQueryParam') adoptionStatus!: string;

  constructor(private ngControl: NgControl) {}

  ngOnInit() {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(this.petName))
      this.ngControl.control?.patchValue(queryParams.get(this.petName));
    if (queryParams.has(this.adopterDonorName))
      this.ngControl.control?.patchValue(queryParams.get(this.adopterDonorName));
    if (queryParams.has(this.dateOrder))
      this.ngControl.control?.patchValue(queryParams.get(this.dateOrder));
    if (queryParams.has(this.adoptionStatus))
      this.ngControl.control?.patchValue(queryParams.get(this.adoptionStatus));
  }
}
