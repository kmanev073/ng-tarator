import { TestBed } from "@angular/core/testing";
import { NgTaratorModule } from "../ng-tarator.module";
import { StoreService } from "../services/store.service";
import { SimpleAction } from "./simple-action";

describe('SimpleAction', () => {
  let service: StoreService;
  let initialState = {};

  beforeEach(() => {
    initialState = {
      initialState: true
    };

    TestBed.configureTestingModule({
      imports: [
        NgTaratorModule.forRoot(initialState)
      ]
    });
    service = TestBed.inject(StoreService);
  });

  describe('execute', () => {

  });

  describe('id', () => {

    it ('should not modify the state reference',  (done: DoneFn) => {
      //arrange

      //act
      service.apply(SimpleAction.id);

      //assert
      service.state.subscribe(state => {
        expect(state).toBe(initialState);
        done();
      });
    }); 

    it('should not modify the state object', (done: DoneFn) => {
      //arrange

      //act
      service.apply(SimpleAction.id);

      //assert
      service.state.subscribe(state => {

        expect(state).toEqual({
          initialState: true
        });
        done();
      });
    });
  });
});