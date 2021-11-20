import React from "react";
import { useSelector } from "react-redux";

const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const { data = [] } = products;
  const renderList =
    products == []
      ? []
      : data.map((product) => {
          const {
            id,
            name = "",
            attacks = [],
            hp = "",
            abilities = [],
            images,
          } = product;
          const { small } = images;
          let att = [];
          attacks.forEach((obj) => {
            att.push(obj.name);
          });
          let attack = attacks ? att.toString() : "";
          let ab = [];
          abilities.forEach((obj) => {
            ab.push(obj.name);
          });

          let abilitie = abilities ? ab.toString() : "";

          return (
            <div className="four wide column" key={id}>
              <div className="ui link cards">
                <div className="card">
                  <div className="image">
                    <img src={small} alt={name} />
                  </div>
                  <div className="content">
                    <div className="header">Name: {name}</div>
                    <div className="meta">Hp: {hp}</div>
                    <div className="meta">Abilitie: {abilitie}</div>
                    <div className="meta">Attack: {attack}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
  return <>{renderList}</>;
};

export default ProductComponent;
