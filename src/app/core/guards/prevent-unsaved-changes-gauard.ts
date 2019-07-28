import { CanDeactivate } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap';
import { ConfirmLeaveComponent } from '../components/confirm-leave/confirm-leave.component';

export interface FormComponent {
    userForm: FormGroup;
}

@Injectable()

export class PreventUnsavedChangesGuard implements CanDeactivate<FormComponent> {
    constructor(private modalService: BsModalService) {}
    canDeactivate(component: FormComponent) {
        if (component.userForm.dirty) {
            const subject = new Subject<boolean>();

            const modal = this.modalService.show(ConfirmLeaveComponent, {class: 'modal-dialog-primary'});
            modal.content.subject = subject;

            return subject.asObservable();
            // return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }
}
