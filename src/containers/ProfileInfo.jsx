import React from "react";
import DetailedProfile from "../components/detailedProfile/DetailedProfile";
import MyBicycles from "../components/myBicycles/MyBicycles";

const ProfileInfo = ({ userInfo, myBicyclesList, onClick }) => {
  return (
    <>
      <div className=" flex flex-column align-center mb-15 gap-2 ">
        <DetailedProfile userInfo={userInfo} />
        <MyBicycles myBicyclesList={myBicyclesList} />
      </div>
    </>
  );
};

export default ProfileInfo;
