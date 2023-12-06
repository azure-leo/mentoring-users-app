import { UsersEntity} from "@users/core/data-access";
import { Optional } from "@angular/core";

export type UsersFilter = Partial<UsersEntity> | Optional;
