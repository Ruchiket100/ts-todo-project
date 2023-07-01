import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement
    clear(): void
    render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement
    static instance: ListTemplate = new ListTemplate()
    private constructor() {
        this.ul = document.querySelector('.todos-list') as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }
    render(fullList: FullList): void {
        this.clear()
        fullList.list.forEach(item => {
            let li = document.createElement('li') as HTMLLIElement
            li.classList.add('todo-div')
            let check = document.createElement('input') as HTMLInputElement
            check.type = 'checkbox'
            check.id = item.id
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)
            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            let label = document.createElement('label') as HTMLLabelElement
            label.textContent = item.item
            label.htmlFor = item.id
            li.append(label)


            let button = document.createElement('button') as HTMLButtonElement
            button.innerText = 'X'
            button.classList.add('delete')
            li.append(button)
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                ListTemplate.instance.render(fullList)
            }
            )

            this.ul.append(li)
        })
    }
}