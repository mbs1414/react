import { useCallback, useState } from 'react';
import throttle from 'lodash/throttle';
const RealCounter = () => {
  const [count, setCount] = useState(0);
  const counting = (how) => {
    switch (how) {
      case 'increase':
        setCount((prevCount) => prevCount + 1);
        break;
      case 'decrease':
        setCount((prevCount) => prevCount - 1);
        break;
      case 'reset':
        setCount(0);
        break;
      default:
        setCount(0);
        break;
    }
  };
  const throttledCount = useCallback(
    throttle(counting, 5000, { leading: false, trailing: true }),
    []
  );
  return (
    <div className="d-flex flex-column align-items-center text-white">
      <h2 dir="ltr">{count}</h2>
      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-primary"
          onClick={() => throttledCount('increase')}
        >
          افزایش
        </button>
        <button
          className="btn btn-danger"
          onClick={() => throttledCount('decrease')}
        >
          کاهش
        </button>
        <button
          className="btn btn-info"
          onClick={() => throttledCount('reset')}
        >
          صفر کردن
        </button>
      </div>
    </div>
  );
};
export default RealCounter;
