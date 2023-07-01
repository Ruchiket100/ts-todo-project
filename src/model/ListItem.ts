export interface Item {
    id: string,
    item: string,
    checked: boolean
}

export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: string = '',
        private _checked: boolean = false
    ) { }
    set id(id: string) {
        this._id = id
    }

    get id() {
        return this._id
    }

    set item(item: string) {
        this._item = item
    }

    get item() {
        return this._item
    }
    set checked(checked: boolean) {
        this._checked = checked
    }

    get checked() {
        return this._checked
    }
}
