import React, { useState, useRef, useEffect } from "react";
import { addDays, getYear, getMonth, getDate, getDay, getTime } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { seleteShop } from "../redux/reducers/shopReducer";
import {
  setDate,
  setTime,
  selectReserve,
} from "../redux/reducers/reserveReducer";
import ShopService, { ReserveState } from "../api/reserveApi";

const ReserveTime: React.FC = () => {
  const reserve = useAppSelector(selectReserve);
  const shop = useAppSelector(seleteShop);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 取得已預約的時間，搭配用戶選取的日期可以none掉該時間
  const [reservedArr, setReservedArr] = useState<string[]>([]);
  useEffect(() => {
    (async function () {
      let reserved = (await ShopService.getreserved()).data as ReserveState[];
      const arr: string[] = [];
      for (let i = 0; i < reserved.length; i++) {
        let year = String(reserved[i].year);
        let month = String(reserved[i].month);
        let date = String(reserved[i].date);
        let time = reserved[i].time;
        arr.push(year + " " + month + " " + date + " " + time);
      }
      setReservedArr(arr);
    })();
  }, []);

  const returnHandler = () => {
    navigate("/service");
  };

  // 設定7個日期讓用戶選取
  const today: Date = new Date();
  const [week, setWeek] = useState<number>(0);
  const date1: Date = addDays(new Date(today), 1 + week);
  const date2: Date = addDays(new Date(today), 2 + week);
  const date3: Date = addDays(new Date(today), 3 + week);
  const date4: Date = addDays(new Date(today), 4 + week);
  const date5: Date = addDays(new Date(today), 5 + week);
  const date6: Date = addDays(new Date(today), 6 + week);
  const date7: Date = addDays(new Date(today), 7 + week);

  // 設定按鈕可以選擇四週內的日期
  const nextWeek = () => {
    if (week < 21) {
      setWeek(week + 7);
    }
  };
  const previousWeek = () => {
    if (week > 0) {
      setWeek(week - 7);
    }
  };

  // 根據商店營業時間放入每個可預約的時段，間隔一小時
  const eachReserveTime: string[] = [];
  for (let hour: number = shop.openTime; hour <= shop.closeTime; hour++) {
    today.setHours(hour);
    today.setMinutes(0);

    const fromattdeTime = today.toLocaleTimeString("zh-hant", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    eachReserveTime.push(fromattdeTime);
  }

  // 取得用戶所選擇的日期，選擇日期並存到redux
  interface seletedDateType {
    date: string;
    format: string;
  }

  // const [seletedDate, setSeletedDate] = useState<seletedDateType>({
  //   date: "",
  //   format: "",
  // });
  const timeRef = useRef<HTMLDivElement>(null);

  const chooceDateHandler = (e: any) => {
    switch (e.target.id) {
      case "date1":
        let sel = {
          date: "date1",
          format:
            getYear(date1) + " " + (getMonth(date1) + 1) + " " + getDate(date1),
        };
        dispatch(
          setDate({
            year: getYear(date1),
            month: getMonth(date1) + 1,
            date: getDate(date1),
            day: getDay(date1),
            ms: getTime(date1),
            seletedDate: "date1",
            format:
              getYear(date1) +
              " " +
              (getMonth(date1) + 1) +
              " " +
              getDate(date1),
          })
        );
        break;
      case "date2":
        dispatch(
          setDate({
            year: getYear(date2),
            month: getMonth(date2) + 1,
            date: getDate(date2),
            day: getDay(date2),
            ms: getTime(date2),
            seletedDate: "date2",
            format:
              getYear(date2) +
              " " +
              (getMonth(date2) + 1) +
              " " +
              getDate(date2),
          })
        );
        break;
      case "date3":
        dispatch(
          setDate({
            year: getYear(date3),
            month: getMonth(date3) + 1,
            date: getDate(date3),
            day: getDay(date3),
            ms: getTime(date3),
            seletedDate: "date3",
            format:
              getYear(date3) +
              " " +
              (getMonth(date3) + 1) +
              " " +
              getDate(date3),
          })
        );
        break;
      case "date4":
        dispatch(
          setDate({
            year: getYear(date4),
            month: getMonth(date4) + 1,
            date: getDate(date4),
            day: getDay(date4),
            ms: getTime(date4),
            seletedDate: "date4",
            format:
              getYear(date4) +
              " " +
              (getMonth(date4) + 1) +
              " " +
              getDate(date4),
          })
        );
        break;
      case "date5":
        dispatch(
          setDate({
            year: getYear(date5),
            month: getMonth(date5) + 1,
            date: getDate(date5),
            day: getDay(date5),
            ms: getTime(date5),
            seletedDate: "date",
            format:
              getYear(date5) +
              " " +
              (getMonth(date5) + 1) +
              " " +
              getDate(date5),
          })
        );
        break;
      case "date6":
        dispatch(
          setDate({
            year: getYear(date6),
            month: getMonth(date6) + 1,
            date: getDate(date6),
            day: getDay(date6),
            ms: getTime(date6),
            seletedDate: "date6",
            format:
              getYear(date6) +
              " " +
              (getMonth(date6) + 1) +
              " " +
              getDate(date6),
          })
        );
        break;
      case "date7":
        dispatch(
          setDate({
            year: getYear(date7),
            month: getMonth(date7) + 1,
            date: getDate(date7),
            day: getDay(date7),
            ms: getTime(date7),
            seletedDate: "date7",
            format:
              getYear(date7) +
              " " +
              (getMonth(date7) + 1) +
              " " +
              getDate(date7),
          })
        );
        break;
    }
  };

  // 自動捲動到選擇時間
  useEffect(() => {
    if (timeRef.current) {
      window.scrollTo({
        top: timeRef.current.offsetTop,
      });
    }
  }, [reserve.seletedDate]);

  // 選擇時間並存到redux
  const chooseTimeHandler = (time: string) => {
    dispatch(setTime({ time: time }));
    navigate("/profile");
  };

  return (
    <div id="ReserveMain">
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
            <p className="step-p step2-p">選擇時間</p>
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
          <button onClick={returnHandler}>重新選擇服務</button>
        </div>
      </section>

      <section className="time-area">
        <div className="year-month">
          <button
            className={week === 0 ? "none" : "pre"}
            onClick={previousWeek}
          >
            上週
          </button>
          <div className="year-month-div">
            <p>
              {getYear(date1)}年 {getMonth(date1) + 1}月
            </p>
            <div className="p-none">
              <p
                className={
                  getYear(date1) === getYear(date7) ? "none" : "next-year"
                }
              >
                {getYear(date7)}年
              </p>
              <p
                className={
                  getMonth(date1) === getMonth(date7) ? "none" : "next-month"
                }
              >
                ~ {getMonth(date7) + 1}月
              </p>
            </div>
          </div>
          <button className={week === 21 ? "none" : "next"} onClick={nextWeek}>
            下週
          </button>
        </div>
        <p className="p">選擇日期</p>
        <hr />
        <div className="date-div" onClick={chooceDateHandler}>
          <button
            id="date1"
            className={reserve.seletedDate === "date1" ? "seleted" : ""}
          >
            {date1.getDate()}日
          </button>
          <button
            id="date2"
            className={reserve.seletedDate === "date2" ? "seleted" : ""}
          >
            {date2.getDate()}日
          </button>
          <button
            id="date3"
            className={reserve.seletedDate === "date3" ? "seleted" : ""}
          >
            {date3.getDate()}日
          </button>
          <button
            id="date4"
            className={reserve.seletedDate === "date4" ? "seleted" : ""}
          >
            {date4.getDate()}日
          </button>
          <button
            id="date5"
            className={reserve.seletedDate === "date5" ? "seleted" : ""}
          >
            {date5.getDate()}日
          </button>
          <button
            id="date6"
            className={reserve.seletedDate === "date6" ? "seleted" : ""}
          >
            {date6.getDate()}日
          </button>
          <button
            id="date7"
            className={reserve.seletedDate === "date7" ? "seleted" : ""}
          >
            {date7.getDate()}日
          </button>
        </div>
        {reserve.date !== 0 && (
          <div ref={timeRef}>
            <p className="p">選擇時間</p>
            <hr />
          </div>
        )}
        {reserve.date !== 0 && (
          <div className="time-div">
            {eachReserveTime.map((time, index) => {
              return (
                <button
                  className={
                    reservedArr.includes(reserve.format + " " + time)
                      ? "none"
                      : ""
                  }
                  key={index}
                  onClick={() => chooseTimeHandler(time)}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
export default ReserveTime;
