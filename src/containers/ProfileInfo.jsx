import React from "react";
import DetailedProfile from "../components/detailedProfile/DetailedProfile";
import MyBicycles from "../components/myBicycles/MyBicycles";

const ProfileInfo = ({ userInfo, myBicyclesList, onClick }) => {
  return (
    <>
      <div className="w-50 mb-15">
        <DetailedProfile userInfo={userInfo} />
        <MyBicycles myBicyclesList={myBicyclesList} />
      </div>
    </>
  );
};

export default ProfileInfo;
