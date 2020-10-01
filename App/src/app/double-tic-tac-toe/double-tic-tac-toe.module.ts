import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { DoubleTicTacToePageRoutingModule } from './double-tic-tac-toe-routing.module';

import { DoubleTicTacToePage } from './double-tic-tac-toe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoubleTicTacToePageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [DoubleTicTacToePage]
})
export class DoubleTicTacToePageModule {}
