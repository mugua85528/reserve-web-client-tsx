import React, { useState, useEffect, useRef } from "react";
import ReserveService from "../api/reserveApi";

const ReserveSearch: React.FC = () => {
  const topRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({
        top: topRef.current.offsetTop,
      });
    }
  });

  // 設定輸入的手機號碼、存放請求物件以及錯誤訊息
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  const phoneHandler = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const searchHandler = async () => {
    if (!phoneNumber) {
      setMessage("請輸入手機號碼");
      return;
    }

    try {
      let res = await ReserveService.search(phoneNumber);

      if (res.data.length === 0) {
        setData(null);
        setMessage("此號碼查無資料");
        return;
      }

      setData(res);
    } catch (e: any) {
      setData(null);

      if (e.target) {
        setMessage(e.target.data);
      } else {
        setMessage("無法連結伺服器，請聯繫開發人員");
      }
    }
  };

  return (
    <section id="Search" ref={topRef}>
      <div className="Search-result">
        <div className="input-button">
          <input
            placeholder="請輸入手機號碼"
            onChange={phoneHandler}
            type="text"
          />
          <button onClick={searchHandler}>查詢</button>
        </div>
        {message && <p className={data ? "none" : "message"}>{message}</p>}
        {data && (
          <div className="result">
            <p className="title">以下是您預約的時間及服務</p>
            {data.data.map((data: any, index: any) => {
              return (
                <div className={"card"} key={index}>
                  <div className="time">
                    <p>
                      {data.year}年{data.month + 1}月{data.date}日
                    </p>
                    <p>{data.day}</p>
                    <p>{data.time}點</p>
                  </div>
                  <div className="service">
                    <p>{data.service}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReserveSearch;
