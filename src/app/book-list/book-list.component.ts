import { SectionService } from 'app/core/section.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Output() select = new EventEmitter<number>();

  private list = [
    {
      id: 0,
      title: 'Novo livro',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 1,
      title: 'Instruções iniciais',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 2,
      title: 'História interativa',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 3,
      title: 'Quiz',
      author: 'Fulano',
      coverage: ''
    }
  ];

  constructor(private sectionServ: SectionService) { }

  ngOnInit() {
  }

  open(id: number) {
    if (id == 0) {
      this.sectionServ.reset();
    }
    else {
      let file = 'section-' + (id > 9 ? id : '0' + id ) + '.json';
      this.sectionServ.load(file);
    }
    this.select.emit(id);
  }

}