import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PopUpMessageComponent } from './pop-up-message/pop-up-message.component';

@NgModule({
  declarations: [
    ConfirmBoxComponent,
    LoadingSpinnerComponent,
    PopUpMessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    ConfirmBoxComponent,
    LoadingSpinnerComponent,
    PopUpMessageComponent,
  ],
})
export class SharedModule {}
