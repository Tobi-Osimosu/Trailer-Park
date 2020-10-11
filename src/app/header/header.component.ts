import { DataService } from './../services/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchResult;
  @ViewChild('searchForm', { static: false }) form: NgForm;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  search() {
    this.searchResult = null;
    this.dataService.search(this.form.value.title, this.form.value.year, this.form.value.type).subscribe((response) => {
      this.searchResult = response;
    });
    this.form.reset();
  }
}
