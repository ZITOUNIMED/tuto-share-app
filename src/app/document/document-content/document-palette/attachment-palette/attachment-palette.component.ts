import {Component, forwardRef, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractPaletteComponent} from '../abstract-palette.component';
import {oc} from 'src/app/shared/app-utils';
import {DomSanitizer} from '@angular/platform-browser';
import {ATTACHMENT_SIZE_CHOICES, AttachmentSizeType, sizeValues} from 'src/app/document/shared/attachmet-size-type';
import {UploadService} from "../../../../shared/service/upload.service";
import {AppStoreService} from "../../../../shared/service/app.store.service";
import {ElementType} from "../../../shared/element-type";

@Component({
  selector: 'app-attachment-palette',
  templateUrl: './attachment-palette.component.html',
  styleUrls: ['./attachment-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => AttachmentPaletteComponent),
                 multi: true
               }
         ]
})
export class AttachmentPaletteComponent extends AbstractPaletteComponent implements OnInit{
  AttachmentSizeType = AttachmentSizeType; // used in html
  attachmentSizeType = AttachmentSizeType.SMALL;
  ATTACHMENT_SIZE_CHOICES = ATTACHMENT_SIZE_CHOICES;

  constructor(private sanitizer: DomSanitizer,
              private uploadService: UploadService,
              private appStoreService: AppStoreService){
    super();
  }

  ngOnInit(): void {
    if(!this.element.appElementContent){
      const imageSize = sizeValues(this.attachmentSizeType);
      this.element.appElementContent = {
        id: null,
        data: null,
        width: imageSize.width,
        height: imageSize.height,
        type: ElementType.ATTACHMENT
      };
    }
  }

  selectAttachmentSizeType(){
    const imageSize = sizeValues(this.attachmentSizeType);
    this.element.appElementContent = {
      ...this.element.appElementContent,
      width: imageSize.width,
      height: imageSize.height
    };
    this.onChange(this.element);
  }

  onFileChange($event){
    const files = $event.srcElement.files;
    if (oc(files).length) {
      const file = files[0];
      this.uploadImage(file);
    }
  }

  uploadImage(file: any){
    this.appStoreService.startLoading();
    const width = 100;
    const height = 120;
    this.uploadService.uploadFile(file, width, height)
      .subscribe(savedAttachment => {
        this.element.appElementContent = {
          ...this.element.appElementContent,
          data: savedAttachment.data,
        };
        this.appStoreService.stopLoading();
        this.onChange(this.element);
      }, error =>{},
      () => {
        this.appStoreService.stopLoading();
      });
  }

  onWidthChange(width){
    this.element.appElementContent = {
      ...this.element.appElementContent,
      width: width
    };
    this.onChange(this.element);
  }

  onHeightChange(height){
    this.element.appElementContent = {
      ...this.element.appElementContent,
      height: height
    };
    this.onChange(this.element);
  }
}
