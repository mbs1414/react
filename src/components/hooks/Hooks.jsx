import { useState, useTransition } from 'react';

const Hooks = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [peding, startTransition] = useTransition();
  const numbersList = [];
  let count = 0;
  const handleChange = (e) => {
    setValue(e.target.value);
    startTransition(() => {
      while (count < 1000) {
        numbersList.push(e.target.value);
        count++;
      }
      setList(numbersList);
    });
  };
  return (
    <div className="text-white w-25">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={handleChange}
      />
      {peding && <div>در حال پردازش....</div>}
      {value &&list.map((item, index) => (
        <div key={index}>عدد برابر است با {item}🍌</div>
      ))}
    </div>
  );
};
export default Hooks;
