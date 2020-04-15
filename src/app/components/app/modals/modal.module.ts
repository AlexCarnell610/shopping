import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddItemModal } from './add-item-modal/add-item-modal';
import { AddItemsModal } from './add-items-modal/add-items-modal';

const MODALS = [AddItemModal, AddItemsModal];

@NgModule({
  declarations: MODALS,
  imports: [CommonModule, NgxSmartModalModule.forChild(), ReactiveFormsModule, FormsModule],
  exports: [...MODALS, NgxSmartModalModule],
  providers: [],
})
export class ModalModule {}
