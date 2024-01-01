import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BuypageComponent } from './buypage/buypage.component';

export const routes: Routes = [
    {path: "", component: MainComponent},
    {path: "buy", component: BuypageComponent}
];
