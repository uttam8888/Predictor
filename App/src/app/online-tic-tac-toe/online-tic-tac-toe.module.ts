import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { OnlineTicTacToePageRoutingModule } from './online-tic-tac-toe-routing.module';

import { OnlineTicTacToePage } from './online-tic-tac-toe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnlineTicTacToePageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [OnlineTicTacToePage]
})
export class OnlineTicTacToePageModule {}
