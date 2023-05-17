import "../../../index.css";

const LoadingModal = () => {
  return (
    <>
      <div className="modal fixed w-full h-screen bg-white bg-opacity-60 flex justify-center items-center border border-red transition-all">
        <div className="loading transition-all">
          <span className="loading-span transition-all"></span>
          <span className="loading-span transition-all"></span>
          <span className="loading-span transition-all"></span>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
