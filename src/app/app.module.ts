import { MaterialModule } from './shared/material.module';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, MaterialModule, NgxMaskModule.forRoot()],
  bootstrap: [AppComponent]
})
export class AppModule {}
