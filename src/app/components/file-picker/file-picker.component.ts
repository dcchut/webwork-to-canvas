import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html'
})
export class FilePickerComponent implements OnInit {

  constructor() { }

  @Input() id: String;
  @Input() label: String;
  @Input() tinyLabel?: String;
  @Input() onChange?: (File) => any = (f : File) => {};

  ngOnInit() {
  }

  public callbackWrapper(files : FileList) {
    const file: File = files.item(0);

    // set the label to be equal to the name of the file
    this.label = file.name;

    // now send the file through the callback function;
    this.onChange(file);
  }

}
