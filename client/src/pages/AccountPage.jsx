import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){

    const [redirect, setRedirect] = useState(null);
    const {user, setUser, ready} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }
    // console.log(subpage);
    
    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }

    function linkClasses(type = null){
        let classes = "py-2 px-4";
        if(type === subpage || (type === 'profile' && subpage === undefined)){
            classes = "py-2 px-4 bg-primary text-white rounded-full";
        }
        return classes;
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'} >My profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'} >My booking</Link>
                <Link className={linkClasses('places')} to={'/account/places'} >My accommodations</Link>
            </nav>
            
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br/>
                    <button className="primary mx-w-sm mt-2" onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    )
}