import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UsersFacade} from "@users/users/data-access";

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {

  public readonly usersFacade = inject(UsersFacade)
  public readonly searchControl = new FormControl('')

  constructor() {
    this.searchControl.valueChanges.subscribe((query) => {
      console.log(query)
      this.usersFacade.setUsersFilter({
        usersFilter: {name: query}
      })
    })
  }
}
