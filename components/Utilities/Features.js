import Image from "next/image";
import React from "react";

const myLoader = ({ src }) => {
  return `https://movebike-users-imgs.s3.us-east-1.amazonaws.com/${src}`;
};

export default function Features({ icon, feature }) {
  return (
    <div className="col-md-4 mt-4">
      <div className="card border-3 shadow d-md-flex flex-md-row align-items-center p-4 mt-2 text-center text-md-start">
        <Image
          loader={myLoader}
          src={icon}
          alt={"Icon Feature"}
          width={32}
          height={32}
        />
        <p className="mb-0 ms-1">{feature}</p>
      </div>
    </div>
  );
}
