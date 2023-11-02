import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{textAlign: "center", color: "red"}}>This page does not exist!</p>
            <Link style={{textAlign : "center"}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;