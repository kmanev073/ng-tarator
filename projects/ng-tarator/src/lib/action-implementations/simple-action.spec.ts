import { TestBed } from "@angular/core/testing";
import { NgTaratorModule } from "../ng-tarator.module";
import { StoreService, TaratorState } from "../services/store.service";
import { SimpleAction } from "./simple-action";

describe('SimpleAction', () => {
  let state: object;
  let service: StoreService;

  let initialState = {
    initialState: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgTaratorModule
      ],
      providers: [
        { provide: TaratorState, useValue: initialState }
      ]
    });
    state = TestBed.inject(TaratorState);
    service = TestBed.inject(StoreService);
  });

  describe('execute', () => {

  });

  describe('id', () => {

    it ('should not modify the state reference',  () => {
      //arrange

      //act
      service.apply(SimpleAction.id);

      //assert
      expect(state).toBe(initialState);
    }); 

    it('should not modify the state object', () => {
      //arrange

      //act
      service.apply(SimpleAction.id);

      //assert
      expect(state).toEqual({
        initialState: true
      });
    });
  });
});