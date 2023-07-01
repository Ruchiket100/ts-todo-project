import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplate";

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance

  const button = document.querySelector('.add-todo') as HTMLButtonElement

  button.addEventListener('click', () => {
    console.log('Hello Worl')
    const input = document.querySelector('.todo-input') as HTMLInputElement
    let value = input.value.trim()
    if (!value) return
    let itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id + 1) : 1
    const newItem = new ListItem(itemId.toString(), value)
    fullList.addItem(newItem)
    template.render(fullList)
    input.value = ''
  })

  const clearItem = document.querySelector('.clear-item')
  clearItem?.addEventListener('click', () => {
    fullList.clearList()
    template.clear()
  })

  fullList.load()
  template.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)