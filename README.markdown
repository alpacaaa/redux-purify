
What if you could define reducers and actions all at once?


```javascript
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


If you pass along a second parameter, you get an `initialState`.

```javascript

const initialState = {
  sandwichesMade: 0,
};

const { actions, reducer } = purify({
  makeASandwich(state, action) => ({
    ...state,
    sandwichesMade: state.sandwichesMade + 1,
  }),
}, initialState);


const store = createStore(reducer);

store.dispatch(actions.makeASandwich());
store.dispatch(actions.makeASandwich());

console.log(store.getState());
// { sandwichesMade: 2 }
```

Note to self: this might not be the worst idea ever.
