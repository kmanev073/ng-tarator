import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreService } from './services/store.service';

@NgModule({

})
export class NgTaratorModule { 
  static forRoot(state: Object): ModuleWithProviders<NgTaratorModule> {
    return {
      ngModule: NgTaratorModule,
      providers: [
        { provide: StoreService, useValue: new StoreService(state) }
      ]
    }
  }
}
