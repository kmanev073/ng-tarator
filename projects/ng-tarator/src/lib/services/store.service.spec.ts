import { TestBed } from '@angular/core/testing';
import { SimpleAction } from '../action-implementations/simple-action';
import { NgTaratorModule } from '../ng-tarator.module';

import { StoreService } from './store.service';

describe('StoreService', () => {
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

  it('should be created', () => {
    //arrange

    //act

    //assert
    expect(service).toBeTruthy();
  });

  it('should use the state object provided on initialization', (done: DoneFn) => {
    //arrange

    //act
    service.state.subscribe(state => {
      
      //assert
      expect(state).toBe(initialState);
      done();
    });
  });

  it('should not modify the initial state object on initialization', (done: DoneFn) => {
    //arrange

    //act
    service.state.subscribe(state => {
      
      //assert
      expect(state).toEqual({
        initialState: true
      });
      done();
    });
  });

  describe('apply', () => {

    it ('should not modify the state reference', (done: DoneFn) => {
      //arrange
      const action = new SimpleAction(() => {});

      //act
      service.apply(action);

      //assert
      service.state.subscribe(state => {
        expect(state).toBe(initialState);
        done();
      });
    }); 

    it ('should not modify the state object', (done: DoneFn) => {
      //arrange
      const action = new SimpleAction(() => {});

      //act
      service.apply(action);

      //assert
      service.state.subscribe(state => {
        expect(state).toEqual({
          initialState: true
        });
        done();
      });
    }); 

    it ('should execute action', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      
      //act
      service.apply(actionSpy);
      
      //assert
      expect(actionSpy.execute).toHaveBeenCalled();
    });

    it ('should execute action only once', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      
      //act
      service.apply(actionSpy);
      
      //assert
      expect(actionSpy.execute).toHaveBeenCalledTimes(1);
    });

    it ('should pass state object to the executed action', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      
      //act
      service.apply(actionSpy);
      
      //assert
      expect(actionSpy.execute.calls.mostRecent().args[0]).toEqual(initialState);
    });

    it ('should pass callback to the executed action', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      
      //act
      service.apply(actionSpy);
      
      //assert
      expect(actionSpy.execute.calls.mostRecent().args[1]).toBeDefined();
    });

    it ('should pass data by reference to the executed action', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      const data = {
        internal: 5
      }
      
      //act
      service.apply(actionSpy, data);
      
      //assert
      expect(actionSpy.execute.calls.mostRecent().args[2]).toBe(data);
    });

    it ('should pass correct data to the executed action', () => {
      //arrange
      const actionSpy = jasmine.createSpyObj('actionSpy', ['execute']);
      
      //act
      service.apply(actionSpy, {
        internal: 5
      });
      
      //assert
      expect(actionSpy.execute.calls.mostRecent().args[2]).toEqual({
        internal: 5
      });
    });

    it ('should keep working after applying faulty action', () => {
      //arrange
      const actionMock = {
        execute: (state: any, callback: () => void, data?: any): void => {
          throw new Error();
        }
      };
      let func = () => service.apply(actionMock);
      
      //act
      //assert
      expect(func).not.toThrow();      
    });

    it ('should log an error to the console after applying faulty action', () => {
      //arrange
      const actionMock = {
        execute: (state: any, callback: () => void, data?: any): void => {
          throw new Error();
        }
      };
      spyOn(console, 'log');

      //act
      service.apply(actionMock);

      //assert
      expect(console.log).toHaveBeenCalled();
    });
  });
});
