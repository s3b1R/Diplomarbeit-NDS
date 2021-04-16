import { DeltaCapaLoad } from './delta-capa-load';
import {inject, TestBed} from '@angular/core/testing';



describe('DeltaCapaLoad', () => {
  let pipe;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [DeltaCapaLoad]
    });
  });

  beforeEach(inject([DeltaCapaLoad], p => {
    pipe = p;
  }));

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should give a positive delta', () => {
    expect(pipe.transform(5, 3)).toEqual('2.0');
  });

  it('should give a negative delta', () => {
    expect(pipe.transform(4.3, 5)).toEqual('-0.7');
  });

  it('should handle null input', () => {
    expect(pipe.transform(null, null)).toEqual('0.0');
  });

});
