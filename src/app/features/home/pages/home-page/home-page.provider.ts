import { Provider } from "@angular/core";
import { UserApiService } from "../../services/user-api.service";
import { UserService } from "../../services/user.service";

export const HomePageProviders: Provider[] = [
  UserService,
  UserApiService,
];
