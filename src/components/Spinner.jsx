import SpinnerGIF from './../assets/Spinner.gif';
const Spinner = () => {
  return (
    <>
      <img
        src={SpinnerGIF}
        alt="loading"
        className="d-block m-auto"
        style={{ width: '200px' }}
      />
    </>
  );
};
export default Spinner;
