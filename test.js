

import { expect } from 'chai';
import purify from './index';





const testReducer = (reducer, action, state, expectedState) => {
  const newState = reducer(state, action);
  expect(newState).to.be.an('object');
  expect(newState).to.deep.equal(expectedState);
};


describe('redux-purify', () => {
  it('works with an empty object', () => {
    const { actions, reducer } = purify({});

    expect(actions).to.be.an('object').and.be.empty;
    expect(reducer({ a: 2 })).to.deep.equal({ a: 2 });
  });


  it('works', () => {

    const { actions, reducer } = purify({
      someAction: {
        actionCreator: (a, b) => ({
          sum: a + b,
        }),
        reducer: (state, action) => {
          return {
            ...state,
            total: action.sum,
          };
        },
      }
    });

    expect(actions).to.be.an('object').and.have.property('someAction');
    expect(actions.someAction).to.be.a('function');

    const action = actions.someAction(2, 3);
    expect(action).to.be.an('object');
    expect(action).to.have.property('type').and.equal('someAction');
    expect(action).to.have.property('sum').and.equal(5);

    const newState = reducer({ a: 2 }, action);
    expect(newState).to.be.an('object');
    expect(newState).to.have.property('a').and.equal(2);
    expect(newState).to.have.property('total').and.equal(5);

    expect(reducer({ a: 2 })).to.deep.equal({ a: 2 });
  });



  it('works with shorthand syntax', () => {
    const { actions, reducer } = purify({
      // you should strive to put your logic into reducers whenever possible
      // https://github.com/gaearon/redux-thunk/issues/7#issuecomment-129235274
      someAction: (state, action, a, b) => {
        return {
          ...state,
          total: a + b,
        };
      }
    });

    expect(actions).to.be.an('object').and.have.property('someAction');
    expect(actions.someAction).to.be.a('function');

    const action = actions.someAction(2, 3);
    expect(action).to.be.an('object');
    expect(action).to.have.property('type').and.equal('someAction');

    const newState = reducer({ a: 2 }, action);
    expect(newState).to.be.an('object');
    expect(newState).to.have.property('a').and.equal(2);
    expect(newState).to.have.property('total').and.equal(5);

    expect(reducer({ a: 2 })).to.deep.equal({ a: 2 });
  });



  it('works with multiple actions/reducers, despite their definition', () => {
    const { actions, reducer } = purify({
      someAction: (state, action, a, b) => {
        return {
          ...state,
          total: a + b,
        };
      },

      anotherAction: {
        actionCreator: (a, b) => ({
          difference: a - b
        }),
        reducer: (state, action) => ({
          ...state,
          total: action.difference
        })
      }
    });


    expect(actions).to.be.an('object');
    expect(actions.someAction).to.be.a('function');
    expect(actions.anotherAction).to.be.a('function');

    const sum = actions.someAction(2, 3);
    expect(sum).to.be.an('object');
    expect(sum).to.have.property('type').and.equal('someAction');
    testReducer(reducer, sum, { a: 2 }, { a: 2, total: 5 });


    const difference = actions.anotherAction(5, 2);
    expect(difference).to.be.an('object');
    expect(difference).to.have.property('type').and.equal('anotherAction');
    testReducer(reducer, difference, { a: 2 }, { a: 2, total: 3 });

    expect(reducer({ a: 2 })).to.deep.equal({ a: 2 });
  });
})
