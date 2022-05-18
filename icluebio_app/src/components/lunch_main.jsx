import React from "react";

const LunchMain = (props) => (
  <>
    <select name="Restaurant">
      <option value="0">--식당을 선택하세요--</option>
      <option value="1">식당1</option>
      <option value="2">식당2</option>
      <option value="3">식당3</option>
      <option value="4">식당4</option>
      <option value="5">...추가</option>
    </select>
    <button>Detail</button>
    {/* <div>
      <input type="text" />
      <input type="text" />
      <button>Detail</button>
    </div>
    <div>
      <input type="text" />
      <input type="text" />
      <button>Detail</button>
    </div>
    <div>
      <input type="text" />
      <input type="text" />
      <button>Detail</button>
    </div>
    <div>
      <input type="text" />
      <input type="text" />
      <button>Detail</button>
    </div>
    <div>
      <input type="text" />
      <input type="text" />
      <button>Detail</button>
    </div> */}
  </>
);

export default LunchMain;
