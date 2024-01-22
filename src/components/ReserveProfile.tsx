import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { useNavigate } from "react-router-dom";
import { selectReserve } from "../redux/reducers/reserveReducer";
import ReserveService from "../api/reserveApi";
import { clearReserver } from "../redux/reducers/reserveReducer";
import { persistor } from "../redux/app/store";

const ReserveProfile: React.FC = () => {
  const navigate = useNavigate();
  const reserve = useAppSelector(selectReserve);
  const dispatch = useAppDispatch();
  const topRef = useRef<HTMLDivElement>(null);

  // 自動捲動 及 轉換星期
  const [day, setDay] = useState<string>("");

  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({
        top: topRef.current.offsetTop,
      });
    }
    switch (reserve.day) {
      case 1:
        setDay("星期一");
        break;
      case 2:
        setDay("星期二");
        break;
      case 3:
        setDay("星期三");
        break;
      case 4:
        setDay("星期四");
        break;
      case 5:
        setDay("星期五");
        break;
      case 6:
        setDay("星期六");
        break;
      case 0:
        setDay("星期日");
        break;
    }
  }, []);

  const gobackHandler = () => {
    navigate("/time");
  };

  // 存取用戶的預約資料
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("小姐");
  const [textarea, setTextarea] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const phoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const genderHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };
  const taxtareaHandler = (e: any) => {
    setTextarea(e.target.value);
  };
  const termsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };

  // 資料格式的錯誤訊息
  const [message, setMessage] = useState();

  // 將預約資料透過API傳到資料庫
  interface ReserveType {
    year: number;
    month: number;
    date: number;
    day: string;
    time: string;
    ms: number;
    service: string;
    price: number;
    name: string;
    phone: string;
    gender: string;
    email: string;
    textarea: string;
    terms: boolean;
  }
  const reserveHandler = async () => {
    let allData: ReserveType = {
      year: reserve.year,
      month: reserve.month,
      date: reserve.date,
      day: day,
      time: reserve.time,
      ms: reserve.ms,
      service: reserve.service,
      price: reserve.price,
      name: name,
      phone: phone,
      gender: gender,
      email: email,
      textarea: textarea,
      terms: terms,
    };

    try {
      await ReserveService.reserve(allData);
      dispatch(clearReserver());
      persistor.purge();
      window.alert("預約成功! 頁面將重新導向首頁。");
      navigate("/");
    } catch (e: any) {
      setMessage(e.response.data);
    }
  };

  return (
    <div id="Data" ref={topRef}>
      <section className="step">
        <div className="step1">
          <div className="circle circle1">
            <p className="num">01</p>
            <p className="check"> ✔{reserve.service} </p>
          </div>
        </div>
        <div className="arow1">
          <p>〉</p>
        </div>
        <div className="step2">
          <div className="circle circle2">
            <p className="num">02</p>
            <p className="check">
              ✔{reserve.month}/{reserve.date}-{reserve.time}
            </p>
          </div>
        </div>
        <div className="arow2">
          <p>〉</p>
        </div>
        <div className="step3">
          <div className="circle circle3">
            <p className="num">03</p>
            <p className="step-p step3-p">填寫資料</p>
          </div>
        </div>
      </section>

      <section className="return">
        <div className="return-div">
          <button onClick={gobackHandler}>重新選擇時間</button>
        </div>
      </section>
      <section className="form">
        <div className="form-div">
          <p className="form-title">確認時間並填寫預約資訊</p>
          <div className="data">
            <div className="reverse">
              <p className="reverse-p">您預約的時段是</p>
              <p className="reverse-y">
                {reserve.year}年{reserve.month}月{reserve.date}日
              </p>
              <p className="reverse-t">
                {day} {reserve.time}
              </p>
              <div className="service">
                <p>預約服務</p>
                <p>{reserve.service}</p>
              </div>
              <div className="price">
                <p>金額</p>
                <p>{reserve.price}元</p>
              </div>
            </div>
            <div className="profile">
              <div className="profile-data">
                <div className="name-gender">
                  <span className="user-icon"></span>
                  <input
                    className="name"
                    onChange={nameHandler}
                    type="text"
                    placeholder="請輸入您的姓名"
                  />
                  <select onChange={genderHandler} className="gender">
                    <option value="小姐">小姐</option>
                    <option value="先生">先生</option>
                  </select>
                </div>
                <div className="phone-div">
                  <span className="phone-icon"></span>
                  <input
                    className="phone"
                    onChange={phoneHandler}
                    type="text"
                    placeholder="請輸入您的手機號碼"
                  />
                </div>
                <div className="email-div">
                  <span className="email-icon"></span>
                  <input
                    className="email"
                    onChange={emailHandler}
                    type="text"
                    placeholder="請輸入您的電子信箱(選填)"
                  />
                </div>
              </div>
              <div className="textarea-p">
                <p>如有其他需求請填寫於下方</p>
                <textarea
                  className="textarea"
                  rows={5}
                  cols={20}
                  placeholder="有什麼需求或建議嗎?"
                  onChange={taxtareaHandler}
                />
              </div>
              <div className="check-button">
                <div className="check-div">
                  <div className="check1-div">
                    <input
                      id="terms"
                      type="checkbox"
                      className="checkbox1"
                      onChange={termsHandler}
                      required
                    />
                    <label htmlFor="terms">我同意商家條款</label>
                  </div>
                  <div className="check2-div">
                    <input id="email" type="checkbox" className="checkbox2" />
                    <label htmlFor="email">我同意接受最新消息的電子信件</label>
                  </div>
                </div>
                {message && (
                  <section className="error">
                    <div className="message">{message}</div>
                  </section>
                )}
                <div className="button-div">
                  <button onClick={reserveHandler} className="button">
                    預約
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReserveProfile;
