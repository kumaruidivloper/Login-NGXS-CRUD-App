import { User } from '../../../core/interfaces/user.model';
export class AddUser {
    static readonly type = '[USER] Add';

    constructor(public payload: User) {
    }
}

export class GetUsers {
    static readonly type = '[USER] Get';
}

export class UpdateUser {
    static readonly type = '[USER] Update';

    constructor(public payload: User, public id: number) {
    }
}

export class DeleteUser {
    static readonly type = '[USER] Delete';

    constructor(public id: number) {
    }
}

export class SetSelectedUser {
    static readonly type = '[USER] Set';

    constructor(public payload: User) {
    }
}
