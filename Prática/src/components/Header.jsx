import { NavLink } from "react-router-dom";
import { auth } from "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetStatus } from "../store/booksSlice";
import { useSelector } from "react-redux";
import { selectBooks } from "../store/booksSlice";
function Header({ pageTitle }) {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const bookStatus = useSelector(selectBooks).status;


  const handleLogOut = () => {

    signOut(auth).then(() => {
      navigate("/");
      dipatch(resetStatus);
    }).catch((error) => {
    });
  }

  return (
    <>

      <h1>{pageTitle}</h1>

      <div className="header-btns">

        <NavLink to="/">
          <button className="btn">
            Books
          </button>
        </NavLink>

        <NavLink to="/add-book">
          <button className="btn">
            Add Book +
          </button>
        </NavLink>

        <button className="btn transparent" onClick={() => handleLogOut()}>
          Logout
        </button>


      </div>

    </>
  )
}

export default Header
