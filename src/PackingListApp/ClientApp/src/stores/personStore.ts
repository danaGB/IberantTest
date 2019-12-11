import { DataStore, DataModel } from './dataStore';
import { FormStore } from './formStore';
import { repository, reduce, AsyncAction } from 'redux-scaffolding-ts';
import { container } from '../inversify.config';
import { Validator } from "lakmus";
import { CommandResult } from './types';
import { AxiosResponse } from 'axios';

export interface PersonItem {
    id: number;
    name: string;
    lastName: string;
    occupation: string;
}

@repository("@@PersonItem", "TestItem.summary")
export class PersonItemsStore extends DataStore<PersonItem> {
    baseUrl: string = "api/person";

    constructor() {
        super('PersonItem', {
            count: 0,
            isBusy: false,
            items: [],
            result: undefined,
            discard: item => { }
        }, container);
    }
}

export interface NewPersonItem {
    name: string,
    lastName: string,
    occupation: string,
}

export class NewPersonValidator extends Validator<NewPersonItem> {
    constructor() {
        super();
        this.ruleFor(x => x.name)
            .notNull()
            .withMessage("Name cant be empty.");
        this.ruleFor(x => x.lastName)
            .notNull()
            .withMessage("Last name cant be empty.")
    }
}

@repository("@@PersonItem", "PersonItem.new")
export class NewPersonItemStore extends FormStore<NewPersonItem> {
    baseUrl: string = "api/person";

    protected validate(item: NewPersonItem) {
        return (new NewPersonValidator()).validate(item);
    }

    constructor() {
        super('NEW_PersonItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }
}

export class PersonValidator extends Validator<PersonItem> {
    constructor() {
        super();
        this.ruleFor(x => x.name)
            .notNull()
            .withMessage("Name can not be null.");
        this.ruleFor(x => x.lastName)
            .notNull()
            .withMessage("Last name can not be null.");
    }
}

const PersonItem_UPDATE_ITEM = "PersonItem_UPDATE_ITEM";
//const PersonItem_DELETE_ITEM = "PersonItem_DELETE_ITEM";
@repository("@@PersonItem", "PersonItem.detail")
export class PersonItemStore extends FormStore<PersonItem> {
    baseUrl: string = "api/person";

    protected validate(item: PersonItem) {
        return new PersonValidator().validate(item);
    }

    constructor() {
        super('PersonItem', {
            isBusy: false,
            status: 'New',
            item: undefined,
            result: undefined
        }, container);
    }

    public async Update(item: PersonItem) {
        var result = await super.patch(PersonItem_UPDATE_ITEM, `${item.id}`, item) as any;
        return result.data as CommandResult<PersonItem>;
    }

    @reduce(PersonItem_UPDATE_ITEM)
    protected onUpdateBillingOrder(): AsyncAction<AxiosResponse<CommandResult<PersonItem>>, DataModel<PersonItem>> {
        return super.onPatch();
    }
}