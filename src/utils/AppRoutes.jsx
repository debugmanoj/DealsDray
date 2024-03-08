import AdminHome from "../Components/AdminHome"
import Login from "../Components/Login"
import Dashboard from "../Components/Dashboard"
import CreeateEmployee from "../Components/createEmployee"
import EmployeeList from "../Components/EmployeeList"
import Edit from "../Components/Edit"
const RouterWay=
[
    {
        path:"/",
        exact: true,
        element:<Login/>
    },
    {
        path:"/adminHome",
        exact: true,
        element:<AdminHome/>,
        children:
        [
            {
            path:"dashboard",
            element:<Dashboard/>
            },
            {
                path:"createEmployee",
                element:<CreeateEmployee/>
                },
                {
                    path:"EmployeeList",
                    element:<EmployeeList/>
                },
  
        ]
    },
    {
        path:"/Edit/:id",
        element:<Edit />
    }
]
export default RouterWay