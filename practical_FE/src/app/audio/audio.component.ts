import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AddComponent } from './add/add.component';
import { AudioService } from '../services/audio.service';
import { environment } from 'src/environments/environment';
import { DeleteDialogComponent } from '../common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
})
export class AudioComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'image',
    'play',
    'action',
  ];
  dataSource: any = [];
  tableQuery: Object = { page: 1, pageSize: 15 };
  totalCategory: any = 0;
  profileImageUrl: String = environment.imageUrl;
  audioUrl: String = environment.songUrl;
  audio: HTMLAudioElement = new Audio();
  audios: any = [];

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.getAllAudio(this.tableQuery);
  }

  getAllAudio(query: any) {
    if (query.page == 1) {
      this.dataSource = new MatTableDataSource([]);
    }
    this._audioService.getAllAudio(query).subscribe(
      (response) => {
        if (response.success) {
          this.totalCategory = response.data.audios?.totalAudio;
          this.audios = response.data.audios?.audio;
          this.dataSource = new MatTableDataSource(this.audios);
        }
      },
      (e) => {
        this.toastr.error(
          e.error.errors.length && e.error.errors[0].message
            ? e.error.errors[0].message
            : e.error.message,
          'Error'
        );
      }
    );
  }

  addAudio() {
    let addAudioDialogRef = this.dialog.open(AddComponent, {
      width: '500px',
    });
    addAudioDialogRef.afterClosed().subscribe((_result: any) => {
      if (_result?.refresh) {
        this.getAllAudio(this.tableQuery);
      }
    });
  }
  deleteAudio(item: any) {
    let deleteAudioDialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete the Audio.',
        title: 'Delete audio?',
      },
    });
    deleteAudioDialogRef.afterClosed().subscribe((_result: any) => {
      if (_result?.confirm) {
        if (item && item._id) {
          this._audioService.deleteAudio(item._id).subscribe(
            (response) => {
              if (response.success) {
                this.toastr.success(response.message, 'Success');
                this.getAllAudio(this.tableQuery);
              }
            },
            (e) => {
              this.toastr.error(
                e.error.errors.length && e.error.errors[0].message
                  ? e.error.errors[0].message
                  : e.error.message,
                'Error'
              );
            }
          );
        } else {
          this.toastr.error('Something went wrong!', 'Error');
        }
      }
    });
  }

  editAudio(item: any) {
    item.editMode = true;
    let addAudioDialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data: item,
    });
    addAudioDialogRef.afterClosed().subscribe((_result: any) => {
      if (_result?.refresh) {
        this.getAllAudio(this.tableQuery);
      }
    });
  }

  handlePageEvent(event: any) {
    this.tableQuery = { page: event?.pageIndex + 1, pageSize: event?.pageSize };
    this.getAllAudio(this.tableQuery);
  }

  playAudio(data: any) {
    this.audios.forEach((element: any) => {
      if (data._id == element._id) {
        data.isPlaying = element.isPlaying ? false : true;
      } else {
        element.isPlaying = false;
      }
    });
    if (data.isPlaying) {
      this.audio.src = this.audioUrl + data.song;
      this.audio.load();
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
