import { TestBed } from "@angular/core/testing";
import { NgTaratorModule } from "../ng-tarator.module";
import { StoreService } from "../services/store.service";
import { SimpleAction } from "./simple-action";

describe('SimpleAction', () => {
  let service: StoreService;
  let initialState = {
    initialState: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgTaratorModule.forRoot(initialState)
      ]
    });
    service = TestBed.inject(StoreService);
  });

  describe('id', () => {

    it('should not modify the state object', (done: DoneFn) => {
      //arrange

      //act
      service.apply(SimpleAction.id);

      //assert
      service.state.subscribe(state => {
      
        //assert
        expect(state).toEqual(initialState);
        done();
      })
    });
  });
});