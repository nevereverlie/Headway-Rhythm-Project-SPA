/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTrackToCommonPlaylistComponent } from './add-track-to-common-playlist.component';

describe('AddTrackToCommonPlaylistComponent', () => {
  let component: AddTrackToCommonPlaylistComponent;
  let fixture: ComponentFixture<AddTrackToCommonPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrackToCommonPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackToCommonPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
