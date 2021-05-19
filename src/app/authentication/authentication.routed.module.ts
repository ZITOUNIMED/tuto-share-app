import {NgModule} from "@angular/core";
import {AuthenticationModule} from "./authentication.module";
import {AuthenticationRoutingModule} from "./authentication.routing.module";

@NgModule({
  imports: [AuthenticationModule, AuthenticationRoutingModule]
})
export class AuthenticationRoutedModule {}
