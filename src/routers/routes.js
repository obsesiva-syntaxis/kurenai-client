import LayoutBasic from '../layouts/LayoutBasic';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
// import NewEventForm  from '../components/admin/calendar/NewEventFprm';
// import EditEventForm  from '../components/admin/calendar/EditEventForm';

const routes = [
    {
        path: '/',
        layout: LayoutBasic,
        component: Home,
        exact: true,
    },
    {
        path: '/calendar',
        layout: LayoutBasic,
        component: Calendar,
        exact: true,
    },
    // {
    //     path: '/newevent',
    //     layout: LayoutBasic,
    //     component: NewEvent,
    //     exact: true,
    // },
    // {
    //     path: '/editevent',
    //     layout: LayoutBasic,
    //     component: EditEvent,
    //     exact: true,
    // },
]


export default routes;