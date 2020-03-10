import MyComponent from './MyComponent'
import { drizzleConnect } from "@drizzle/react-plugin";

const mapStateToProps = state => ({
  accounts: state.accounts,
  Register: state.contracts.Register,
  drizzleStatus: state.drizzleStatus
})

const MyContainer = drizzleConnect(
  MyComponent,
  mapStateToProps
)

export default MyContainer
