import { SectionService } from 'app/core/section.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// import { ISection } from "app/core/section";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Output() select = new EventEmitter<number>();

  // book: FirebaseObjectObservable<Partial<ISection>>;

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
  // constructor(private sectionServ: SectionService, private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  open(id: number) {
    if (id == 0) {
      this.sectionServ.reset();
      this.select.emit(0);
    }
    else {

      let obj = this.list.find(o => o.id == id);
      switch (obj.title) {
        case  'Casa do Aprender':
          //this.sectionServ.loadCasaFromFirebase();
          this.sectionServ.loadLivroTesteFromFirebase();
        break;
        
        default:
          this.sectionServ.load(obj.filename);
      }

        this.select.emit(id);
      }
    }
}
