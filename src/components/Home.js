import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {

    const { authState } = useContext(AuthContext);

    return ( 
        <div>
            <h1>Home</h1>
            {authState && <p>Welcome {authState.email}</p>} 
        </div>
    );
}
 
export default Home;