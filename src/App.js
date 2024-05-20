import EmployeeList from "./EmployeeList";
import EmployeeForm from './EmployeeForm';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';
import EmployeeDetails from "./EmployeeDetails";
import LoginScreen from "./LoginScreen";
import ProtectedRoute from "./services/ProtectedRoute";
import Header from "./Header";

function App() {
    return (
    <div>
        <Router>
          <Header/>
          <Routes>
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<EmployeeList/>} />
              <Route path="/employee-details/:id" element={<EmployeeDetails/>}></Route>
              <Route path="/employee-form" element={<EmployeeForm/>} />
            </Route>
          </Routes>
        </Router>
    </div>
    )
}

export default App;
