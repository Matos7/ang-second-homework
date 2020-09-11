import { CheckTokenGuard } from './guards/check-token.guard';
import { UsersService } from './services/users.service';
import { DataService } from './/services/data.service';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [DataService,UsersService,CheckTokenGuard]
})
export class CoreModule {}
