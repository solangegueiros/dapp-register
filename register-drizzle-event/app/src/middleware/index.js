import { toast } from 'react-toastify'
import { generateStore, EventActions } from "@drizzle/store";
import drizzleOptions from '../drizzleOptions'

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    console.log("contract:", contract);
    const contractEvent = action.event.event
    //const message = action.event.returnValues[0]
    console.log("action.event:", action.event);
    console.log("action.event.returnValues:", action.event.returnValues);
    
    let message
    if (contract === "Register") {
      message = action.event.returnValues._info
    }
    else if (contract === "SimpleStorage") {
      message = action.event.returnValues._message
    }

    const display = `${contract}(${contractEvent}): ${message}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}


const appMiddlewares = [ contractEventNotifier ]

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false  // enable ReduxDevTools!
})

// Use the store with DrizzleProvider
export default store
