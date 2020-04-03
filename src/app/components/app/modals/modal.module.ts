import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { AddItemModal } from './add-item-modal/add-item-modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const MODALS = [AddItemModal];

@NgModule({
  declarations: MODALS,
  imports: [CommonModule, NgxSmartModalModule.forChild(), ReactiveFormsModule, FormsModule],
  exports: [...MODALS, NgxSmartModalModule],
  providers: [],
})
export class ModalModule {}
