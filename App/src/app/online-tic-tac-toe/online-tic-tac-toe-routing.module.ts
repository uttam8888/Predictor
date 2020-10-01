import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineTicTacToePage } from './online-tic-tac-toe.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineTicTacToePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineTicTacToePageRoutingModule {}
