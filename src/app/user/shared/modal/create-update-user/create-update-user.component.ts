import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../model/user.model';
import { RoleNameTypes } from '../../model/role-name-types.enum';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
})
export class CreateUpdateUserComponent implements OnInit {

  RoleNameTypes = RoleNameTypes;
  userForm: FormGroup;
  roles: Role[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User}) {  }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      enable: new FormControl(false),
      newRoleName: new FormControl(''),
      password: new FormControl(''),
    });

    if (this.data.user) {
      this.userForm.get('username').setValue(this.data.user.username);
      this.userForm.get('enable').setValue(this.data.user.enable);
      this.roles = Object.assign([], this.data.user.roles);
    } else {
      this.roles = [];
    }

    this.userForm.get('newRoleName').setValue(RoleNameTypes.ROLE_USER);
  }

  buildUser(): User {
    let password = '';
    if(!this.data.user || !this.data.user.id){
       password = this.userForm.get('password').value;
    }

    return {
      ...this.data.user,
      roles: this.roles,
      enable: this.userForm.get('enable').value,
      username: this.userForm.get('username').value,
      password: password 
    };
  }

  deleteRole(role: Role) {
    this.roles = this.roles.filter(rol => rol.name !== role.name);
  }

  addRole() {
    const role: Role = {
      id: null,
      name: this.userForm.get('newRoleName').value
    };

    if (role.name && this.roles.every(rol => rol.name !== role.name)) {
      this.roles.push(role);
    }
  }

}
