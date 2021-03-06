import Popular from "../pages/Popular"
import Messages from "../pages/Messages"
import Profile from "../pages/Profile"
import Home from "../pages/Home"
import Favorite from "../pages/Favorite"
import Settings from "../pages/Settings"
import Project from "../pages/Project"
import Create from "../pages/Create"


export const privateRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/messages', element: Messages},
    {path: '/profile/:userID', element: Profile},
    {path: '/project/:projectID', element: Project},
    {path: '/home', element: Home},
    {path: '/create', element: Create},
    {path: '/favorite', element: Favorite},
    {path: '/settings', element: Settings},
]

export const publicRoutes = [
    {path: '/', element: Popular},
    {path: '/popular', element: Popular},
    {path: '/profile/:userID', element: Profile},
    {path: '/project/:projectID', element: Project},
]