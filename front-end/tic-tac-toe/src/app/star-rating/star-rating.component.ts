import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input()
  value: number = 0;

  @Output()
  rated = new EventEmitter<number>();

  ratingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.ratingForm = this.formBuilder.group({
      rating: '',
    });

    this.ratingForm.valueChanges.subscribe(val => {
      this.rated.emit(val.rating);
    });
  }

}
