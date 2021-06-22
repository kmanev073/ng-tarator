import { TestBed } from '@angular/core/testing';
import { SimpleAction } from '../action-implementations/simple-action';
import { NgTaratorModule } from '../ng-tarator.module';
import { StoreService, TaratorState } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  describe('state is primitive value', () => {
    let initialState = 6;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgTaratorModule
        ],
        providers: [
          { provide: TaratorState, useValue: initialState }
        ]
      });
      service = TestBed.inject(StoreService);
      initialState = 6;
    });

    it('should be created', () => {
      //arrange

      //act

      //assert
      expect(service).toBeTruthy();
    });

    it('should use the state provided on initialization', () => {
      //arrange

      //act
        
      //assert
      expect(service.state).toBe(initialState);
    });
  });

  describe('state is array of primitive values', () => {
    let initialState = [1, 2, 3];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgTaratorModule
        ],
        providers: [
          { provide: TaratorState, useValue: initialState }
        ]
      });
      service = TestBed.inject(StoreService);
      initialState[0] = 1;
      initialState[1] = 2;
      initialState[2] = 3;
    });

    it('should be created', () => {
      //arrange

      //act

      //assert
      expect(service).toBeTruthy();
    });
  });

  describe('state is object', () => {
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
      service = TestBed.inject(StoreService);
      initialState.initialState = true;
    });

    it('should be created', () => {
      //arrange

      //act

      //assert
      expect(service).toBeTruthy();
    });

    it('should use the state object provided on initialization', () => {
      //arrange

      //act
        
      //assert
      expect(service.state).toBe(initialState);
    });

    it('should not modify the initial state object on initialization', () => {
      //arrange

      //act
        
      //assert
      expect(service.state).toEqual({
        initialState: true
      });
    });

    describe('apply', () => {

      it ('should not modify the state reference', () => {
        //arrange
        const action = new SimpleAction(() => {});

        //act
        service.apply(action);

        //assert
        expect(service.state).toBe(initialState);
      });

      it ('should not modify the state object', () => {
        //arrange
        const action = new SimpleAction(() => {});

        //act
        service.apply(action);

        //assert
        expect(service.state).toEqual({
          initialState: true
        });
      }); 

      it ('should not throw exceptions', () => {
        //arrange
        const action = new SimpleAction(() => {});
        const func = () => service.apply(action);

        //act
        //assert
        expect(func).not.toThrow();
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

      it ('should pass callable and correctly bound callback', () => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            callback();
          }
        };
        spyOn(service, 'afterActionApplied');

        //act
        service.apply(actionMock);

        //assert
        expect(service.afterActionApplied).toHaveBeenCalled();      
      });

      it ('should trigger state update after applied action calls the callback', () => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            callback();
          }
        };
        const stateChangedSubject = (service as any).stateChangedSubject;
        spyOn(stateChangedSubject, 'next');

        //act
        service.apply(actionMock);

        //assert
        expect(stateChangedSubject.next).toHaveBeenCalled();      
      });

      it ('should update state only once after applied action calls the callback', () => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            callback();
          }
        };
        const stateChangedSubject = (service as any).stateChangedSubject;
        spyOn(stateChangedSubject, 'next');

        //act
        service.apply(actionMock);

        //assert
        expect(stateChangedSubject.next).toHaveBeenCalledTimes(1);      
      });

      it ('should trigger the state changed observable after applying action', (done: DoneFn) => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            state.initialState = false;
            callback();
          }
        };

        service.stateChanged.subscribe(() => {
          //assert
          expect((service.state as any).initialState).toEqual(false);
          done();
        });

        //act
        service.apply(actionMock); 
      });

      it ('should keep the initial state object reference after applying action', (done: DoneFn) => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            callback();
          }
        };

        service.stateChanged.subscribe(() => {
          //assert
          expect(service.state).toBe(initialState);
          done();
        });

        //act
        service.apply(actionMock); 
      });

      it ('should keep working after applying faulty action', () => {
        //arrange
        const actionMock = {
          execute: (state: any, callback: () => void, data?: any): void => {
            throw new Error();
          }
        };
        const func = () => service.apply(actionMock);
        
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

  describe('state is array of objects', () => {
    let initialState = [
      {
        first: true,
        second: false
      },
      {
        first: false,
        second: true
      }
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NgTaratorModule
        ],
        providers: [
          { provide: TaratorState, useValue: initialState }
        ]
      });
      service = TestBed.inject(StoreService);
      initialState[0].first = true;
      initialState[0].second = false;
      initialState[1].first = false;
      initialState[1].second = true;
    });

    it('should be created', () => {
      //arrange

      //act

      //assert
      expect(service).toBeTruthy();
    });
  });
});
