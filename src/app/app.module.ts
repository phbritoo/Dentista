import { MaterialModule } from './shared/material.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, MaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
