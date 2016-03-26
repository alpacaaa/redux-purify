
What if you could define reducers and actions all at once?


```
import purify from 'redux-purify';

const { actions, reducer } = purify({
  increment(state, action) => ({
    ...state,
    counter: state.counter + 1,
  }),


  decrement(state, action) => ({
    ...state,
    counter: state.counter - 1,
  }),


  setCounter(state, action, value) => ({
    ...state,
    counter: value,
  })
});


const store = createStore(reducer);

store.dispatch(actions.increment());
store.dispatch(actions.decrement());

store.dispatch(actions.setCounter(5));
```

Note to self: this might be the worst idea ever.
