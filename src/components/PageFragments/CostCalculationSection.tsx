"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../config/store";
import { useRouter } from "next/navigation";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import SignupModal from "../modal/SignupModal";
import useToken from "../hooks/useToken";
import BuyNowPayLaterSuccessModal from "../modal/BuyNowPayLaterSuccessModal";
import { togglePaylaterModal4 } from "../config/features/paylaterModal4";
import {
  useAddRequestMutation,
  useGetGeneralInfoQuery,
  useGetUserAccountQuery,
} from "../config/features/api";
import { addRequestPayLoad } from "@constants";
import FormToast from "../Reusables/Toast/SigninToast";
import { ClipLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "../Reusables";

const CostCalculationSection = () => {
  const { token } = useToken();
  const dispatch = useDispatch();
  const router = useRouter();
  const paylater = useSelector(
    (state: RootState) => state.payLaterDataState.data,
  );
  let decodedToken;
  let expirationTime: number | undefined;

  const checkedValidToken = isTokenValid(token);

  if (checkedValidToken) {
    decodedToken = jwtDecode(token, { header: false });
    expirationTime = decodedToken.exp;
  }
  const isTokenExpired = expirationTime
    ? Date.now() >= expirationTime * 1000
    : !checkedValidToken
      ? true
      : false;

  // console.log(isTokenExpired, "isTokenExpired");
  const { data: userAccount } = useGetUserAccountQuery({ token: token });
  const { data: generalSettings } = useGetGeneralInfoQuery({});
  const paylaterPercentage = generalSettings?.percentage;
  let paylaterPercentageConverted: any;
  if (paylaterPercentage) {
    paylaterPercentageConverted = parseInt(paylaterPercentage) / 100;
  }
  // console.log(paylaterPercentageConverted, "generalSettings");
  const [addRequest, { isLoading, isError, error, data: addRequestData }] =
    useAddRequestMutation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotKycModalOpen, setIsNotKycModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/user/login");
  };
  const handleKYCCloseModal = () => {
    setIsNotKycModalOpen(false);
    router.push("/user/kyc-details");
  };
  // console.log(token, "token");

  // const openShareModal = () => {
  // 	setIsShareModalOpen(true);
  // };

  const AuthModalContent = () => (
    <>
      <h3 className="text-sm sm:text-base md:text-2xl md:px-12 text-black text-center">
        Sorry! You have to login to make a request.
      </h3>
    </>
  );
  const AuthModalKYCContent = () => (
    <>
      <h3 className="text-sm sm:text-base md:text-2xl md:px-12 text-black text-center">
        You have to update your KYC to make this request.
      </h3>
    </>
  );

  const handlePaylaterProductClick = async () => {
    const payload: addRequestPayLoad = {
      token: token,
      id: paylater[0]?.id,
    };
    if (
      token &&
      userAccount?.kyc?.bankStatement &&
      userAccount?.kyc?.bvn &&
      userAccount?.kyc?.nationalId &&
      userAccount?.kyc?.passport &&
      userAccount?.kyc?.utilityBill
    ) {
      addRequest(payload);
    } else if (!token) {
      setIsModalOpen(true);
    } else if (isTokenExpired) {
      setIsModalOpen(true);
    } else if (
      !userAccount?.kyc?.bankStatement &&
      !userAccount?.kyc?.bvn &&
      !userAccount?.kyc?.nationalId &&
      !userAccount?.kyc?.passport &&
      !userAccount?.kyc?.utilityBill &&
      token
    ) {
      setIsNotKycModalOpen(true);
    }
  };

  const handleAddRequestData = (data: any) => {
    // console.log(data);
    dispatch(togglePaylaterModal4());
    FormToast({
      message: "Request Successful",
      success: true,
    });
  };

  useEffect(() => {
    if (addRequestData) {
      handleAddRequestData(addRequestData);
    }
  }, [addRequestData]);

  useEffect(() => {
    if (error) {
      if (error) {
        // console.log(error);
        if ("data" in error) {
          const res: any = error.data;
          if ("message" in res) {
            const message = res.message;
            FormToast({
              message: "Request Failed, try again",
              success: false,
            });
          }
        }
      }
    }
  }, [isError, error]);

  const handleTermsChange = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  let initialDeposit;
  let InitialSum;
  let RemainingMonth;
  let MonthBal;
  let Total;
  if (paylater && paylaterPercentageConverted) {
    initialDeposit =
      (paylater[0]?.initailDeposits + paylater[0]?.processInFees) *
      (paylater[0].discount / 100);
    InitialSum = paylater[0]?.initailDeposits + paylater[0]?.processInFees;
    RemainingMonth = paylater[0].months - 1;
    MonthBal =
      (InitialSum - initialDeposit) / RemainingMonth +
      ((InitialSum - initialDeposit) / RemainingMonth) *
        paylaterPercentageConverted;
    Total = initialDeposit + MonthBal * RemainingMonth;
  }
  // Create an array to store the JSX elements for each month
  const monthElements = [];
  if (RemainingMonth) {
    for (let i = 1; i <= RemainingMonth; i++) {
      const monthDate = new Date(); // You may need to calculate the actual date here
      monthDate.setMonth(monthDate.getMonth() + i);
      const formattedDate = `${monthDate.toLocaleString("en-us", {
        month: "short",
      })} ${monthDate.getDate()} ${monthDate.getFullYear()}`;

      let monthLabel;
      if (i === 1) {
        monthLabel = "First Month";
      } else if (i === 2) {
        monthLabel = "Second Month";
      } else if (i === 3) {
        monthLabel = "Third Month";
      } else {
        monthLabel = `${i}th Month`;
      }
      monthElements.push(
        <div key={i}>
          <hr className="text-[#E9E9E9] w-full" />
          <div className="flex justify-between my-6 ">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs sm:text-sm leading-[1.3] text-secondary-200">
                {monthLabel}
              </h4>
              <h4 className="text-sm sm:text-base font-[500] leading-[1.3] text-secondary-200">
                {MonthBal && FormatMoney2(MonthBal)}
              </h4>
            </div>
            <h4 className="text-xs font-[400] leading-[1.3] text-secondary-200 flex items-end">
              {formattedDate}
              {/* Adjust the date format as needed */}
            </h4>
          </div>
        </div>,
      );
    }
  }

  return (
    <section className="">
      {!paylater ? (
        <div className="flex flex-col bg-white border-[1px] border-[#E9E9E9]">
          <h4 className="text-center py-3 sm:py-6 text-sm sm:text-base font-[400] leading-[1.3] text-secondary-200">
            Cost Calculator
          </h4>
          <hr className="text-[#E9E9E9] w-full" />
          <h4 className="text-center px-3 md:px-12 pt-2 sm:pt-4 pb-3 sm:pb-6 text-xs sm:text-sm font-[400] leading-[1.8] text-secondary-200">
            Select product to see the payment plan
          </h4>
        </div>
      ) : (
        <>
          <div className="flex flex-col bg-white border-[1px] border-[#E9E9E9] pt-5 px-6 transition">
            <div className="flex flex-col gap-3 sm:gap-4 mb-4">
              <h4 className="text-xs sm:text-sm font-[400] leading-[1.3] text-secondary-200">
                Available Plan
              </h4>
              <h4 className="text-sm sm:text-base font-[400] leading-[1.3] text-secondary-200">
                {paylater[0].months} Months
              </h4>
            </div>
            <hr className="text-[#E9E9E9] w-full" />
            <div className="flex justify-between my-4">
              <div className="flex flex-col gap-4">
                <h4 className="text-xs sm:text-sm font-[400] leading-[1.3] text-secondary-200">
                  Initial deposit
                </h4>
                <h4 className="text-sm sm:text-base font-bold leading-[1.3] text-secondary-200">
                  {initialDeposit && FormatMoney2(initialDeposit)}
                </h4>
              </div>
              <h4 className="text-xs sm:text-sm font-[400] leading-[1.3] text-secondary-200 flex items-end">
                Today
              </h4>
            </div>
            {monthElements}
            {/* <hr className='text-[#E9E9E9] w-full' />
						<div className='flex justify-between my-6 '>
							<div className='flex flex-col gap-4'>
								<h4 className='text-xs sm:text-sm leading-[1.3] text-secondary-200'>
									Second Month
								</h4>
								<h4 className='text-sm sm:text-base font-[500] leading-[1.3] text-secondary-200'>
									{MonthBal && FormatMoney2(MonthBal)}
								</h4>
							</div>
							<h4 className='text-xs font-[400] leading-[1.3] text-secondary-200 flex items-end'>
								Sept 5 2023
							</h4>
						</div>
						<div className='flex justify-between mb-8'>
							<div className='flex flex-col gap-4'>
								<h4 className='text-xs sm:text-sm font-[400] leading-[1.3] text-secondary-200'>
									Third Month
								</h4>
								<h4 className='text-sm sm:text-base font-[500] leading-[1.3] text-secondary-200'>
									{MonthBal && FormatMoney2(MonthBal)}
								</h4>
							</div>
							<h4 className='text-xs font-[400] leading-[1.3] text-secondary-200 flex items-end'>
								Oct 5 2023
							</h4>
						</div>
						<hr className='text-[#E9E9E9] w-full' /> */}

            <div className="flex gap-5 bg-[#D1FAE5] px-5 py-2 my-3">
              <h4 className="text-sm sm:text-base">Total</h4>
              <h4 className="text-sm sm:text-base text-primary-300 font-bold">
                {Total && FormatMoney2(Total)}
              </h4>
            </div>

            <div className="flex gap-2 sm:gap-4 px-2 items-center mt-3 mb-3 sm:mb-10">
              <input
                id="checkbox"
                type="checkbox"
                checked={acceptedTerms}
                onChange={handleTermsChange}
                className="mr-2 cursor-pointer"
              />
              <label
                htmlFor="checkbox"
                className="flex items-center cursor-pointer"
              >
                <span className="text-[10px] sm:text-xs">
                  I have accepted the{" "}
                  <span
                    onClick={() => router.push("/terms-of-use")}
                    className="text-primary font-bold hover:underline transition"
                  >
                    terms & conditions
                  </span>{" "}
                  of Warespire Innovations
                </span>
              </label>
            </div>

            <button
              disabled={!acceptedTerms}
              onClick={handlePaylaterProductClick}
              className={`w-full py-2 sm:py-3 text-white text-sm mb-5 sm:mb-10 rounded-md ${
                acceptedTerms
                  ? "bg-primary cursor-pointer"
                  : "bg-primary/60 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <ClipLoader color="#d4d3d3" size={20} />
              ) : (
                "Buy and Pay later"
              )}
            </button>
          </div>
          {/* <BuyNowPaylaterModal1 />
					<BuyNowPaylaterModal2 /> */}
          <BuyNowPayLaterSuccessModal />
          <SignupModal
            isOpen={isModalOpen ? true : false}
            onClose={handleCloseModal}
            setIsOpen={setIsModalOpen}
            content={<AuthModalContent />}
            buttonText="Login"
          />
          <SignupModal
            isOpen={isNotKycModalOpen ? true : false}
            onClose={handleKYCCloseModal}
            content={<AuthModalKYCContent />}
            setIsOpen={setIsNotKycModalOpen}
            buttonText="Update KYC"
          />
        </>
      )}
    </section>
  );
};

export default CostCalculationSection;
