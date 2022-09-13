import React from "react";
import { FcDeleteDatabase } from "react-icons/fc";
import { FcSupport } from "react-icons/fc";

const Item = ({ text, remove, update }) => {
  return (
    <div className="item">
      <p className="item_content">{text}</p>
      <button className="update_item" onClick={update}>
        update <FcSupport size={23} />
      </button>
      <button className="delete_item" onClick={remove}>
        Delete <FcDeleteDatabase size={23} />
      </button>
    </div>
  );
};

export default Item;
