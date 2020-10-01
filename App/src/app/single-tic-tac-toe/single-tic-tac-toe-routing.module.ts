import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTicTacToePage } from './single-tic-tac-toe.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTicTacToePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTicTacToePageRoutingModule {}
