
import purify from 'redux-purify'

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]



export const { actions, reducer } = purify({

  addTodo(state, action, text) {
    return [
      {
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      },
      ...state
    ]
  },

  deleteTodo(state, action, id) {
    return state.filter(todo =>
      todo.id !== id
    )
  },

  editTodo(state, action, id, text) {
    return state.map(todo =>
      todo.id === id ?
        Object.assign({}, todo, { text }) :
        todo
    )
  },

  completeTodo(state, action, id) {
    return state.map(todo =>
      todo.id === id ?
        Object.assign({}, todo, { completed: !todo.completed }) :
        todo
    )
  },

  completeAll(state, action) {
    const areAllMarked = state.every(todo => todo.completed)
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }))
  },

  clearCompleted(state, action) {
    return state.filter(todo => todo.completed === false)
  }

}, initialState);
