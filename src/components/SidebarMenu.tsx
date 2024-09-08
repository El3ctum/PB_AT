import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SidebarMenu = () => {

    const { logout } = useAuth()

    return (
        <aside>
            <nav>
                <ul>
                    <li><Link to={"about"}>About</Link></li>
                    <li><Link to={"contact"}>Contact</Link></li>
                    <li><Link to={"dashboard"}>Dashboard</Link></li>
                    <li><Link to={"/"} onClick={() => { logout() }}>Logout</Link></li>
                </ul>
            </nav>
        </aside>
    )
}


export default SidebarMenu;