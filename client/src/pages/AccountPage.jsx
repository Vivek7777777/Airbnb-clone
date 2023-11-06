import { useContext } from "react"
import { UserContext } from "../UserContext"


export default function Account(){

    const {user} = useContext(UserContext);

    return(
        <>
        account {user.name}
        </>
    )
}