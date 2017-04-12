import {Component, Input, ViewChild} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {SearchRecord} from "./_models/search-record";
import {Word} from "./_models/word";
import {WordService} from "./_services/word.service";
import {AlertService} from "../_services/alert.service";
import {WordSetService} from "./_services/word-set.service";
import {WordSet} from "./_models/word-set";
import {ModalComponent} from "./modal/modal.component";
import {ImageService} from "./_services/image.service";

@Component({
  selector: 'add-word',
  templateUrl: 'add-word.component.html'
})
export class AddWordComponent {
  private newWord: Word;
  private alternativeTranslations: string[];
  private searchRecords: Observable<SearchRecord[]>;
  private searchTerms = new Subject<string>();
  private newWordImages: Observable<string[]>;
  private highlightedImages = new Set<string>();
  @Input() set: WordSet;
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  constructor(private wordSetService: WordSetService,
              private wordService: WordService,
              private alertService: AlertService,
              private imageService: ImageService) {
    // this.initNewWord();
    this.initSearch();
  }


  private initSearchRecords() {
    this.searchRecords = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.wordService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.empty()
      )
      .catch(error => {
        console.log(error);
        return Observable.empty();
      });
  }

  private search(): void {
    console.log(`search: ${this.newWord.text}`);
    this.searchTerms.next(this.newWord.text);
  }

  private chooseWord(record: SearchRecord): void {
    console.log("Choosing word: " + JSON.stringify(record));
    if (record.translations.length == 1) {
      this.newWord.text = record.text;
      this.newWord.translation = record.translations[0];
      this.showImages();
      return;
    }

    this.newWord.text = record.text;
    this.alternativeTranslations = record.translations;
    this.searchRecords = Observable.empty();
  }

  private chooseTranslation(translation: string): void {
    this.newWord.translation = translation;
    this.showImages();
  }

  private showImages() {
    this.newWordImages = this.imageService.getImages(this.newWord.text);
    this.modal.show();
  }

  private choosePicture(picture: string) {
    this.newWord.image = picture;
    this.highlightedImages.clear();
    this.highlightedImages.add(picture);
  }

  private addWord(): void {
    this.wordSetService.addWord(this.set.id, this.newWord)
      .subscribe(
        (addedWord: Word) => {
          this.alertService.success("Added new record");
          this.set.words.push(addedWord);
        },
        err => this.alertService.error(err)
      );

    this.initSearch();
    this.modal.hide();
  }

  private initNewWord(): void {
    this.newWord = new Word(null, null, null);
  }

  private initSearch(): void {
    this.initNewWord();
    this.initSearchRecords();
    this.alternativeTranslations = null;
  }

  private fileChange(files: FileList) {
    let file = files.item(0);
    console.log(file);

    this.imageService.uploadImage(file)
      .subscribe((location: string) => this.newWord.image = location);
  }

  private addWordWithoutImage() {
    this.newWord.image = null;
    this.addWord();
  }
}
