import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  @ViewChild('video')
  public video: ElementRef;

  @ViewChild('canvas')
  public canvas: ElementRef;

  capture: any[] = [];
  context: any;
  imageCaptureState: boolean = false;
  retakePhotoState: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: any) => {
          // this.video.nativeElement.src = window.URL.createObjectURL(stream);
          // this.video.nativeElement.play();

          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        });
    }
  }

  public capturePhoto(): any {
    this.imageCaptureState = true;
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 100, 81);

    this.capture = [];

    this.capture.push(this.canvas.nativeElement.toDataURL('image/png'));
    console.log('the captured images are..', this.capture);
  }

  public saveCapturePhoto(): any {
    // this.capture.forEach((item: any) => {
    //   item['filename'] = 'user_image';
    //   item['type'] = 'image/png';
    // });

    // let imageSet = {
    //   image: this.capture[0]
    // }

    // const fileList = {
    //   0: imageSet
    // };

    // // const file: Object<any> = {
    // //   filename: 'user_image',
    // //   type: 'image/png',
    // //   image: this.capture[0],
    // // };

    // fileList[0]['name'] = 'user_image';
    // fileList[0]['type'] = 'image/png';

    // console.log('the file is', fileList);

    const formData = new FormData();
    formData.append('file', this.capture[0]);
    this.http
      .post<any>('https://webcam.free.beeceptor.com/image', formData)
      .subscribe((resp) => {
        console.log('the response is', resp);
      });
  }

  public retakePhoto(): any {
    this.imageCaptureState = false;
    this.canvas.nativeElement.getContext('2d').clearRect(0, 0, 100, 100);
    this.ngAfterViewInit();
  }
}
