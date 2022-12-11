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
  error: any;
  context: any;
  imageCaptureState: boolean = false;
  retakePhotoState: boolean = false;
  HEIGHT: any = '640';
  WIDTH: any = '480';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream: any) => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
          });
      } catch (err: any) {
        this.error = err;
      }
    }
  }

  public capturePhoto(): any {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, this.WIDTH, this.HEIGHT);
    this.capture = [];
    this.capture.push(this.canvas.nativeElement.toDataURL('image/png'));
    this.imageCaptureState = true;
    console.log('the captured images are..', this.capture);
  }

  public saveCapturePhoto(): any {
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
    // this.canvas.nativeElement
    //   .getContext('2d')
    //   .clearRect(0, 0, this.WIDTH, this.HEIGHT);
    // this.ngAfterViewInit();
  }
}
