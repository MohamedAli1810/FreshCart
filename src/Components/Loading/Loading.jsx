import { Triangle } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center rotate-180">
        <Triangle
          visible={true}
          height="400"
          width="400"
          color="#A4161A"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
};
export default Loading;
