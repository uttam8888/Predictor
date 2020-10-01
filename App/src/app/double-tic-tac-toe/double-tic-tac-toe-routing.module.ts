import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubleTicTacToePage } from './double-tic-tac-toe.page';

const routes: Routes = [
  {
    path: '',
    component: DoubleTicTacToePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleTicTacToePageRoutingModule {}
