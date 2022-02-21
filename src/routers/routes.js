import LayoutBasic from '../layouts/LayoutBasic';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import User from '../pages/User';

// import NewEventForm  from '../components/admin/calendar/NewEventFprm';
// import EditEventForm  from '../components/admin/calendar/EditEventForm';

const routes = [
    {
        path: '/admin',
        // layout: LayoutBasic,
        component: <Home />,
        exact: true,
    },
    {
        path: '/admin/calendar',
        // layout: LayoutBasic,
        component: <Calendar />,
        exact: true,
    },
    {
        path: '/admin/user',
        // layout: LayoutBasic,
        element: <User />,
        exact: true,
    },
]


export default routes;