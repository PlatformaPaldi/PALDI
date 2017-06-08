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
      filename: '',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 1,
      title: 'Instruções iniciais',
      filename: 'section-01.json',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 2,
      title: 'História interativa',
      filename: 'section-02.json',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 3,
      title: 'Quiz',
      filename: 'section-03.json',
      author: 'Fulano',
      coverage: ''
    },
    {
      id: 4,
      title: 'Casa do Aprender',
      filename: 'casa.json',
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
      this.select.emit(0);
    }
    else {
      let obj = this.list.find(o => o.id == id);
      if (obj) {
        this.sectionServ.load(obj.filename);
        this.select.emit(id);
      }
    }
  }

}