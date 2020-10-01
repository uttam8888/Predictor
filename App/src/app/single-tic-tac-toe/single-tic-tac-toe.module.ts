import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IonicModule } from '@ionic/angular';

import { SingleTicTacToePageRoutingModule } from './single-tic-tac-toe-routing.module';

import { SingleTicTacToePage } from './single-tic-tac-toe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTicTacToePageRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  declarations: [SingleTicTacToePage]
})
export class SingleTicTacToePageModule {}
