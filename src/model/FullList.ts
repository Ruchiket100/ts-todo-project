import ListItem from "./ListItem";

interface List {
    list: ListItem[]
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void
}


export default class FullList implements List {
    // singleton class - class having only one object
    static instance: FullList = new FullList()
    private constructor(
        private _list: ListItem[] = []
    ) { }

    load(): void {
        let storedList: string | null = localStorage.getItem('my-list')
        if (typeof storedList !== 'string') return

        const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })

    }

    get list(): ListItem[] {
        return this._list
    }

    save(): void {
        localStorage.setItem("my-list", JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        let newList = this._list.filter(e => e.id !== id)
        this._list = newList
        this.save()
    }

}