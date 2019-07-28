import { CanDeactivate } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

Injectable({
    providedIn: 'root'
});

export interface FormComponent {
    userForm: FormGroup;
}

export class PreventUnsavedChangesGuard implements CanDeactivate<FormComponent> {
    canDeactivate(component: FormComponent) {
        if (component.userForm.dirty) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }
}
