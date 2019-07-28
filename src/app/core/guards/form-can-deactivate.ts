import { PreventUnsavedChangesGuard } from './component-can-deactivate';
import { NgForm } from '@angular/forms';

export abstract class FormCanDeactivate extends PreventUnsavedChangesGuard {
 userForm: any;

 abstract get form(): NgForm;

 canDeactivate(): boolean {
      return this.userForm.submitted || !this.userForm.dirty;
  }
}
