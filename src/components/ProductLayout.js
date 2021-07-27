import React, { useRef, useState } from "react";
import Customizations from "./Customizations";
import Error from "./Error";
import Loading from "./Loading";
import useCartModel from "../hooks/useCart";
import { SERVICE_START_TIME, SERVICE_END_TIME } from "../constants";
import { useHistory } from "react-router-dom";
import useBookingModel from "../hooks/useBooking";

import { DatePicker, LocalizationProvider } from "@material-ui/pickers";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "../assets/productlayout.scss";
import { CHECK_AVAILABILITY } from "../shared/utils";
import { useQuery } from "@apollo/client";
import { format, add, set } from "date-fns";

const tomorrow = add(new Date(), {
  days: 1
});

const month = add(new Date(), {
  months: 1
});

const ProductLayout = ({ dataResult, loading, error }) => {
  const history = useHistory();

  const [activeImage, setActiveImage] = useState();
  const [time, setTime] = useState(9);
  const [invalid, setInvalid] = useState(null);
  const customRef = useRef();
  const { cartData, setCart, setCartDisplay } = useCartModel();
  const { setBookingData } = useBookingModel();
  const [selectedDate, handleDateChange] = useState(
    set(new Date(tomorrow), { hours: 9, minutes: 0 })
  );

  const { data } = useQuery(CHECK_AVAILABILITY, {
    fetchPolicy: "no-cache",
    variables: {
      checkAvailabilityData: {
        quantity: 1,
        timeUnit: "month"
      }
    }
  });

  const unavailableDays = (date) => {
    if (data?.checkAvailability.includes(format(new Date(date), "yyyy-MM-dd")))
      return true;
  };

  const serviceHour = SERVICE_END_TIME - SERVICE_START_TIME;

  const isProduct = dataResult?.__typename === "Product";

  const handleProductClick = async (type) => {
    if (dataResult.options.length > 0) {
      const customChoices = await customRef.current.submit();
      if (!customChoices) return;
      dataResult.customChoices = customChoices;
    }
    cartData.push(dataResult);
    setCart([...cartData]);
    if (type === "cart") {
      setCartDisplay(true);
    } else if (type === "purchase") {
      history.push("/payment");
    }
  };

  const handleBookingClick = () => {
    if (invalid) return;
    let serviceData = { ...dataResult };
    set(new Date(selectedDate), { hours: time });
    serviceData.startTime = selectedDate;
    setBookingData(serviceData);
    history.push("/booking");
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="content">
      <div className="singleProduct">
        <div className="imageContainer">
          <div className="thumbnailContainer">
            {dataResult.images.map((item, key) => {
              return (
                <img
                  className={activeImage === item ? "activeImage" : ""}
                  key={key}
                  src={item}
                  alt="productThumbnails"
                  onClick={() => setActiveImage(item)}
                />
              );
            })}
          </div>
          <div className="biggerImageContainer">
            <div className="biggerImage">
              <img
                src={activeImage || dataResult.images[0]}
                alt="enlargedthumbnail"
              />
            </div>
          </div>
        </div>
        <div className="productContainer">
          <div className="productHeader">
            <div className="productTitle">{dataResult.name}</div>
            <div
              className={
                dataResult.salePrice ? "productPrice sale" : "productPrice"
              }
            >
              <div className="normPrice">
                ${parseFloat(dataResult.price).toFixed(2)}
              </div>
              {dataResult.salePrice &&
                `$${parseFloat(dataResult.salePrice).toFixed(2)} `}
            </div>
          </div>
          <div className="productContent">
            <div className="productDetailContainer">
              <Customizations options={dataResult.options} ref={customRef} />
              <div className="productDescription">{dataResult.description}</div>
            </div>
            <div
              className={
                isProduct
                  ? "paymentButtonsContainer"
                  : "serviceButtonsContainer"
              }
            >
              {!isProduct && (
                <>
                  <div className="datePickerContainer">
                    <LocalizationProvider dateAdapter={DateFnsAdapter}>
                      <DatePicker
                        renderInput={(props) => (
                          <TextField
                            required
                            variant="outlined"
                            {...props}
                            error={invalid}
                            helperText="Please select an available date"
                            className="dateBooking"
                          />
                        )}
                        label="Booking Date"
                        value={selectedDate}
                        inputVariant="outlined"
                        disableHighlightToday={true}
                        onChange={handleDateChange}
                        minDate={tomorrow}
                        maxDate={month}
                        shouldDisableDate={unavailableDays}
                        onError={(er) => {
                          setInvalid(er);
                        }}
                      />
                    </LocalizationProvider>
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">
                        Booking Time - Available 9am - 6pm
                      </InputLabel>
                      <Select
                        variant="outlined"
                        value={time}
                        defaultValue={9}
                        onChange={(event) => setTime(event.target.value)}
                      >
                        {[...Array(serviceHour)].map((e, i) => (
                          <MenuItem value={i + 9}>
                            {i < 1 && "0"}
                            {i + 9}:00
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="bookingFee">
                    Please note:
                    <br /> There is a $15 booking fee.
                    <br /> Refundable upon payment of service
                  </div>
                </>
              )}
              {isProduct && (
                <div
                  className="cartButton"
                  onClick={() => handleProductClick("cart")}
                >
                  <div className="cartButtonContainer">
                    <AddShoppingCartIcon />
                    <div>Add to cart</div>
                  </div>
                </div>
              )}
              {isProduct ? (
                <div
                  className="buyButton"
                  onClick={() => handleProductClick("purchase")}
                >
                  Proceed to Payment
                </div>
              ) : (
                <div className="buyButton" onClick={handleBookingClick}>
                  Book now
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLayout;
