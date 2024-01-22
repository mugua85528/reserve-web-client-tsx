import React, { useEffect, useRef } from "react";
import { seleteShop } from "../redux/reducers/shopReducer";
import { useAppDispatch, useAppSelector } from "../redux/app/hook";
import { setService } from "../redux/reducers/reserveReducer";
import { useNavigate } from "react-router-dom";

const ReserveService: React.FC = () => {
  const dispatch = useAppDispatch();
  const shop = useAppSelector(seleteShop);
  const navigate = useNavigate();
  const topRef = useRef<HTMLDivElement>(null);

  // 每次進入頁面會自動捲動到按鈕的位置
  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({
        top: topRef.current.offsetTop,
      });
    }
  }, []);

  // 透過派遣事件，利用id選取觸發事件的按鈕並儲存到redux
  const chooseServiceHandler1 = (e: any) => {
    switch (e.target.id) {
      case "btn1":
        dispatch(
          setService({
            service: shop.service[0].name,
            price: shop.service[0].price,
          })
        );
        break;
      case "btn2":
        dispatch(
          setService({
            service: shop.service[1].name,
            price: shop.service[1].price,
          })
        );
        break;
      case "btn3":
        dispatch(
          setService({
            service: shop.service[2].name,
            price: shop.service[2].price,
          })
        );
        break;
    }
    navigate("/time");
  };
  const chooseServiceHandler2 = (e: any) => {
    switch (e.target.id) {
      case "btn4":
        dispatch(
          setService({
            service: shop.service[3].name,
            price: shop.service[3].price,
          })
        );
        break;
      case "btn5":
        dispatch(
          setService({
            service: shop.service[4].name,
            price: shop.service[4].price,
          })
        );
        break;
      case "btn6":
        dispatch(
          setService({
            service: shop.service[5].name,
            price: shop.service[5].price,
          })
        );
        break;
      default:
        navigate("/time");
    }
    navigate("/time");
  };

  return (
    <div id="Service" ref={topRef}>
      <section className="step">
        <div className="step1">
          <div className="circle circle1">
            <p className="num">01</p>
            <p className="step-p step1-p">選擇服務</p>
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

      <section className="service">
        <div className="card service1">
          <figure className="img1" />
          <div className="p-hr-button">
            <p>臉部保養</p>
            <hr />
            <div className="btn-div" onClick={chooseServiceHandler1}>
              <button id="btn1" className="btn">
                {shop.service[0].name} ${shop.service[0].price}
              </button>
              <button id="btn2" className="btn">
                {shop.service[1].name} ${shop.service[1].price}
              </button>
              <button id="btn3" className="btn">
                {shop.service[2].name} ${shop.service[2].price}
              </button>
            </div>
          </div>
        </div>
        <div className="card service2">
          <figure className="img2" />
          <div className="p-hr-button">
            <p>身體SPA</p>
            <hr />
            <div className="btn-div" onClick={chooseServiceHandler2}>
              <button id="btn4" className="btn">
                {shop.service[3].name} ${shop.service[3].price}
              </button>
              <button id="btn5" className="btn">
                {shop.service[4].name} ${shop.service[4].price}
              </button>
              <button id="btn6" className="btn">
                {shop.service[5].name} ${shop.service[5].price}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReserveService;
