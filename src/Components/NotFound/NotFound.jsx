import errorImg from "../../assets/images/error.svg";
const NotFound = () => {
  return (
    <>
      <div className="mt-20 mb-20 flex justify-center items-center">
        <div className="w-[50%]">
          <img className="w-full" src={errorImg} alt="" />
        </div>
      </div>
    </>
  );
};
export default NotFound;
