import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { clearReserver } from "../redux/reducers/reserveReducer";
import { useAppDispatch } from "../redux/app/hook";
import { persistor } from "../redux/app/store";

const Nav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 追蹤當前用戶所在的頁面
  const [currentPage, setCurrentPage] = useState<string>("");

  const homeHandler = () => {
    dispatch(clearReserver());
    persistor.purge();
    setCurrentPage("home");
  };
  const searchHandler = () => {
    setCurrentPage("search");
  };
  const reserveHandler = () => {
    setCurrentPage("");
    navigate("/service");
  };

  // 用戶離開網站後重新整理來初始化redux
  window.addEventListener("unload", () => {
    window.location.reload();
  });

  return (
    <div id="Nav">
      <div className="bar">
        <ul>
          <li>
            <Link
              className={currentPage === "home" ? "currentPage" : ""}
              onClick={homeHandler}
              to="/"
            >
              首頁
            </Link>
          </li>
          <li>
            <Link
              className={currentPage === "search" ? "currentPage" : ""}
              onClick={searchHandler}
              to="/search"
            >
              預約查詢
            </Link>
          </li>
        </ul>
      </div>
      <button onClick={reserveHandler}>立即預約</button>
    </div>
  );
};

export default Nav;
