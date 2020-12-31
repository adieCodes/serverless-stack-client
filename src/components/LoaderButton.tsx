import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import "./LoaderButton.css";

interface ILoaderButtonProps {
  block: boolean;
  size: "sm" | "lg";
  type: string;
  isLoading: boolean;
  className?: string;
  variant?: string;
  disabled: boolean;
  children: ReactNode;
}

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: ILoaderButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <BsArrowRepeat className="spinning" />}
      {props.children ? props.children : null}
    </Button>
  );
}
