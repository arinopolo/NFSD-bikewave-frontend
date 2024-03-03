import React from "react";
import { MutatingDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <MutatingDots
        visible={true}
        height={100}
        width={100}
        color="#4fa94d"
        secondaryColor="#31b15c"
        radius={12.5}
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <div>Loading...</div>
    </>
  );
};

export default Loading;
