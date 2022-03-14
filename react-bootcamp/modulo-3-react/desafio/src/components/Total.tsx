import React from "react";
import { TotalProps } from "../interfaces/TotalProps";

export default function Total(props: TotalProps) {
  const { total } = props;
  return (
    <div>
      Despesa Total: <strong>R$ {total}</strong>
    </div>
  );
}
