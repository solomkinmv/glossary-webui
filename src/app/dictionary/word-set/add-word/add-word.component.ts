import {Component, Input, ViewChild} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {WordSet} from "../../_models/word-set";
import {AlertService} from "../../../_services/alert.service";
import {WordSetsService} from "../../_services/word-sets.service";
import {SearchRecord} from "../../_models/search-record";
import {WordService} from "../../_services/word.service";
import {ImageService} from "../../_services/image.service";
import {ModalComponent} from "../../modal/modal.component";
import {catchError, debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {WordMeta} from "../../_models/word-meta";

@Component({
  selector: 'add-word',
  templateUrl: 'add-word.component.html'
})
export class AddWordComponent {
  public uploading: boolean;
  public newWord: WordMeta;
  public alternativeTranslations: string[];
  public searchRecords: Observable<SearchRecord[]>;
  private searchTerms = new Subject<string>();
  public newWordImages: Observable<string[]>;
  public highlightedImages = new Set<string>();
  @Input() set: WordSet;
  @ViewChild(ModalComponent)
  public readonly modal: ModalComponent;

  constructor(private wordSetService: WordSetsService,
              private wordService: WordService,
              private alertService: AlertService,
              private imageService: ImageService) {
    this.initSearch();
  }


  private initSearchRecords() {
    this.searchRecords = this.searchTerms.pipe<SearchRecord[]>(
      debounceTime(300), // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(term => this.wordService.search(term)), // switch to new observable each time the term changes
      catchError(error => {
        console.log('Failed to search' + JSON.stringify(error));
        return Observable.create();
      })
    );
  }

  public search(): void {
    console.log(`search: ${this.newWord.text}`);
    this.searchTerms.next(this.newWord.text);
  }

  public chooseWord(record: SearchRecord): void {
    console.log("Choosing word: " + JSON.stringify(record));
    if (record.translations.length == 1) {
      this.newWord.text = record.text;
      this.newWord.translation = record.translations[0];
      this.showImages();
      return;
    }

    this.newWord.text = record.text;
    this.alternativeTranslations = record.translations;
    this.searchRecords = Observable.create();
  }

  public chooseTranslation(translation: string): void {
    this.newWord.translation = translation;
    this.showImages();
  }

  private showImages() {
    this.newWordImages = this.imageService.searchImages(this.newWord.text);
    this.modal.show();
  }

  public choosePicture(picture: string) {
    this.newWord.image = picture;
    this.highlightedImages.clear();
    this.highlightedImages.add(picture);
  }

  private addWord(): void {
    this.wordSetService.addWordToWordSet(this.set.id, this.newWord)
      .subscribe(
        (updatedWordSet: WordSet) => {
          this.alertService.success("Added new record");
          this.set.words = updatedWordSet.words;
        },
        err => this.alertService.error(err)
      );

    this.initSearch();
    this.modal.hide();
  }

  private initNewWord(): void {
    this.newWord = new WordMeta(null, null, null);
  }

  private initSearch(): void {
    this.initNewWord();
    this.initSearchRecords();
    this.alternativeTranslations = null;
  }

  public fileChange(files: FileList) {
    let file = files.item(0);
    if (!file) {
      return;
    }
    this.uploading = true;
    this.imageService.uploadImage(file)
      .subscribe(
        (location: string) => {
          console.log(`Uploaded image in location ${location}`);
          this.newWord.image = location;
          this.uploading = false;
        }, err => {
          console.error("Got error during uploading " + JSON.stringify(err));
          this.uploading = false
        });
  }

  public addWordWithoutImage() {
    this.newWord.image = null;
    this.addWord();
  }
}
