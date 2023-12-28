import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent {
  addSongForm!: FormGroup;
  fileName: any;
  songErr: boolean = false;
  imageErr: boolean = false;
  songName: any;
  loaderShow: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private _audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.addSongForm = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(1000),
        ],
      ],
      image: ['', [Validators.required]],
      song: ['', [Validators.required]],
    });

    if (this.inputData) {
      this.addSongForm.patchValue(this.inputData);
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.imageErr = false;
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.addSongForm.patchValue({
          image: file,
        });
      }
    }
  }

  createAudio() {
    const formData = new FormData();
    formData.append('name', this.addSongForm.value.name);
    formData.append('description', this.addSongForm.value.description);
    formData.append('image', this.addSongForm.get('image')?.value);
    formData.append('song', this.addSongForm.get('song')?.value);
    if (this.inputData && this.inputData?.editMode) {
      if (this.addSongForm.invalid) {
        return;
      }
      this.loaderShow = true;
      this._audioService.updateAudio(formData, this.inputData._id).subscribe(
        (response) => {
          this.loaderShow = false;
          if (response.success) {
            this.toastr.success(response.message, 'Success');
            this.dialogRef.close({ refresh: true });
          }
        },
        (e) => {
          this.loaderShow = false;
          this.toastr.error(
            e.error.errors.length && e.error.errors[0].message
              ? e.error.errors[0].message
              : e.error.message,
            'Error'
          );
        }
      );
    } else {
      if (this.addSongForm.controls['song'].status === 'INVALID') {
        this.songErr = true;
      }
      if (this.addSongForm.controls['image'].status === 'INVALID') {
        this.imageErr = true;
      }
      if (this.addSongForm.invalid) {
        return;
      }
      this.loaderShow = true;
      this._audioService.createAudio(formData).subscribe(
        (response) => {
          this.loaderShow = false;
          if (response.success) {
            this.toastr.success(response.message, 'Success');
            this.dialogRef.close({ refresh: true });
          }
        },
        (e) => {
          this.loaderShow = false;
          this.toastr.error(
            e.error.errors.length && e.error.errors[0].message
              ? e.error.errors[0].message
              : e.error.message,
            'Error'
          );
        }
      );
    }
  }

  onSongSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.songName = file.name;
      this.songErr = false;

      this.validateAudioDuration(file);
      this.addSongForm.patchValue({
        song: file,
      });
    }
  }

  validateAudioDuration(audio: any): void {
    const minDuration = 30;
    const audioElement = new Audio();
    audioElement.src = URL.createObjectURL(audio);
    audioElement.addEventListener('loadedmetadata', () => {
      if (audioElement.duration < minDuration) {
        this.songErr = true;
        this.addSongForm.controls['song'].setErrors({
          minDurationError: true,
        });
      } else {
        this.addSongForm.controls['song'].setErrors(null);
      }
    });
  }
}
